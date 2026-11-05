# SignalLab — real browser walkthrough

Current video: [Watch v13](demo.html) · [Narration transcript](media/demo-transcript-v13.md).

Duration: approximately 2 minutes 51 seconds, 1920 × 1080. The approved v3 narration is preserved unchanged. The application fills the frame above a caption strip. Smooth zooms move from the full viewport into the relevant control, result, calculation or evidence, then return to the full viewport.

All application footage comes from real Chrome interactions: prediction selection, running the policy, dragging the threshold, comparing pinned results, inspecting a calculation, changing warning design, opening sender/destination details, choosing a fresh-case action and reason, and receiving recall feedback. Reading pauses and cuts are edited, and click-emphasis rings are editorial overlays. This is not a continuous unedited session or a learner study.

Fresh-case and recall footage uses the same application on a local server with separate demonstration progress. The public user's saved progress was not reset.

Build: `python3 scripts/build-demo-v6.py`. Requires Pillow, ffmpeg and the macOS Arial font path configured in the script. Source recordings: `assets/demo-v6`. Original audio: `dist/media/signallab-demo-v3.mp4`. No voice service is needed. Use `--preview` for a contact sheet. Earlier videos remain available.

Peer testing, lecture alignment and optional lecturer review remain pending.

## OpenFilm editing edition (v7)

The current cut was authored and rendered in OpenFilm. The full website viewport establishes context before focus zooms. There are 21 independently editable real recording shots, an approved narration track and subtitles. Open `video-studio` with `npx -y openfilm@latest open video-studio`. Check with `look`; export with `render --fps 24 --subtitles`. The earlier Python v6 build remains reproducible.

OpenFilm checked 12 sample frames twice in shuffled orders: deterministic output passed. The 1920 × 1080 MP4 was decoded in full, and burned subtitles were visually checked. The source narration and its speed are retained. No additional learner trial has been performed.

## Remotion edition (v8)

The current edit adds animated introductory and closing sequences, two brief evidence/threshold annotations, and smaller captions constrained to a 680px area on the 1920px frame. The actual recording remains the body of the video. Voice, speed and timing are retained. Editable project: `remotion-studio`; run `npm ci` then `npm run dev`. Render: `npx remotion render SignalLab out.mp4`. Caption timing is stored in JSON. The original v7 caption strip is masked, so only one caption layer is shown.

## Panel-free edition (v9)

The delivery frame is 1920 × 906, matching the recorded website viewport. The former 174px footer is removed, preserving the full viewport without stretching or cropping its sides. Captions are small white text with a subtle shadow and no box. Animation, narration, speech speed and timing are retained.

## Full-frame edition (v10)

The delivery frame is 1920 × 1080. The real website image fills the entire frame vertically and horizontally, including the former footer area, with no top/bottom panels or letterboxing. To preserve every horizontal label, the website footage is expanded vertically from its source viewport; no side content is cropped. Prior chapter badges are removed. Captions remain small, unboxed overlays. Narration timing and opening/closing animations are retained.

## Expanded closing and screen-off edition (v11)

The closing recap contains evidence inspection, threshold trade-offs, and action-plus-reason transfer; it also includes a QR link to the public simulator. After narration, a screen-off animation compresses the picture into a line, a point and then pure black. 4186 frames at 24 fps (approximately 2:54), within the 2–3 minute brief. Approved narration and the full-frame walkthrough are retained.

## Guided motion edition (v12)

Focus outlines highlight the threshold, calculation, actionable warning and action/reason choices. A connector links the recorded missed-threat and false-alarm counts. Three brief sweeps mark design, transfer and research chapters without altering the source action or narration timing. The closing recap crossfades over the previous video instead of over black; the final screen-off animation is retained. These are editorial annotations, not extra app capabilities.

## Quiet sound accents (v13)

Fifteen low-level accents follow recorded selections, focus annotations, chapter sweeps and the final shutdown. Sounds are synthesized locally by `scripts/add-demo-sound.py`; no external sample rights are required. The script stream-copies the v12 picture track, mixes audio at its existing speed and limits output peaks. Sound cues are also authored in the editable Remotion timeline through `src/SoundDesign.tsx`.
