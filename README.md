# Ashtray

Ashtray is a first-person point-and-click narrative built around one ashtray at RMIT. The campus map opens into four connected base views—road, statue, tree, and city—with the cigarette acting as the recurring tool for revealing and transforming objects.

The experience uses the supplied flat artwork as a 1920×1080 scene canvas, accessible percentage-based hotspots, four short one-shot videos, optional influence papers, and restrained fade, zoom, burn, blackout, and focus transitions. Navigation happens inside the images rather than through a conventional menu.

## Run locally

```bash
pnpm install
pnpm dev
```

Tests and production checks:

```bash
pnpm test --run
pnpm lint
pnpm build
```

## Architecture

- `src/experience/experienceReducer.js` owns scene, local step, and transition state.
- `src/experience/scenes/` contains one React component per scene.
- `Scene`, `Hotspot`, `ArtworkLayer`, `BaseSceneArrows`, `OneShotVideo`, `Hand`, and `TransitionOverlay` are reusable primitives.
- Every positioned object uses percentage coordinates within a 16:9 stage.
- Valid transitions are limited to fade, zoom, burn, blackout, and focus.
- The four base scenes form the circular loop `street → first-car → adstreet → campus → street`.
- Artwork and media live under `public/assets`; external influence-image sources are recorded in `docs/asset-sources.md`.

## Live site

[Open the GitHub Pages experience](https://z04619374-cell.github.io/object-to-object-oriented-ontology-debby/)
