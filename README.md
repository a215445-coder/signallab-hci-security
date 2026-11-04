# SignalLab — The Human Side of Security

An interactive learning simulator for **Cybersecurity × Human–Computer Interaction (HCI)**.

## Submission details to complete

- Participant name / matric number: **TO BE COMPLETED**
- Course code and official course title: **TO BE COMPLETED**
- GitHub repository URL: **TO BE COMPLETED AFTER UPLOAD**
- GitHub Pages URL: **TO BE COMPLETED AFTER PUBLISHING**
- Demo video URL (2–3 minutes): **TO BE COMPLETED AFTER RECORDING**
- Lecturer review (encouraged): **PENDING — do not claim approval before review**
- Peer trial: **PENDING — record actual feedback after testing**

The published competition pages say one entry per student. If this work was developed as a group activity, confirm how it should be entered before submission.

## Concept and learning objectives

**Single central concept:** usable security warnings support human phishing decisions by making relevant evidence and appropriate next steps understandable.

After using SignalLab, a learner should be able to:

1. Distinguish a display name from a full sender address and link destination.
2. Combine message cues with independently confirmed task context.
3. Explain why HTTPS, familiar wording and personal relevance do not prove legitimacy.
4. Choose between continuing a confirmed task, verifying an uncertain request, and reporting a suspicious message.
5. Connect warning design to visibility, recognition over recall, error prevention and feedback.

## Why this is a simulator

The learner changes warning style, full-sender visibility and decisions. JavaScript renders different interface conditions and computes feedback and practice statistics from those inputs. The scenario evidence and answer rationale remain fixed when the design changes. This makes the human–interface relationship observable rather than presenting only a static explanation.

The three warning conditions are **Minimal** (a generic passive notice), **Clear** (specific relevant evidence) and **Actionable** (evidence plus a practical next step). These are teaching variants, not replicas of a published experiment. Actionable conditions deliberately provide more decision support, so their results must not be interpreted as unaided detection ability.

## Features

- Six fictional campus-email scenarios across three author-designed teaching levels.
- Suspicious, corroborated routine and uncertain messages.
- Sender and destination inspection; message buttons reveal evidence rather than open links.
- Interactive warning-design laboratory with fixed scenario ground truth.
- Immediate evidence-based feedback and a connection to an HCI principle.
- An optional difficulty suggestion after two consecutive supported or unsupported attempts; the learner chooses whether to change level.
- Three recall questions without the email visible.
- Local progress, missed-scenario review and JSON report export.
- English interface, responsive layout, keyboard focus indicators and semantic controls.

## Research used and design interpretation

1. **Dawkins, S., & Jacobs, J. (2023). NIST Phish Scale User Guide. NIST TN 2276.** https://doi.org/10.6028/NIST.TN.2276
   - Design interpretation: vary message cues and task context rather than equating poor spelling with phishing. Our difficulty levels are not formal NIST ratings.
2. **Egelman, S., Cranor, L. F., & Hong, J. (2008). You've Been Warned: An Empirical Study of the Effectiveness of Web Browser Phishing Warnings. CHI 2008.** https://doi.org/10.1145/1357054.1357219
   - Design interpretation: let students compare generic notices against more explanatory and actionable interfaces. No published effect size is used to generate learner outcomes.
   - Author-hosted paper: https://www.cs.cmu.edu/~jasonh/publications/chi2008-active-warnings-study-final.pdf

These sources were located through web research. No claim is made that Scopus AI or NotebookLM was used. If your course expects that workflow, independently retrieve and read the papers, then record the actual tools and findings.

## Scenario answer trace

| Scenario | Key contextual evidence | Best next action in this scenario | HCI concept |
|---|---|---|---|
| Account expiry | Unexpected password request; different service domain | Report message; independently open saved portal if needed | Visibility / recognition |
| Library reminder | Loan and renewal service independently confirmed in saved portal | Continue the known library task | Calibrated trust |
| Scholarship fee | Fee request contradicts known application process | Report; check saved application portal | Context-aware feedback |
| Timetable export | User initiated task; export confirmed independently | Continue the known timetable task | System status / task continuity |
| Research invitation | Opportunity plausible; platform not independently confirmed | Verify with lecturer through a known contact | Support for uncertainty |
| Misleading hostname | Trusted name is a prefix of a different domain; unexpected sign-in | Report; use saved assessment portal | Security mental models |

Other safe responses can be reasonable in practice. The simulator assesses the **best-supported next step under the specific stated facts**, not a universal rule that verification or reporting is always wrong. The instructor should review these distinctions.

## Calculation rules and limits

- First-attempt accuracy = supported first decisions / answered unique scenarios × 100, rounded to a whole percent.
- Average decision time = sum of first-attempt seconds / answered unique scenarios.
- Before any answer, accuracy and average time display a dash rather than a misleading zero.
- Retry attempts are retained but never replace first-attempt results.
- Each attempt records its warning condition, sender-visibility setting, evidence inspected and self-reported confidence.
- Timing excludes time while the tab is hidden or another app view is active. It is an approximate practice measure and restarts on a reload or a new attempt.
- Design-condition counts include retries. They are descriptive, not a controlled A/B comparison.
- Report export contains only local practice decisions, timings and timestamps. No name, student ID or credential is requested.

No risk probability, predicted detection accuracy or claimed learning improvement is invented. To evaluate learning outcomes, use instructor-reviewed pre/post tasks and balanced conditions with previously unseen messages.

## AI assistance and verification

Generative AI (Codex) assisted in scenario drafting, interface design, code and explanations. The originating chat records the actual instructions. The implementation brief was:

1. Build a static English-language HCI/cybersecurity simulator for the FTSM challenge.
2. Keep scenario evidence fixed while warning design changes.
3. Include prediction/decision, explanation, recall and optional difficulty support.
4. Record actual attempts without fabricated effects.
5. Use fictional domains and publish a portable, dependency-free artifact.

During implementation, verify that domain mismatch is treated as evidence rather than sufficient proof, HTTPS is not described as proof of institutional identity, and unfamiliar but plausible invitations permit independent verification. Peer and lecturer checks remain pending until real people perform them.

## Run and publish

The app is one dependency-free `index.html` file. Open it directly in a modern browser for offline use. If local-file storage is restricted, serve this folder with a local static web server. Documentation links need the two Markdown files in the same folder.

For GitHub Pages:

1. Create the intended public GitHub repository.
2. Upload **the contents of this folder** (`index.html`, `README.md`, `DEMO-SCRIPT.md`) into the repository root.
3. Enable Settings → Pages → Deploy from a branch → main → / (root).
4. Verify the deployed simulator and documentation links, then fill in the repository and Pages URLs above.

The separate Sites preview is owner-private. It is not the public GitHub Pages link required for competition submission.

## Manual review before submission

- Follow each scenario using the answer trace above; challenge the rationale against your actual course notes.
- Compare Minimal → Clear → Actionable on one fixed scenario; confirm only the interface support changes.
- Test sender visibility, destination inspection, a wrong answer, retry and missed review.
- Test the unanswered state, first answer, all six scenarios and repeated attempts.
- Reload, export the report and check that first-attempt scores are retained.
- Check keyboard navigation, narrow-screen layout and download links.
- Ask a classmate to think aloud; record observed confusion and the resulting change.
- Ask the course lecturer to review both cybersecurity facts and HCI terminology.

Competition sources: https://www.ftsm.ukm.my/cabaransimulator/ and https://nazatulainiabdmajid.github.io/kit-cabaran-simulator-FTSM/
