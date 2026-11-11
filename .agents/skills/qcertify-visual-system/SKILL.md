---
name: qcertify-visual-system
description: Design and review QCertify website typography, layout, components, diagrams, 3D and motion against the "architecture of trust" visual system.
---

Read `docs/rebuild/design-decisions.md` (latest section first) and
`docs/rebuild/visual-assets.md` from the Website project root.

- Palette: porcelain and white surfaces, controlled graphite chapters. Use the tokens in
  `src/app/globals.css`; do not reintroduce raw hex values in modules.
- Blue (#1f5cff) is functional only: the protected path, a selected state or focus. Captured
  or unprotected traffic is neutral silver. Never use blue for decoration or headline colour.
- Type: Geist and Geist Mono via `next/font/local`; mono eyebrows with chapter indices.
- Shape language: stadium apertures and pill controls (the double contour of the mark);
  ceramic, brushed aluminium and frosted glass in imagery. No shields, padlocks, particles,
  neon or stock photography.
- Diagrams and the architecture lab must show where protection begins and ends, keep
  management links dashed and off the traffic path, and label conceptual views.
- 3D: the hero scene is procedural three.js loaded on interaction only, with a poster rendered
  from the same code (`node scripts/render-hero-poster.mjs`). Keep poster and live framing
  aligned; respect reduced motion, Save-Data, context loss and pausing off-screen.
- New artwork: generate with Codex `image_gen` using the shared style block in
  `visual-assets.md`, review it visually, record its provenance, export to `src/assets/`.
- Motion never hides above-the-fold content or the LCP; everything works without animation.
  Inspect desktop (1440), tablet (768) and mobile (390) screenshots and real interactions.
