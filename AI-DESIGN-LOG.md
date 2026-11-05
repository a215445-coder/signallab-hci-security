# SignalLab — Generative AI Design and Verification Log

This is a concise account of work in the originating Codex conversation. It is not a verbatim prompt transcript. Preserve the conversation or add a suitable excerpt if the organiser requests prompt evidence.

## Actual tools and sources

- **Generative AI:** Codex, used for planning, scenario and explanation drafts, interface design, implementation and revision.
- **Reference discovery:** web research and direct review of the competition teaching kit.
- **Scopus AI / NotebookLM:** used on 5 November 2026 through UKM Library and the student’s research notebook; see the research follow-up below. The initial prototype predates this step.
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

## Research follow-up — 5 November 2026

Course confirmed by participant: **TK2233 Cybersecurity**. Lecture-specific coverage remains unverified.

Actual search route: UKM Library e-resources → MyLOFT → Scopus → Scopus AI. Search question: “What interactive simulation-based or gamified tools have been evaluated for teaching university students phishing recognition and human-centred cybersecurity? Which features, such as immediate feedback, URL inspection, contextual warnings and retrieval practice, improved learning or transfer, and what limitations did the studies report?”

Screening correction: Scopus AI reference 8, *Phishing URL Classification in Cybersecurity Education: A Comparative Study of RF, SVM, DT, and LR*, evaluates ML models. Its model accuracy is not evidence of human learning gains. Reference 9, Köhler et al. (2024), DOI 10.1007/978-3-031-61489-7_15, concerns a human study; only its abstract and publisher preview were inspected, so no full-text review is claimed.

Citation follow-up from reference 9 identified the open-access review **Jampen et al. (2020), DOI 10.1186/s13673-020-00237-7**. Relevant full-text sections were read. The publisher PDF was downloaded locally. NotebookLM could not import its web/PDF URLs, and direct file upload lacked browser permission. Its full PDF text was extracted without AI summarisation and imported using Copied text; one usable source was confirmed. No Libquest request was made because this review is openly available.

Research-to-design check (review sections: Feedback, Knowledge retention, Implications for anti-phishing training tools): contextual explanations support the existing decision feedback; progression supports the difficulty guidance; recurring training motivates later follow-up, which the current same-session recall does not measure. These are design links, not measured effects of SignalLab.

NotebookLM was asked to provide a cited evidence table, separate findings from design proposals, suggest three elements and finish with a five-line Prompt 1 summary. The notebook remains in the participant’s account; its contents are not publicly shared.

Extraction review: NotebookLM produced a cited table and three suggested elements, but also proposed campus-directory integration, DNS changes and a CRI diagnostic, exceeding the standalone teaching scope. Its page ranges were not independently verified. These suggestions were rejected; section names are used for verification. A follow-up asks for exactly five short lines confined to fictional, offline teaching interactions.

The revised five-line answer was received and saved as a NotebookLM note. Reviewed design bridge for the next implementation prompt:

1. Let TK2233 learners inspect fictional senders and destinations.
2. Explain the evidence after a decision.
3. Offer difficulty choices with performance-based guidance.
4. Provide recall and plan a later follow-up session.
5. Check application on fresh cases, recording actions and reasons.

These lines are reviewed design adaptations. In particular, NotebookLM suggested quarterly testing; the current app does not schedule it. A short fresh-case exercise is descriptive evidence, not a validated transfer measure. NotebookLM’s response does not establish that the paper studies TK2233 or endorses this app.
