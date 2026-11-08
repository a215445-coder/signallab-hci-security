# SignalLab — Validation and Human Review Record

**Version reviewed:** SignalLab v2 development build; see the Git commit containing this record  
**Review date:** 4 November 2026  
**Software reviewer:** Codex-assisted checks; human reviewers remain pending

This record distinguishes software correctness, content review and evidence of learning. A working prototype is not proof that it improves real-world phishing detection.

## 8 November 2026 — 3D and motion follow-up

### Information observatory redesign (current)

Replaced the small desk hero with a procedural Three.js mail exhibit and a matching SVG fallback; added a dark exhibition stage, editorial case layout, system display typography and redesigned experiment illustrations. All six case artworks were regenerated as subject-specific product still lifes. Research depicts an academic invitation rather than laboratory equipment. AI image originals, exact prompts and optimized copies are preserved in the motion source directory. No authored case evidence, preferred actions or policy calculations were changed.

- Verified all six homepage images load at 1104px and each matching detail/Design Lab selection displays the corresponding new image.
- Opened the first case, inspected sender and destination, saved a cautious verification decision and advanced to the library case. Compared actionable and minimal warnings, then ran the eight-message policy experiment. No page script errors were recorded in this journey.
- Tested raycast selection on the exhibit magnifier: it opened Experiments. Equivalent visible HTML buttons remain available. Checked manual motion toggling and system reduced motion; the exhibit stays still and all six case images remain present. A simulated WebGL context loss exposes the matching mail SVG.
- Checked homepage, experiments, notebook, case detail, Design Lab and policy at widths 320, 390 and 1440. Fixed a 320px overflow in the three-step practice indicator and verified that width again. Other checked layouts had no horizontal overflow.
- Inspected integrated homepage/experiment screenshots and checked mobile layout dimensions. Browser learning records and manual motion preferences were restored after verification. Existing syntax and all 11 hand-calculated policy checks pass.

These browser checks do not certify physical-device performance or replace the pending human usability/content review below. Earlier desk, miniature and palette notes describe superseded intermediate designs.

### Multi-color palette (latest)

Applied fog-white surfaces and navy text, blue main actions, purple experiment controls, teal evidence/notebook areas, six consistent case accents, amber cautions and green completed feedback. Recolored the procedural homepage desk and its inbox texture. Original case raster illustrations remain unchanged.

Checked homepage, experiment landing, notebook and case detail at widths 320, 390 and 1440: no horizontal overflow. Exercised sender inspection, a cautious account decision and next-case navigation; opened the research preview in Design Lab and ran the policy experiment. Learning data was restored afterward. Checked primary button and six topic label color pairs against 4.5:1, correcting the library label. These are targeted checks, not a complete accessibility audit. Existing syntax and all 11 policy calculations pass.

### Keyword-image replacement (latest)

Replaced the earlier six procedural case miniatures with built-in AI-generated keyword illustrations. Verified all six homepage images load and each case detail and Design Lab selection uses its matching topic image. At browser viewport widths 320, 390 and 1440, the homepage had no horizontal overflow. Reduced-motion mode retained all six images; the separate homepage desk retained its canvas. Inspected the integrated homepage screenshot. Syntax and all 11 policy-model checks passed. This supersedes the live case-renderer behavior described in the earlier follow-up below; the old case renderer is no longer mounted.

Case-visual follow-up: verified six different rendered posters and six matching detail-page topic IDs; each homepage card entered its own live scene on hover, with at most one case canvas attached. Design Lab selecting the research case displayed the research scene. A library decision and advance to the scholarship case passed. Reduced-motion mode retained all six posters with no live case canvas. Simulated case-renderer context loss exposed all six SVG fallbacks. Homepage and library detail layouts had no horizontal overflow at widths 320, 390 and 1440. Inspected homepage and detail screenshots. Browser learning records were restored after the checks.

Checked the standalone local file after embedding Three.js and GSAP:

- The procedural desk rendered through WebGL; clicking its notebook opened My notebook. The manual animation toggle switched state correctly.
- Inspected sender and destination, saved a high-confidence decision with both inspection flags, then advanced to the next case. Both warning designs appeared in comparison mode.
- Ran the eight-message policy experiment, pinned a baseline, changed the threshold, reset and randomized it. Reset retains the experiment navigation and progressive disclosures.
- Replayed all six guided cases and all three transfer cases. Six attempts and three transfer records were saved; no page script errors were recorded in that journey. Original browser learning data was restored afterward.
- Emulated reduced motion: animation control reflected the system preference and the scene remained available as a still view. Simulated a WebGL context loss: the original SVG became visible.
- Checked homepage widths of 320, 390 and 1440 pixels: no horizontal overflow and one active scene canvas. Inspected a full-page screenshot of the narrow layout.
- Existing syntax and all 11 hand-calculated policy-threshold cases passed through `scripts/check.cjs`.

These are software checks in the integrated browser, not physical-device performance certification or evidence of learning effectiveness. Human trials remain pending.

## 1. Software checks

The earlier prototype was exercised through six scenarios, retry, persistence, recall, export and narrow-screen layout. Those checks do not validate later changes. Record the final build's results below; do not mark a check passed before running it.

| Check | Expected result | Actual result / evidence | Status |
|---|---|---|---|
| Policy threshold = 0 | Every fixture with nonnegative score triggers a warning | 8/8 warned; TP 4, FP 4, FN 0, TN 0. Browser and embedded-model check. | Passed |
| Policy threshold = 10 | No fixture with score below 10 triggers a warning | 0/8 warned; TP 0, FP 0, FN 4, TN 4. Browser and embedded-model check. | Passed |
| Score equals threshold | Warning is triggered by the displayed ≥ rule | P3 score 4 triggers at threshold 4. | Passed |
| Lower threshold, fixed batch | Warning count cannot decrease | All 11 thresholds checked by scripts/check.cjs; warning counts are monotonic. | Passed |
| Confusion-matrix totals | TP + FN = threat count; FP + TN = legitimate count | Both class totals remain 4 for every threshold. | Passed |
| Cost calculation | Missed threats × miss weight + unnecessary interruptions × interruption weight | Thresholds 4, 2, 0, 10 give 6, 2, 4, 20 at default weights; all 11 hand-counted cases pass. | Passed |
| Change cost weights only | Cost changes; classifications do not | Miss cost 5 → 10 at threshold 4 changes total 6 → 11; classifications unchanged. | Passed |
| Change warning presentation | Message evidence and ground truth do not change | — | Pending |
| Safe alternative | Independent verification is not described as a dangerous choice | Verify separately on the account case produces “A cautious alternative”, not unsafe feedback. | Passed |
| Transfer check | Three fresh cases require both action and reason; explanations wait until all are submitted | Three action + reason cases completed; explanations appeared only after the full set. | Passed |
| First run and retry | First transfer run remains distinguishable from later practice | Completed first transfer round remained visible after navigation and reload. No per-test overwrite control. | Passed |
| Empty report | No fabricated success rate or outcome is shown | — | Pending |
| Reload and export | Saved practice records restore; exported values match the report | Reload restored practice and three transfer answers. Export opened a native save dialog; saving was cancelled, so final file contents were not reverified. | Partial |
| Keyboard and phone | Inputs are labelled; controls usable without horizontal overflow | Policy sliders operated with arrows/Home/End. At the browser’s effective 520px width, scrollWidth = clientWidth = 520. 390px and real-device checks remain pending. | Partial |
| Documentation downloads | All linked files exist on the deployed site | All linked Markdown files exist locally; v2 deployment/download verification remains pending. | Partial |

### Hand-worked policy trace

Choose one message and copy its actual displayed cue values. Have another person reproduce the result.

| Trace item | Recorded value |
|---|---|
| Fixture ID / title | — |
| Ground-truth label supplied by the teaching fixture | — |
| Cue weights and sum | — |
| Threshold | — |
| Comparison: score ≥ threshold | — |
| Warning outcome | — |
| Matrix category: TP / FP / FN / TN | — |
| Contribution to illustrative cost | — |
| Matches the screen? | — |

Repeat once at a threshold boundary. These authored scores are not NIST Phish Scale scores or real-world threat probabilities.

## 2. Course-content review

**Course notes / textbook and relevant section:** —  
**Peer reviewer and date:** PENDING  
**Lecturer reviewer and date:** PENDING  
**Lecturer approval wording, if actually provided:** —

Review these specific claims:

- Familiar display names and matching sender text do not independently authenticate a message.
- HTTPS does not prove that a site belongs to the claimed institution.
- A plausible external service can require verification rather than automatic rejection.
- Continuing a corroborated routine task differs from following an unverified request.
- More warnings can catch additional threats and interrupt additional legitimate tasks in this fixture model.
- The model does not demonstrate how a real person responds, nor measure warning fatigue.
- Practice and transfer results do not support an unqualified claim of improved learning.

| Issue found | Supporting course reference | Change made | Reviewer recheck |
|---|---|---|---|
| — | — | — | — |

## 3. Small peer usability trial

Purpose: find confusing explanations and broken interactions, and collect descriptive evidence. Start with 3–5 willing classmates for a pilot; this is a practical suggestion, not a competition requirement or a statistically sufficient effectiveness study.

1. Explain the task and ask permission to record anonymous observations. Use participant codes, not names or student IDs in shared results. Allow people to stop.
2. Before training, ask each person to explain what a lower warning threshold might change. Record their words without coaching.
3. Ask them to operate one message scenario, compare warning styles and test two policy thresholds. Ask them to think aloud. Record where they hesitate or misinterpret the interface.
4. After exploration, have them complete the three-case Transfer check without assistance. The app withholds explanations until the complete set is submitted. Keep the first run separate from retries.
5. Ask them to explain one false alarm, one missed threat and why a safe verification route is useful. Record their reasoning, not just a score.
6. Ask one improvement question: “What was hardest to understand or use?” Fix a concrete issue and, if possible, ask the participant to recheck it.

Do not describe a tiny convenience sample as proof of effectiveness. Reusing the same questions, coaching and repeated exposure can inflate results. A causal comparison would need a separately designed, instructor-reviewed study with balanced conditions and equivalent unseen items.

| Anonymous code | Initial threshold explanation | Observed confusion | Transfer first run (action + reason) | Post-task explanation | Change suggested |
|---|---|---|---|---|---|
| — | — | — | — | — | — |
| — | — | — | — | — | — |
| — | — | — | — | — | — |

**Actual participants tested:** 0 recorded here  
**Results summary:** PENDING  
**Changes supported by observations:** PENDING

## 4. Submission readiness

- [ ] Participant/course details are accurate.
- [ ] Group entry arrangement is confirmed if needed; published rule says one entry per student.
- [x] Public repository and working GitHub Pages links are in README.md.
- [ ] Final 2–3 minute video shows the actual final build.
- [ ] References, AI contribution and limitations are documented honestly.
- [ ] Final software checks, peer trial and course-content review are recorded above.

Registration closes 18 December 2026; submissions are 4–17 January 2027 according to the teaching kit checked on 4 November 2026. Recheck [the official page](https://www.ftsm.ukm.my/cabaransimulator/) before submitting.

## Staged follow-up checks — 5 November 2026

See [the teacher-step execution and trace](TEACHER-STEPS.md#follow-up-verification) for the tested avatar, random input, returning recall and two-decision DDA behavior. Human review fields above remain pending.

## Demo artifact — 5 November 2026

A roughly 2 minute 54 second video presents real browser interactions with English synthetic narration, on-screen captions and focus zooms. It is a guided demonstration, not continuous screen recording or peer-study footage. [Play video](demo.html) · [Transcript](media/demo-transcript-v13.md). Participant review remains pending.

### Copy-ready peer task (about 10 minutes)

Open the simulator in a fresh browser profile, inspect one fictional message, predict the effect of lowering the threshold, compare thresholds 4 and 2, and explain one missed threat and one false alarm. Complete the three fresh cases without coaching. Record an anonymous participant code, any confusing wording, the first-run action/reason result, and one suggested improvement in the table above. Do not reset a participant’s first run during the trial.
