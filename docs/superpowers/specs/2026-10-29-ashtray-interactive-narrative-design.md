# Ashtray Interactive Narrative — Design

## Intent

Build the first increment of a first-person point-and-click artwork centred on one RMIT ashtray. The experience should feel contemplative, surreal, and slightly unsettling. Navigation happens through objects and directions inside the image rather than through a conventional navigation bar.

## Goals

- Provide six navigable scene components: Intro Campus Map, Ashtray Hub, Road, Statue, Tree, and City.
- Treat every visible interactive object as an independently positioned flat illustration layer.
- Make the cigarette-hand the persistent interaction instrument.
- Establish scene-local substates for later transformations without implementing every final animation now.
- Allow every branch to return to the Ashtray Hub.
- Work with temporary code-drawn placeholders that can later be replaced one-for-one by supplied transparent artwork.

## Non-goals

- No puzzles, inventory, score, win state, video playback, or long animation sequences.
- No recreation of Rusty Lake artwork, narrative, characters, or proprietary code.
- No final burn, firework, or driving animation in this increment.

## Architecture

Use a reducer-driven scene graph. `experienceReducer` owns the current scene, scene-local step, chosen transition, and transition phase. `App` composes the active scene and a shared `TransitionOverlay`; scene components only emit semantic actions such as `ENTER_HUB`, `NAVIGATE`, `ADVANCE`, and `RETURN_HUB`.

The reusable `Scene` component establishes a fixed 16:9 stage. `IllustrationLayer` positions flat visual objects with percentage coordinates. `Hotspot` provides accessible, percentage-based click targets. `Hand` displays the current interaction instrument. Placeholder artwork is made from CSS blocks and simple inline SVG silhouettes; production artwork can later replace these layers without changing navigation logic.

## Visual Direction

Muted charcoal, nicotine cream, oxidised green, ash grey, and a single ember red accent. Thin editorial labels are allowed only as environmental captions and development placeholders. Directional arrows remain spatial and unobtrusive. The image has subtle grain, vignette, and restrained parallax-like depth, but no playful HUD or game chrome.

## Transitions

Only `fade`, `zoom`, `burn`, `blackout`, and `focus` are valid. The first increment implements restrained CSS versions and centralises them in `TransitionOverlay`; later artwork may enrich them without changing scene APIs.

## Repository and Publishing

The existing GitHub Pages workflow remains the deployment path. The previous Debby source files stay in the repository but are no longer imported, keeping the replacement reversible. The production base path remains `/object-to-object-oriented-ontology-debby/`.

## Approaches Considered

- Adopt `react-image-spots`: closest feature fit, but its repository license file is currently missing and its scene transition API is narrower than this project requires.
- Adopt a full point-and-click engine: rejected because verbs, inventory, quests, pathfinding, and dialogue systems conflict with the intentionally minimal experience.
- Build a small reducer-driven scene runtime: selected because it preserves the useful percentage-hotspot and scene-chain patterns while remaining easy to art-direct and replace with supplied layers.

