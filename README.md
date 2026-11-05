# SignalLab v2 · The Human Side of Security

An interactive **Cybersecurity × Human–Computer Interaction** learning simulator for the FTSM Interactive Learning Simulator Challenge.

**Explore one question:** How can a security interface help people make safer decisions while avoiding unnecessary interruptions?

Students inspect fictional campus messages, redesign warnings, adjust an explicit warning policy and apply what they learned to fresh cases. The simulator runs in the browser with no installation, account or backend required.

[GitHub repository](https://github.com/a215445-coder/signallab-hci-security) · [Start locally](#start-locally) · [Explore the simulator](#explore-the-simulator) · [Competition alignment](#competition-alignment) · [Research and limits](#research-and-limits) · [Submission status](#submission-status)

## Start locally

From the repository checkout, open **`dist/index.html`** in a modern browser. All application HTML, CSS and JavaScript are bundled in that file.

If your browser restricts storage for local files, serve the `dist` folder:

```sh
python3 -m http.server 8000 --directory dist
```

Then open [the local simulator](http://localhost:8000). Keep the companion Markdown documents in `dist` so the app's documentation downloads remain available.

For GitHub Pages, publish the **contents of `dist`** as the site artifact. The hosted site should have `index.html` at its URL root. The development repository is [a215445-coder/signallab-hci-security](https://github.com/a215445-coder/signallab-hci-security). GitHub Pages publishing is configured from the `gh-pages` branch: [Open SignalLab](https://a215445-coder.github.io/signallab-hci-security/).

## Explore the simulator

| Workspace | What you do | What it teaches |
|---|---|---|
| **Simulation** | Inspect six fictional campus messages and choose a next action | Use evidence and independently known context; verify when uncertain |
| **Design lab** | Keep a message fixed while changing warning wording and sender visibility | Visibility, recognition over recall, actionable feedback and error prevention |
| **Warning policy** | Predict, change an alert threshold, inspect message traces and vary illustrative costs | How a fixed rule produces missed threats and unnecessary interruptions |
| **Transfer check** | Answer three fresh cases with an action and a reason; receive explanations after the complete set | Apply the principles without a guided warning revealing the answer |
| **Learning report** | Review actual attempts, revisit decisions, answer recall questions and export records | Reflect on reasoning and distinguish guided practice from fresh application |
| **Research & guide** | Read the rationale and download the supporting documents | Connect design choices to references and verification |

The distinctive learning loop connects **the student's inbox decision** with **the designer's warning-policy trade-off**. In the policy lab, inputs change a displayed rule's outputs; the learner can reproduce the calculation instead of simply watching an animation.

### Learning objectives

- Distinguish a display name from an actual sender or destination.
- Explain why HTTPS and a personally relevant story do not establish legitimacy.
- Choose a proportionate action, including verification through a known contact.
- Explain how evidence visibility and actionable warnings support a human decision.
- Trace how changing a warning threshold affects missed threats and false alarms.

Feedback distinguishes the preferred action, a cautious alternative and a decision to revisit. Independent verification is not labelled dangerous merely because another action is preferred.

## Competition alignment

The official teaching kit was checked on **4 November 2026**. **Creativity and innovation contribute 15%**; accuracy, functionality and learning value together contribute 70%. The following is an evidence map, not a predicted score or award claim.

| Criterion | Marks | Evidence in this project |
|---|---:|---|
| Concept and content accuracy | 25 | Scenario rationales, explicit model assumptions, message traces and validation record |
| Interactivity and simulator functionality | 25 | Adjustable inputs, calculated outcomes, evidence inspection, persistence and export |
| Learning value | 20 | Predict → observe → explain → transfer → recall |
| Creativity and innovation | 15 | Link individual security decisions with the design of warning sensitivity and support |
| Meaningful use of generative AI | 10 | Documented design, critique and revision process |
| Documentation and video | 5 | Repository documentation and a focused 2–3 minute demonstration script |

Official sources: [competition announcement](https://www.ftsm.ukm.my/cabaransimulator/) · [teaching kit and judging rubric](https://nazatulainiabdmajid.github.io/kit-cabaran-simulator-FTSM/#hantar).

## Research and limits

- **Dawkins & Jacobs (2023), NIST Phish Scale User Guide, TN 2276.** [Publication](https://doi.org/10.6028/NIST.TN.2276). Informs attention to message cues and recipient context.
- **Egelman, Cranor & Hong (2008), You've Been Warned, CHI.** [DOI](https://doi.org/10.1145/1357054.1357219) · [author-hosted paper](https://www.cs.cmu.edu/~jasonh/publications/chi2008-active-warnings-study-final.pdf). Motivates examination of security-warning interfaces.

The policy lab uses an **authored synthetic dataset**, cue weights and illustrative cost units. It is not a deployed phishing detector or the formal NIST Phish Scale. Its counts describe that fixture batch; they do not predict human behaviour, real-world risk or warning fatigue. The warning variants are original teaching designs, not replicas of the published experiment.

Practice records describe the local session. On-screen support and repeated exposure affect performance. The first Transfer check run is separate from guided practice, but three fresh cases are not a validated assessment or proof of learning improvement.

Generative AI assisted with drafting, implementation and revision. References were located through web research; **Scopus AI and NotebookLM use is not claimed**. Peer feedback and lecturer approval must be recorded only after real review.

Fictional message links never open a real destination. The app collects no credentials and uses browser-local progress storage; exporting creates a local JSON file.

## Repository guide

Keep the project and its supporting evidence together:

| Path | Purpose |
|---|---|
| [`dist/index.html`](index.html) | Complete interactive simulator |
| `dist/README.md` | This project overview and submission details |
| [`dist/DEMO-SCRIPT.md`](DEMO-SCRIPT.md) | 2–3 minute screen-recording script |
| [`dist/VALIDATION.md`](VALIDATION.md) | Calculation checks, peer-trial record and course review |
| [`dist/AI-DESIGN-LOG.md`](AI-DESIGN-LOG.md) | Actual AI contributions, critiques and design revisions |

The app's **Research & guide** workspace provides direct downloads of the supporting documents.

## Submission status

| Required detail | Status |
|---|---|
| Participant name / matric number | TO BE COMPLETED |
| Official course code and title | TO BE COMPLETED |
| GitHub repository | [Development repository](https://github.com/a215445-coder/signallab-hci-security); public repository |
| GitHub Pages link | [Open SignalLab](https://a215445-coder.github.io/signallab-hci-security/) |
| Actual 2–3 minute demo video | TO BE RECORDED |
| Peer trial findings | Record actual results in `dist/VALIDATION.md` |
| Lecturer concept review | PENDING — encouraged by the teaching kit |

The published rules specify **one entry per student**. If the project was developed as a group, confirm the entry arrangement with the organiser. Registration closes **18 December 2026**; submission is **4–17 January 2027** according to the checked pages. Recheck the official announcement before submitting.

## Demonstration video

[Watch the 2 minute 51 second demo](https://a215445-coder.github.io/signallab-hci-security/demo.html). Real browser interactions, edited with English synthetic narration, on-screen captions and focus zooms. [Transcript](media/demo-transcript-v10.md). Participant sign-off remains pending; this is not learner-study footage.

## TK2233 research follow-up

The participant confirmed **TK2233 Cybersecurity** on 5 November 2026. Scopus AI was accessed through UKM Library; a cited open-access review was subsequently imported into NotebookLM as full PDF text. See [the actual research log](AI-DESIGN-LOG.md#research-follow-up--5-november-2026). Course-lecture alignment and human learning effects remain to be checked.
