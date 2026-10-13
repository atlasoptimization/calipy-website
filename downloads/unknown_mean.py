"""CaliPy development-API example: infer an unknown mean with a Normal prior.

Requires the development interface with cp.block and cp.LatentParameter.
The public calipy-ppl package may expose an earlier interface.
See https://calpymodels.com/get-started/#development for availability.
License and original project attribution: see the accompanying LICENSE.md.
"""
import torch
import pyro
import pyro.distributions as dist
import calipy as cp

if not all(hasattr(cp, name) for name in ("block", "LatentParameter", "NUTS")):
    raise SystemExit(
        "This example requires CaliPy's development block API. "
        "Use the public documentation for your installed release, or request "
        "development access via https://calpymodels.com/get-started/."
    )

pyro.clear_param_store()
pyro.set_rng_seed(23)
reading_dim = cp.dim("reading")
values = torch.tensor([0.8, 1.0, 1.2, 0.9])
data = cp.CalipyTensor(values, reading_dim)
level = cp.LatentParameter("level", prior=dist.Normal(0., 2.))
measurement = cp.RandomVariable.Normal("reading", scale=0.15)


@cp.block
def model():
    return measurement(level())


result = model.fit(
    outputs=data,
    method=cp.NUTS(warmup_steps=100, num_samples=200, seed=23),
)
estimate = result[level]
reference_variance = 1.0 / (1.0 / 2.0**2 + values.numel() / 0.15**2)
reference_mean = reference_variance * values.sum() / 0.15**2
reference_sd = reference_variance**0.5
print("Posterior mean:", estimate.mean.tensor.item())
print("Posterior standard deviation:", estimate.standard_deviation.tensor.item())
print("Analytic reference mean:", reference_mean.item())
print("Analytic reference standard deviation:", reference_sd)
assert estimate.kind == "posterior"
assert estimate.mean.tensor.ndim == 0
assert torch.isfinite(estimate.samples.tensor).all()
# A loose smoke check, not a substitute for chain diagnostics/convergence.
assert abs(estimate.mean.tensor.item() - reference_mean.item()) < 0.08
assert 0.03 < estimate.standard_deviation.tensor.item() < 0.15
pyro.clear_param_store()
