# SignalLab observatory and motion

The runtime is embedded in [the standalone simulator](../dist/index.html). This directory contains editable sources and a reproducible build; it is not required when opening the downloaded HTML.

## Build

From this directory, run `npm ci`, then `npm run build`. From the repository root, run `node scripts/check.cjs` afterward. The build replaces only the marked motion bundle in the HTML; it preserves application content and state logic. Commit the source, lockfile and rebuilt HTML together.

## Sources

- [src/observatory.js](src/observatory.js): current original procedural mail exhibit, letter texture, magnifier, identity card and notebook; lighting, raycast shortcuts, render scheduling, static SVG fallback and resource disposal.
- [src/desk.js](src/desk.js): earlier procedural desk, retained as unused source.
- [src/case-scenes.js](src/case-scenes.js): earlier procedural dioramas retained as unused source, excluded from the current runtime.
- [src/case-fallbacks.js](src/case-fallbacks.js): six generated keyword images and neutral topic captions.
- [src/index.js](src/index.js): GSAP event feedback, page/step transitions, clue transfer, case-folder overlays, disclosures, motion control and lifecycle cleanup.
- [src/motion.css](src/motion.css): scene layout, folder layers, transient clue styles and responsive presentation.
- [src/palette.css](src/palette.css): shared fog-white/navy base, blue actions, purple experiments, teal evidence/notebook, semantic feedback and six topic accents. Topic colors identify subjects, not case verdicts. The build embeds this after motion layout CSS.
- [src/exhibition.css](src/exhibition.css): current dark hero, editorial case collection, typography and responsive reading layout. Applied after the earlier palette.
- [build.cjs](build.cjs): builds an IIFE with Three.js and GSAP embedded for `file://` use without runtime fetches or module imports.

The message, magnifier and notebook in the 3D exhibit link to practice, experiments and notebook. They are supplementary shortcuts; keyboard users have equivalent visible HTML buttons. WebGL failure keeps the mail SVG visible. Reduced motion renders a still scene, removes decorative transitions and follows the operating-system setting. The manual motion preference is separate from learning data.

Rendering stops after short interaction bursts, when the scene is offscreen, or when the tab is hidden. Leaving the view disposes geometry, materials, textures and the WebGL renderer. Transition overlays do not intercept clicks. Decisions are saved before animation; animation never determines their grade.

## Dependencies and attribution

- Three.js 0.187.0: MIT license, copyright 2010–2026 Three.js authors. The full license is embedded in the generated bundle.
- GSAP 3.15.1: copyright 2008–2026 GreenSock; subject to [GSAP's standard license](https://gsap.com/standard-license). Package license notices are preserved in the bundle.
- esbuild is a development-only bundler. Dependencies are pinned by the lockfile.

No downloaded 3D models, external textures, analytics or runtime asset services are used.

## Case visuals

| Case | Scene | Interaction |
|---|---|---|
| 01 · Account | Student ID, profile and laptop | Card tilt and gentle image zoom |
| 02 · Library | Books, bookmark and library building | Card tilt and gentle image zoom |
| 03 · Scholarship | Large banknotes, gold coins, cap and certificate | Card tilt and gentle image zoom |
| 04 · Timetable | Calendar grid, clock and pencil | Card tilt and gentle image zoom |
| 05 · Research invitation | Invitation letter, laptop and academic notebook | Card tilt and gentle image zoom |
| 06 · Web domain | Browser address bar, globe and magnifier | Card tilt and gentle image zoom |

All six use literal subjects derived from the case text in a consistent clay illustration style. These are generated raster images, not live 3D models. Only topic IDs select the image; correctness, domains and inspected evidence do not. Homepage cards, case details and Design Lab reuse the same corresponding image. GSAP retains card movement and opening feedback; the separate home desk remains real-time 3D. No animation is required to open a case or submit a decision.

Current original PNGs, optimized JPEGs and exact built-in image-generation prompts are in [assets/exhibition](assets/exhibition/README.md). The build embeds JPEG data URLs in the standalone HTML for offline use. The former clay collection is preserved in [assets/keywords](assets/keywords/README.md). The six current illustrations use rich subject-specific studio backgrounds and paper/metal/glass materials; research depicts an invitation rather than assuming a laboratory discipline. System Avenir Next/Condensed, Trebuchet and sans-serif fallbacks require no external font download.
