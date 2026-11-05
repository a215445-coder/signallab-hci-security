# SignalLab — Validation and Human Review Record

**Version reviewed:** SignalLab v2 development build; see the Git commit containing this record  
**Review date:** 4 November 2026  
**Software reviewer:** Codex-assisted checks; human reviewers remain pending

This record distinguishes software correctness, content review and evidence of learning. A working prototype is not proof that it improves real-world phishing detection.

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

A roughly 2 minute 51 second video presents real browser interactions with English synthetic narration, on-screen captions and focus zooms. It is a guided demonstration, not continuous screen recording or peer-study footage. [Play video](demo.html) · [Transcript](media/demo-transcript-v7.md). Participant review remains pending.

### Copy-ready peer task (about 10 minutes)

Open the simulator in a fresh browser profile, inspect one fictional message, predict the effect of lowering the threshold, compare thresholds 4 and 2, and explain one missed threat and one false alarm. Complete the three fresh cases without coaching. Record an anonymous participant code, any confusing wording, the first-run action/reason result, and one suggested improvement in the table above. Do not reset a participant’s first run during the trial.
