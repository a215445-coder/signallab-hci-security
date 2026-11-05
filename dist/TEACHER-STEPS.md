# Teacher workflow: TK2233 Cybersecurity

Checked against the teaching kit on 5 November 2026. This follow-up applies the staged requirements to the existing prototype in this same conversation. Earlier commits are preserved; they are not presented as having followed this sequence originally.

## Prompt 1 — Foundation

Task: one self-contained HTML/CSS/JavaScript simulator, English, responsive, without external libraries, for introductory TK2233 learners.

Topic: how interface evidence and warning policies support phishing decisions. Invisible process: cue weights become a score; comparison with a threshold produces a warning; authored ground truth determines misses and false alarms. Context: a campus inbox and Mira as its learning guide.

The teacher's C code/call-stack example illustrates functions. For cybersecurity, the corresponding display is the executable warning rule beside the per-message calculation trace. This topic adaptation preserves input → process → output rather than copying an unrelated C example.

Reviewed research summary supplied to this stage:
1. Inspect fictional sender and destination evidence.
2. Explain the evidence after a decision.
3. Offer difficulty choices and performance-based guidance.
4. Recall the principles and plan a later follow-up.
5. Apply the ideas to fresh cases with an action and reason.

Research provenance and limitations: [AI design log](AI-DESIGN-LOG.md). The initial policy calculations passed all 11 hand-calculated threshold cases before adding later presentation features.

## Prompt 2 — Predict first

Before revealing the policy results, require a choice from three predictions. Distractors express two misconceptions: lowering a threshold improves both kinds of error automatically, or changes the underlying messages. Feedback is explanatory, without negative points or punitive red styling. Existing policy logic is retained.

## Prompt 3 — Avatar and story

Add an inline SVG Mira and a speech bubble. Connect changing teaching states to the campus-inbox metaphor, followed by the technical term. Keep all scoring rules unchanged.

## Prompt 4 — Repetition

Keep recall separate from the hidden inbox; re-ask previously wrong recall items after reopening. Add random input variation to the policy experiment. The rule trace is hidden during recall by navigating to the report. This is the cybersecurity counterpart of hiding/blurring the example code. Same-session recall is not a delayed retention test.

## Prompt 5 — Three levels and DDA

Keep the three authored message levels. The challenging cases address convincing context and deceptive domains. Consecutive practice decisions inform a visible recommendation: two preferred actions suggest a higher level; two risky actions show hints and suggest an easier level. Safe verification alternatives are not counted as risky. Recommendations remain optional.

## Step 4 — Accuracy audit

Use the trace table, boundary cases, content-reference check, actual peer trial and optional lecturer review in [VALIDATION.md](VALIDATION.md). Software checks cannot replace a friend or lecturer. Course lecture-specific alignment is still unverified.

## Step 5 — Share and submit

[Public repository](https://github.com/a215445-coder/signallab-hci-security) and [GitHub Pages](https://a215445-coder.github.io/signallab-hci-security/) exist. Pages serves the standalone files from the gh-pages branch. The guided demonstration video is available at [demo.html](demo.html); participant video review, participant details, registration and actual human reviews remain pending. The kit requires a 2–3 minute video and short documentation; no live presentation. One entry per student.

## Follow-up verification

Executed in the documented order in this conversation: foundation/rule check → prediction gate → SVG avatar → repetition additions → DDA correction → accuracy checks.

- Foundation and calculation preservation: application syntax and 11 independently hand-calculated policy cases pass after the changes.
- Predict first: results remain gated until a prediction. Choosing the incorrect “both errors decrease” option gives explanatory revision feedback.
- Avatar: inline SVG and metaphor/technical-term speech bubbles render in the policy view and per-message trace; the scenario guide also uses the avatar.
- Repetition: “Try other values” changed threshold 4 to 0 during the browser test. Answering HTTPS recall incorrectly, then reloading, enabled the item again with a returning-review notice.
- DDA: two consecutive risky decisions produced the explanation, evidence hint and easier-level recommendation. The suggestion navigated to its named level.
- No browser console errors were observed during these checks.

Audit trace: P3 has cue values [1,0,1,0] and weights [3,3,1,2]; 3+0+1+0=4. At threshold 4 it warns (4 ≥ 4), so the authored phishing label produces TP. At threshold 5 it does not warn, producing FN and 5 cost points at default weights. Browser output at threshold 4 matched; both calculations are included in the automated model checks. A second human’s hand-worked confirmation remains pending.

Boundaries: threshold 0 warns on all eight; threshold 10 warns on none; negative or noninteger thresholds are rejected by the model. UI ranges prevent those invalid values. Accuracy references remain the NIST guide and the original research recorded in the AI log; lecture-note alignment, peer trial and optional lecturer review are not marked complete.
