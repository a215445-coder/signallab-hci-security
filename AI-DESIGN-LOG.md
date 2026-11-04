# SignalLab — Generative AI Design and Verification Log

This is a concise account of work in the originating Codex conversation. It is not a verbatim prompt transcript. Preserve the conversation or add a suitable excerpt if the organiser requests prompt evidence.

## Actual tools and sources

- **Generative AI:** Codex, used for planning, scenario and explanation drafts, interface design, implementation and revision.
- **Reference discovery:** web research and direct review of the competition teaching kit.
- **Scopus AI / NotebookLM:** not used in the recorded build so far; no use or extraction is claimed.
- **Human course validation:** pending. AI review cannot stand in for a classmate or lecturer.

## Iteration record

| Stage | User intent / working instruction (paraphrase) | AI contribution | Critique or verification decision |
|---|---|---|---|
| Select scope | Build a competition simulator for cybersecurity and HCI; choose phishing recognition and security interfaces | Proposed fictional campus-email scenarios and warning comparisons | Keep one coherent concept: support for human security decisions |
| Build foundations | Make the simulator interactive and usable in English | Produced the inbox, warning styles, evidence inspection and immediate explanations | Keep message evidence fixed when presentation changes; use fictional domains |
| Add learning support | Include recall, practice records and difficulty support | Added staged cases, feedback, recall and local reporting | Preserve first attempts when retrying; report actual observations rather than generated performance gains |
| Test the first build | Exercise the learner journey and export | Assisted with browser checks and inspection of exported records | Checked six scenarios, retry, reload, recall and narrow-screen layout; corrected view-transition timing handling |
| Recheck the rubric | Optimise against the official competition requirements | Compared the prototype with the six weighted criteria | Confirmed creativity is 15 points; accuracy, functionality and learning value together are 70 |
| Strengthen the simulation | Make the causal rule and design trade-off observable | Added a policy laboratory with a finite synthetic batch, adjustable threshold, trace and costs | Expose the rule and all assumptions; never describe fixture outcomes as real detector performance |
| Improve assessment and feedback | Separate supported practice from fresh application | Added a Transfer check with new cases, action plus reason, and feedback after the full set | Keep first transfer run separate; avoid giving away the answer before recording the judgement |
| Correct oversimplified judgement | Avoid labelling reasonable safety behaviour as dangerous | Revised feedback to distinguish preferred action, safe alternative and a decision to revisit | Independent verification can be safe even when reporting is the scenario's preferred action |

## Research-to-feature decisions

- **NIST TN 2276:** prompted attention to message cues and recipient context. The implementation's levels and numerical cue weights are our teaching design, not the NIST rating method.
- **Egelman, Cranor & Hong (CHI 2008):** motivated comparison of warning interfaces. Our text variants do not reproduce the experiment, and its measured outcomes are not transferred to this app.
- **Original design decision:** connect an individual's inbox judgement with a designer's sensitivity/cost trade-off, then use a fresh transfer task to revisit the principle.

## Important limitations caught during review

1. **Guidance can reveal an answer.** A successful guided decision is practice evidence, not unaided detection ability. The fresh Transfer check withholds explanations until the set is complete.
2. **Safe alternatives exist.** Feedback distinguishes an intended target action from another reasonable way to avoid risk, rather than treating all non-target answers as unsafe.
3. **Numbers can imply unwarranted certainty.** Policy counts come only from the disclosed synthetic fixtures. Cost units reflect chosen weights; neither is a real-world risk estimate.
4. **Familiarity changes performance.** First runs and retries must remain distinguishable. A before/after difference alone is not a causal effect.
5. **AI-written content still needs course review.** Scenario rationale, terminology and the toy model's limits require verification against the actual course material.

## What the participant should add

- The course source that confirms each main concept.
- Any actual Scopus AI / NotebookLM steps, with source pages and corrected extraction errors, if performed later.
- One concrete peer observation, the change it motivated and the recheck result.
- The lecturer's actual review status and date.
- The final commit or version shown in the video.

Do not invent prompts, article readings, test participants, endorsements or numerical improvements. The meaningful AI contribution is the documented design–critique–revision process and its verified output.
