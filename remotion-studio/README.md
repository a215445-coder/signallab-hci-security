# SignalLab Remotion edit

Install: `npm ci`. Preview: `npm run dev`. Render: `npx remotion render SignalLab out.mp4`. The composition uses real v7 walkthrough footage, its existing focus moves, unchanged approved narration, compact JSON captions and newly authored introductory/closing animations. Only the source footage area is shown; prior burned captions are masked. No additional human learning outcomes are claimed.

Current delivery frame: 1920 × 906 to remove the prior footer entirely while retaining the full website viewport. Subtitles have no background box.

Current v10 output: 1920 × 1080, full-frame website footage. Source viewport is expanded vertically to fill the delivery frame without side cropping. No panels, letterbox strips or caption boxes.

V11: expanded three-part closing recap, public simulator QR, and a 72-frame screen-off/black tail after the unchanged narration. Full composition: 4186 frames at 24 fps.

V12 adds `src/Motion.tsx` with source-timed focus outlines, trade-off connector and chapter sweeps. Outro entrance stays transparent over the running walkthrough; only the final shutdown uses a black background.

V13: `SoundDesign.tsx` adds 15 quiet original sound accents, with assets and frame positions under `public/sfx`. The delivered video copies the v12 picture stream unchanged and mixes these effects below the narration. Regenerate with `python3 scripts/add-demo-sound.py` from the repository root.
