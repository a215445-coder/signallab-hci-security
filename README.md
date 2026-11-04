# SignalLab

**The human side of cybersecurity.** An interactive learning simulator connecting phishing decisions, security-interface design and warning-policy trade-offs.

Built for the FTSM Simulator Challenge, with an English learner interface. This repository contains the current v2 development build; GitHub Pages is not deployed yet.

## Try it

Download or clone the repository and open **[dist/index.html](dist/index.html)** in a browser. The simulator is self-contained and works without installing dependencies. GitHub's file preview shows source code; download the file to run it.

For a local web preview, run `python3 -m http.server 8767 --directory dist` from this repository, then open `http://localhost:8767/`.

## What learners do

- Inspect six fictional campus messages and compare three warning designs.
- Predict a warning-policy outcome, adjust the threshold and costs, and trace all eight synthetic messages through the calculation.
- Pin a policy for comparison and see the trade-off between missed threats and unnecessary interruptions.
- Apply the ideas to three fresh cases, selecting both an action and a reason before feedback is revealed.
- Review first attempts, recall key principles and export a local learning record.

## Project materials

| Material | Location |
|---|---|
| Complete simulator and source | [dist/index.html](dist/index.html) |
| Learning objectives, references and rubric mapping | [Project guide](dist/README.md) |
| 2–3 minute demonstration script | [Demo script](dist/DEMO-SCRIPT.md) |
| Software checks and pending human review | [Validation record](dist/VALIDATION.md) |
| AI contribution and design iterations | [AI design log](dist/AI-DESIGN-LOG.md) |

Run `node scripts/check.cjs` to check JavaScript syntax and the actual embedded policy model against hand-calculated expectations.

## Competition focus

The [official teaching kit](https://nazatulainiabdmajid.github.io/kit-cabaran-simulator-FTSM/#hantar) allocates **25% accuracy, 25% interactivity/functionality, 20% learning value, 15% creativity, 10% meaningful generative AI use and 5% documentation/video**. Creativity is one part of the score.

Policy scores and costs are explicitly synthetic teaching fixtures, not a real detector or NIST Phish Scale ratings. Practice results are not proof of learning improvement. Actual peer trials, course-content review, participant details, public submission links and the final video remain to be completed.
