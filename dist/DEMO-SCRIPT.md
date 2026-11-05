# SignalLab — real browser walkthrough

Current video: [Watch v6](demo.html) · [Narration transcript](media/demo-transcript-v6.md).

Duration: approximately 2 minutes 51 seconds, 1920 × 1080. The approved v3 narration is preserved unchanged. The application fills the frame above a caption strip. Smooth zooms move from the full viewport into the relevant control, result, calculation or evidence, then return to the full viewport.

All application footage comes from real Chrome interactions: prediction selection, running the policy, dragging the threshold, comparing pinned results, inspecting a calculation, changing warning design, opening sender/destination details, choosing a fresh-case action and reason, and receiving recall feedback. Reading pauses and cuts are edited, and click-emphasis rings are editorial overlays. This is not a continuous unedited session or a learner study.

Fresh-case and recall footage uses the same application on a local server with separate demonstration progress. The public user's saved progress was not reset.

Build: `python3 scripts/build-demo-v6.py`. Requires Pillow, ffmpeg and the macOS Arial font path configured in the script. Source recordings: `assets/demo-v6`. Original audio: `dist/media/signallab-demo-v3.mp4`. No voice service is needed. Use `--preview` for a contact sheet. Earlier videos remain available.

Peer testing, lecture alignment and optional lecturer review remain pending.
