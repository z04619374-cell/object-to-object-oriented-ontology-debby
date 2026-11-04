# Full Artwork Integration Design

Date: 2026-11-04

## Intent

Replace the remaining CSS placeholder drawings with the supplied CPS artwork and complete the six-scene first-person point-and-click narrative. The experience should remain contemplative, surreal, and slightly unsettling, with interaction learned through looking and clicking rather than through visible instructions.

## Confirmed constraints

- React and Vite remain the implementation platform.
- The experience remains one scene/state-based single-page application.
- No visible text appears anywhere except inside the three influence-paper views.
- Accessible names remain available to screen readers but are visually hidden.
- No navigation bar, score, inventory, puzzle, win condition, or conventional game UI.
- Artwork is presented as independent flat image layers and clickable hotspots.
- Motion is mostly state changes using fade, zoom, burn, blackout, and focus.
- Four supplied MP4 files are required as one-shot moments:
  - `maponfire.MP4`
  - `car go.MP4`
  - `statue boom.MP4`
  - `sky fire.MP4`
- Videos do not loop. Each video advances automatically to its static destination state when playback ends. A decoding failure offers an invisible full-scene retry action and does not silently skip the required video.

## Approaches considered

### Pure static states

Use only PNG assets and CSS transitions. This best matches Rusty Lake's flat interaction language, but discards four completed authored effects.

### Static-first with four one-shot videos — selected

Use PNG components for ordinary interaction and reserve video for the map burn, car departure, and two fireworks. This preserves the supplied authored moments without turning the site into a video-led experience.

## Global presentation

- The 1920 × 1080 artwork establishes the native 16:9 scene canvas.
- On wide screens the complete canvas is shown inside a dark surround. On narrow screens the canvas scales down without stretching or cropping interactive targets.
- Existing visible scene captions, titles, prompts, return arrows rendered as text, status sentences, and scene indices are removed.
- Hotspots remain keyboard accessible and retain invisible accessible names.
- Hover/focus feedback is limited to a faint outline, cursor change, or small glow. It must not display labels.
- `hold🚬.png`, `fire.png`, and `gunlike.png` are transparent foreground tools and remain separate from the background art.
- `Bottom.png` is rotated in CSS and used only as left/right navigation on the four base scenes. There are no up/down arrows.
- Branch scenes hide all navigation arrows. After the final interaction, clicking anywhere on the final static image returns to that branch's base scene.

## Scene and asset design

### 1. Intro Campus Map

Initial composition:

- `map1.png` as the background.
- `red point.png` over Ellis Court as the ashtray entrance.
- `hold🚬.png` as the foreground interaction hand.

Interactions:

- Clicking the red point enters the `first-car.png` base scene.
- Clicking the teaching building plays `maponfire.MP4` once.
- When the burn video ends, the scene shows `map2.png`, the completed T-bone-steak map.
- Clicking the steak fades directly to the influence-paper view. No eating animation or fork state is included.
- `red point.png` remains visible on the steak state. Clicking it bypasses the papers and enters `first-car.png` directly.

### Influence Papers

Three crumpled paper assets appear scattered in a dark, neutral space:

- `Image.png`: teamLab
- `Image (1).png`: Disco Elysium
- `Image (2).png`: What Remains of Edith Finch

Each paper is an independent hotspot. Clicking it focuses and enlarges the paper while dimming the others. The opened paper is the only place where visible text may appear. Each opened paper contains:

1. creator/artist or studio name;
2. work name;
3. one representative image;
4. one short English paragraph.

Proposed paper content:

#### Paper 1

- Creator: teamLab
- Work: teamLab Borderless
- Description: “teamLab creates immersive digital environments in which light, sound and moving images flow beyond the boundaries of individual rooms. The work influenced this project’s use of space as something unstable, connected and transformed by the viewer’s presence.”
- Representative image: an official teamLab Borderless installation image, sourced from an official press/project page and stored locally with source attribution recorded in project documentation.

#### Paper 2

- Creator: ZA/UM
- Work: Disco Elysium
- Description: “Disco Elysium turns inner thought into an explorable environment, allowing conflicting voices, memories and desires to shape how the world is perceived. It influenced this project’s interest in inaccessible minds and fragmented first-person experience.”
- Representative image: official Disco Elysium key art or an official screenshot, stored locally with source attribution recorded in project documentation.

#### Paper 3

- Creator: Giant Sparrow
- Work: What Remains of Edith Finch
- Description: “What Remains of Edith Finch uses domestic spaces and shifting interaction styles to enter incomplete memories. It influenced this project’s movement between ordinary locations, subjective interpretation and surreal transformation.”
- Representative image: official key art or an official house/interior screenshot, stored locally with source attribution recorded in project documentation.

Clicking outside the focused paper closes it. When no paper is focused, clicking the surrounding background returns to the steak. The papers are optional and may be opened in any order. No visited-state gate is used. Returning to the steak restores the red-point route to `first-car.png`.

### 2. Base-scene navigation and Road

There is no separate Ashtray Hub screen. The four base scenes form a circular, left/right spatial loop. Each base scene shows two rotated `Bottom.png` arrows at its left and right edges.

The fixed loop is:

`street → first-car → adstreet → campus → street`

Exact mappings:

- `first-car`: left → `street`; right → `adstreet`.
- `adstreet`: left → `first-car`; right → `campus`.
- `campus`: left → `adstreet`; right → `street`.
- `street`: left → `campus`; right → `first-car`.

There are no visible direction names. `first-car.png` is the Road base scene; the ashtray remains visible in its composition.

Road interaction:

- Clicking the red car hides the base-scene arrows and plays `car go.MP4` once.
- When the video ends, the scene shows `car1.png`.
- Subsequent full-scene clicks advance `car1.png` → `car2.png` → `car3.png` → `car4.png`.
- `car4.png` is the final car-interior state. Clicking anywhere returns directly to `first-car.png` and restores its left/right arrows.

### 3. Statue / Authority

- `street.png` is the wide street/statue background.
- `p1.png` through `p6.png` are separate pedestrian line layers and hotspots.
- Each pedestrian changes/reveals its abstract black-line state independently while remaining on the `street.png` base view.
- Pedestrian interactions and the statue interaction are parallel. The statue is active immediately and does not depend on any pedestrian having been clicked.
- Clicking the statue hides the base-scene arrows and focuses to `statue.png`.
- The interaction hand changes to `gunlike.png`.
- Clicking the statue's head plays `statue boom.MP4` once.
- At video end, the scene stops on `statue.png`. Clicking anywhere returns directly to `street.png` and restores its left/right arrows.

### 4. Tree / Knowledge

- `campus.png` is the initial campus-tree view.
- Clicking the trees changes the hand from `hold🚬.png` to `fire.png`.
- A second click focuses to `campus tree.png`.
- Clicking the relevant branch focuses to `campus apple.png`.
- The apple state contains no explanatory text. Clicking anywhere on the completed apple state returns directly to `campus.png` and restores its left/right arrows.

### 5. City / Consumption and Star

- `adstreet.png` is the street/city background.
- Clicking the billboard hides both base-scene arrows and enters a focused billboard state using the same artwork crop/zoom.
- `h1.png`, `h2.png`, and `h3.png` are the three cigarette-burn holes and appear sequentially with three clicks.
- After all three holes appear, clicking the completed billboard returns to the full `adstreet.png` composition and restores the base-scene arrows.
- Billboard burning and the sky interaction are parallel. The visible sky hotspot is active immediately and does not depend on the billboard state.
- Clicking the sky hides the base-scene arrows and fades to `sky.png`.
- Clicking the brightest star plays `sky fire.MP4` once.
- At video end, the scene stops on `sky.png`. Clicking anywhere returns directly to `adstreet.png` and restores its left/right arrows.

## State architecture

Keep the current scene registry and reducer. Extend scene-local steps rather than creating routes or separate pages.

- `intro`: map, burn video, steak, papers, focused paper.
- `hub` is removed as a visible scene; base-scene navigation is represented by `first-car`, `street`, `campus`, and `adstreet` states.
- `road`: `first-car` base/car video/car sequence/final return.
- `statue`: street/pedestrian transformations/statue focus/firework.
- `tree`: campus/torch/tree focus/apple.
- `city`: street/billboard burn sequence/sky/star firework.

Video completion dispatches an explicit state advance. All four videos are required to play after a user click, are muted/inline, and cannot be skipped through navigation. If decoding fails, the implementation may expose an invisible full-scene retry control rather than silently skipping the video. Duplicate completion events must remain guarded.

All subscene-local state resets when returning to its base scene. Car progress, billboard holes, torch state, and focused paper state do not persist into the next run. Pedestrian line transformations may remain while the user stays on `street.png`, but reset after leaving and later re-entering that base scene.

## Content and copyright handling

- The user's supplied CPS artwork is copied into local project assets with clear semantic filenames.
- Representative influence images are sourced from official project/press pages rather than hotlinked.
- Their source URLs and ownership are recorded in a small project documentation file.
- No credits are rendered elsewhere in the experience because visible text is restricted to the paper views. Any necessary image attribution can appear inside the associated paper or in repository documentation, depending on the source terms.

## Accessibility

- Every interactive area is a semantic button with a meaningful `aria-label`.
- Focus remains visible without showing words.
- Videos are muted, use `playsInline`, and do not loop. Because the authored video moments are required, reduced-motion mode disables surrounding CSS movement but does not skip the four videos.
- Paper text uses sufficient contrast and remains readable at mobile sizes.
- Escape closes an opened paper; keyboard users can traverse hotspots in narrative order.

## Testing

- Reducer tests cover all new step boundaries and duplicate video completion.
- Component tests cover the complete core path for each scene.
- Tests confirm that visible scene labels/prompts are absent outside influence papers.
- Tests confirm all four videos are one-shot, navigation is locked during branches, and the final full-scene click returns to the correct base scene.
- Browser QA covers desktop and mobile-scale layouts, hotspot alignment, video completion, paper opening/closing, base-scene looping and branch return behavior, console errors, and asset loading.

## Non-goals

- No steak-eating animation.
- No inventory, scoring, puzzle logic, completion screen, or persistent progress.
- No new illustrated assets generated to fill gaps without approval.
- No visible instructions or conventional navigation controls.

