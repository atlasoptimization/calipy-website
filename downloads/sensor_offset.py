"""A simple sensor-offset calibration with the CaliPy development block API.

Illustrative readings, exact reference 20 deg C, known independent Normal noise
0.1 deg C, and one constant offset with a Normal(0, 1) prior (deg C).
This is a teaching example, not a traceable calibration or a production recipe.
The older public PyPI release may not support this API. See:
https://calpymodels.com/get-started/#development
Project attribution and license: accompanying LICENSE.md.
"""
import argparse
import json
from pathlib import Path

import torch
import pyro
import pyro.distributions as dist
import calipy as cp

if not all(hasattr(cp, name) for name in ("block", "LatentParameter", "NUTS")):
    raise SystemExit("This example requires CaliPy's development block API.")

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--output", type=Path, help="Optional folder for the result and dataset")
args = parser.parse_args()
pyro.clear_param_store()
pyro.set_rng_seed(31)
reference = 20.0
noise_sd = 0.1
values = torch.tensor([20.41, 20.52, 20.36, 20.49, 20.44, 20.48, 20.39, 20.51])
repeat = cp.dim("repeat")
observations = cp.CalipyTensor(values, repeat)
offset = cp.LatentParameter("offset", prior=dist.Normal(0.0, 1.0))
reading = cp.RandomVariable.Normal("reading", scale=noise_sd)


@cp.block
def sensor():
    return reading(reference + offset())


fit = sensor.fit(
    outputs=observations,
    method=cp.NUTS(warmup_steps=200, num_samples=500, seed=31),
)
estimate = fit[offset]
draws = estimate.samples.tensor.flatten()
analytic_variance = 1.0 / (1.0 + values.numel() / noise_sd**2)
analytic_mean = analytic_variance * (values - reference).sum().item() / noise_sd**2
analytic_sd = analytic_variance**0.5
assert estimate.kind == "posterior"
assert estimate.mean.tensor.ndim == 0
assert draws.numel() == 500
assert torch.isfinite(draws).all()
assert abs(draws.mean().item() - analytic_mean) < 0.02
assert abs(draws.std(unbiased=True).item() - analytic_sd) < 0.015
record = {
    "data_kind": "illustrative fixed readings", "reference_celsius": reference,
    "reference_assumption": "exact for this lesson", "noise_sd_celsius": noise_sd,
    "prior": {"family": "Normal", "mean": 0.0, "sd": 1.0},
    "readings_celsius": values.tolist(), "seed": 31,
    "inference": {"method": "NUTS", "warmup": 200, "draws": 500, "chains": 1},
    "posterior_mean_celsius": draws.mean().item(),
    "posterior_sd_celsius": draws.std(unbiased=True).item(),
    "analytic_mean_celsius": analytic_mean, "analytic_sd_celsius": analytic_sd,
    "versions": {"torch": torch.__version__, "pyro": pyro.__version__},
    "limitations": "One short teaching chain; no convergence claim. Known independent noise and exact reference. Offset only: gain, drift, correlations and reference uncertainty are excluded.",
}
if args.output:
    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / "result.json").write_text(json.dumps(record, indent=2) + "\n")
    (args.output / "readings.csv").write_text(
        "repeat,reference_celsius,reading_celsius\n" +
        "".join(f"{index+1},{reference:.2f},{value:.2f}\n" for index, value in enumerate(values.tolist()))
    )
print(json.dumps(record, indent=2))
pyro.clear_param_store()
