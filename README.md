# SignalLab

**The human side of cybersecurity.** An interactive learning simulator connecting phishing decisions, security-interface design and warning-policy trade-offs.

Built for the FTSM Simulator Challenge, with an English learner interface. This repository contains the current v2 development build; GitHub Pages publishing is configured from the `gh-pages` branch.

**[Open the simulator](https://a215445-coder.github.io/signallab-hci-security/)** · **[Watch the 2–3 minute demo](https://a215445-coder.github.io/signallab-hci-security/demo.html)**

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

Policy scores and costs are explicitly synthetic teaching fixtures, not a real detector or NIST Phish Scale ratings. Practice results are not proof of learning improvement. Actual peer trials, course-content review, participant details, participant review of the demo remain to be completed.

## Teacher’s workflow — status checked 5 November 2026

Follow the [teaching kit](https://nazatulainiabdmajid.github.io/kit-cabaran-simulator-FTSM/#hantar) in this order. Completed implementation does not replace the research and human checks.

1. **Choose:** **TK2233 Cybersecurity × HCI**, focusing on phishing decisions and warning interfaces. Confirm the exact course concept against lecture material. Registration status is unconfirmed; deadline 18 December 2026.
2. **Research and build:** The simulator is implemented. UKM Library / Scopus AI research and a NotebookLM full-text extraction were performed on 5 November 2026 as a follow-up to the prototype. See the AI design log for screening corrections and the open-access source. The reviewed five-line summary has now been applied through the staged follow-up documented in [Teacher steps](dist/TEACHER-STEPS.md); the original build is not relabelled as that process.
3. **Check and test:** Automated policy calculations and selected browser journeys have passed. Finish the five manual checks, actual classmate trials and lecturer confirmation using the validation record.
4. **Prepare submission:** Repository and Pages publishing are configured; short documentation and the video script exist. A 2 minute 54 second guided demo with actual application screenshots, English synthetic narration and on-screen captions is available. It is edited screenshot footage, not a continuous screen recording or peer-study evidence. Final participant review remains pending. Finish preparation by 3 January 2027; submit during 4–17 January 2027.

The kit says one entry per student and no live presentation. Confirm how any group coursework maps to the individual competition entry.

Teacher sequence and topic adaptations: [Prompt 1–5 and checks](dist/TEACHER-STEPS.md).
