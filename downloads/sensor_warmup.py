"""A reproducible CaliPy development example using simulated sensor readings.

Adapted from the Sphinx introductory warm-up example. Requires the development
block API, not the earlier public package. See LICENSE.md beside this file.
Run: python sensor_warmup.py --output warmup-output
Writes the dataset, numerical evidence, and a figure; never opens a plot window.
This is a MAP point fit with known noise, not posterior uncertainty estimation.
"""
from pathlib import Path
import argparse
import csv
import json
import platform

import calipy as cp
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pyro
import pyro.distributions as dist
import torch


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=Path("warmup-output"))
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    if not all(hasattr(cp, name) for name in ("block", "LatentParameter", "SVI")):
        raise SystemExit("This example needs CaliPy's development block API. See calpymodels.com/get-started/#development")
    pyro.clear_param_store()
    pyro.set_rng_seed(23)
    torch.set_num_threads(1)
    time = torch.linspace(0., 8., 64)
    truth = 24. - 4. * torch.exp(-time / 1.8)
    noise_sd = 0.15
    readings = dist.Normal(truth, noise_sd).sample()
    held_out = torch.arange(time.numel()) % 4 == 0
    train = ~held_out
    observation = cp.dim("observation")
    steady = cp.LatentParameter("steady", init=23., prior=dist.Normal(24., 2.))
    drop = cp.LatentParameter("drop", init=3., constraint=dist.constraints.positive,
                              prior=dist.LogNormal(torch.log(torch.tensor(4.)), 0.35))
    tau = cp.LatentParameter("tau", init=1.4, constraint=dist.constraints.positive,
                             prior=dist.LogNormal(torch.log(torch.tensor(2.)), 0.35))
    measurement = cp.RandomVariable.Normal("reading", scale=noise_sd, batch_dims=observation)

    @cp.block
    def model(time: observation):
        return measurement(loc=steady() - drop() * torch.exp(-time / tau()))

    result = model.fit(inputs={"time": time[train]},
                       outputs=cp.CalipyTensor(readings[train], observation),
                       method=cp.SVI.map(steps=1500, learning_rate=0.025, seed=23))
    estimates = {name: float(result[owner].mean.tensor) for name, owner in
                 (("steady", steady), ("drop", drop), ("tau", tau))}
    fitted = estimates["steady"] - estimates["drop"] * torch.exp(-time / estimates["tau"])
    baseline = readings[train].mean().expand_as(time)
    rmse = lambda prediction: float(((prediction[held_out] - readings[held_out]) ** 2).mean().sqrt())
    evidence = {
        "data_kind": "simulated", "seed": 23, "n_train": int(train.sum()),
        "n_held_out": int(held_out.sum()), "split": "every fourth observation held out, starting at index 0",
        "method": "MAP point estimate using CaliPy SVI.map", "steps": 1500, "learning_rate": 0.025,
        "known_noise_sd": noise_sd, "units": {"reading": "illustrative degrees Celsius", "time": "minutes"},
        "truth": {"steady": 24., "drop": 4., "tau": 1.8}, "estimates": estimates,
        "held_out_rmse": {"constant_training_mean": rmse(baseline), "warmup_model": rmse(fitted)},
        "versions": {"python": platform.python_version(), "torch": torch.__version__, "pyro": pyro.__version__},
        "limitations": "Synthetic interpolation example with correct model family and known noise; no customer result, extrapolation test, posterior interval, or convergence guarantee.",
    }
    assert fitted.shape == readings.shape == (64,)
    assert bool(torch.isfinite(fitted).all())
    assert abs(estimates["steady"] - 24.) < 0.3
    assert abs(estimates["tau"] - 1.8) < 0.5
    assert evidence["held_out_rmse"]["warmup_model"] < evidence["held_out_rmse"]["constant_training_mean"]
    (args.output / "warmup-results.json").write_text(json.dumps(evidence, indent=2) + "\n")
    with (args.output / "warmup-data.csv").open("w", newline="") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerow(["time_min", "reading", "true_mean", "split"])
        writer.writerows((float(t), float(y), float(m), "held_out" if bool(h) else "train")
                        for t, y, m, h in zip(time, readings, truth, held_out))
    plt.rcParams.update({"figure.facecolor": "#0b121e", "axes.facecolor": "#0b121e",
                         "text.color": "#e6f1f4", "axes.labelcolor": "#9bacbf",
                         "xtick.color": "#9bacbf", "ytick.color": "#9bacbf",
                         "axes.edgecolor": "#23334a", "font.size": 11, "svg.fonttype": "none"})
    fig, ax = plt.subplots(figsize=(10, 5.4), layout="constrained")
    ax.scatter(time[train], readings[train], s=20, color="#8299ba", label="Training readings (48)")
    ax.scatter(time[held_out], readings[held_out], s=48, marker="D", facecolors="none", edgecolors="#e6f1f4", label="Held-out readings (16)")
    ax.plot(time, truth, color="#e6f1f4", lw=1.2, linestyle=":", label="Known generating mean")
    ax.plot(time, fitted, color="#4b91f4", lw=2.5, label="CaliPy warm-up point fit")
    ax.plot(time, baseline, color="#dea44b", lw=1.5, linestyle="--", label="Constant baseline")
    ax.set(xlabel="Minutes after power-up", ylabel="Simulated reading (°C)", xlim=(-0.15, 8.15))
    ax.set_title("One sensor. A response with a reason.", loc="left", pad=20, fontsize=18, fontweight="bold")
    ax.spines[["top", "right"]].set_visible(False)
    ax.grid(axis="y", color="#23334a", alpha=.6)
    ax.legend(loc="lower right", frameon=False, fontsize=9)
    fig.savefig(args.output / "warmup-fit.svg", metadata={"Date": None})
    svg = args.output / "warmup-fit.svg"
    svg.write_text("\n".join(line.rstrip() for line in svg.read_text().splitlines()) + "\n")
    plt.close(fig)
    print(json.dumps(evidence, indent=2))
    print("PASS: finite predictions, parameter recovery, and held-out baseline comparison.")


if __name__ == "__main__":
    main()
