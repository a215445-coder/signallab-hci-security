# SignalLab — Decision Lab motion edit

Current video: [Watch v5](demo.html) · [Narration transcript](media/demo-transcript-v5.md).

Duration: approximately 2 minutes 51 seconds. The approved v3 narration is copied unchanged, including speech speed and pauses. The new visual edit uses 14 scenes with animated message routing, threshold comparisons, stepwise cue scoring, side-by-side warning designs and domain highlighting. Persistent chapter navigation, soft spatial transitions and a travelling score link the scenes. The dark Decision Lab panels are explanatory motion design; actual application captures are explicitly labelled. Short captions remain.

Actual interface captures are combined with explanatory graphics. This is not continuous screen recording or learner-study footage. Classification labels and scores come from the eight disclosed teaching fixtures; the graphics do not represent a real threat-detection benchmark.

Playback uses `media/signallab-demo-v5.mp4`. Earlier versions are retained.

Build with `python3 scripts/build-demo-v5.py`. It uses captures under `assets/demo-v2` and stream-copies the audio from `dist/media/signallab-demo-v3.mp4`. The shared asset and caption helpers in `scripts/build-demo-v4.py` are also required. Requirements: Pillow, ffmpeg and the macOS Arial font paths configured in the script. No voice service or internet connection is needed. `--preview` generates a contact sheet for visual review.

Peer testing, lecture alignment and optional lecturer review remain pending.
