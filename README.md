# Ashtray

Ashtray is a first-person point-and-click narrative built around one ashtray at RMIT. The ashtray is the spatial and psychological hub linking six scenes: campus map, hub, road, statue, tree, and city.

This repository currently contains the first implementation increment: complete scene architecture, object-driven navigation, accessible percentage-based hotspots, flat illustration layers, the cigarette-hand interaction tool, and restrained CSS transitions. Production artwork can replace every placeholder layer without changing the navigation model.

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
- `Scene`, `Hotspot`, `IllustrationLayer`, `Hand`, and `TransitionOverlay` are reusable primitives.
- Every positioned object uses percentage coordinates within a 16:9 stage.
- Valid transitions are limited to fade, zoom, burn, blackout, and focus.

## Artwork replacement

Replace CSS placeholder shapes with transparent PNG or WebP assets at a shared 1920×1080 reference size. Keep all states of one object on the same transparent canvas so image swaps do not shift position. Suggested folders are `public/art/shared`, `intro`, `hub`, `road`, `statue`, `tree`, and `city`.

## Live site

[Open the GitHub Pages experience](https://z04619374-cell.github.io/object-to-object-oriented-ontology-debby/)
