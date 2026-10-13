"""Run the browser demo's teaching model with a local CaliPy development build.

The public calipy-ppl release may have an earlier API. Access and licence:
https://calpymodels.com/get-started/#development
This is illustrative data and a short single chain, not a customer benchmark.
"""
import calipy as cp
import pyro
import pyro.distributions as dist
import torch

if not all(hasattr(cp, name) for name in ("block", "LatentParameter", "NUTS")):
    raise SystemExit("A compatible CaliPy development Block API is required; see the URL above.")

torch.set_num_threads(1)
pyro.clear_param_store()
reading = cp.dim("reading")
values = torch.tensor([1.82, 2.04, 1.96, 2.13, 1.89, 2.08, 1.98, 2.10])
observed = cp.CalipyTensor(values, reading)
mu = cp.LatentParameter("mu", init=2., prior=dist.Normal(0., 5.))
measurement = cp.RandomVariable.Normal("measurement_a", scale=0.2)


@cp.block
def model():
    return measurement(mu())


result = model.fit(outputs=observed, method=cp.NUTS(
    warmup_steps=100, num_samples=320, max_tree_depth=5, seed=17,
    disable_progbar=True,
))
estimate = result[mu]
reference_variance = 1 / (1 / 5**2 + len(values) / .2**2)
reference_mean = reference_variance * values.sum().item() / .2**2
print("Posterior mean:", estimate.mean.tensor.item())
print("Posterior standard deviation:", estimate.standard_deviation.tensor.item())
print("Analytic reference:", reference_mean, "+/-", reference_variance**.5)
assert estimate.kind == "posterior"
assert torch.isfinite(estimate.samples.tensor).all()
assert abs(estimate.mean.tensor.item() - reference_mean) < .035
pyro.clear_param_store()
