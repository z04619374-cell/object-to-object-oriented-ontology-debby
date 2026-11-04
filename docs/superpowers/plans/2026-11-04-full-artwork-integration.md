# Full Artwork Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder scene drawings with the approved CPS artwork and deliver the complete static-first point-and-click narrative, including the circular four-scene navigation, optional influence papers, and four required one-shot videos.

**Architecture:** Keep one React/Vite application and one reducer-driven scene registry. Remove the visible Hub state, treat Road/Statue/City/Tree as the four base scenes, and use small scene-local state machines for each branch. Shared components own artwork scaling, left/right `Bottom.png` arrows, required video playback/retry, full-scene return, hotspots, hands, and transition overlays.

**Tech Stack:** React, Vite, Vitest, Testing Library, CSS animations/transitions, static PNG/MP4 assets, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-04-full-artwork-integration-design.md`

## Global Constraints

- Show no visible words outside the three opened influence papers.
- Preserve semantic buttons, invisible accessible names, keyboard focus, and Escape-to-close for papers.
- Use only fade, zoom, burn, blackout, and focus transitions.
- All four MP4s are mandatory one-shot interactions: muted, inline, non-looping, navigation-locked, and advanced only by `ended`.
- If required media fails, keep the current branch and expose the full scene as an accessible retry button; never silently skip.
- Keep the complete 1920×1080 artwork visible at every viewport size; scale hotspots with the same 16:9 stage.
- Do not add puzzles, scores, inventory, completion gates, persistent progress, or a completion screen.
- Do not publish until unit tests, integration tests, lint, build, and browser checks pass.

## Review Focus

- Hotspot positions match the supplied artwork at desktop and narrow widths.
- No stale `ended` event can advance a video branch twice.
- Base arrows are present only on `first-car`, `street`, `adstreet`, and `campus` base states.
- Every final static branch returns to its own base scene on a full-scene click.
- Street pedestrians remain independent of the statue and reset only after leaving Street.
- Billboard burning remains independent of the sky route.
- Papers remain optional; the steak red dot always bypasses them.

## Target File Structure

```text
public/
  assets/
    artwork/              # supplied CPS PNGs, renamed semantically
    media/                # four supplied MP4s
    influences/           # three paper PNGs plus three official representative images
docs/
  asset-sources.md        # source/ownership notes and official influence-image URLs
src/
  App.jsx
  experience/
    assetManifest.js
    baseSceneNavigation.js
    influences.js
    experienceReducer.js
    components/
      ArtworkLayer.jsx
      BaseSceneArrows.jsx
      FullSceneAction.jsx
      OneShotVideo.jsx
      Scene.jsx
      Hotspot.jsx
      Hand.jsx
      TransitionOverlay.jsx
    scenes/
      IntroCampusMap.jsx
      InfluencePapers.jsx
      RoadScene.jsx
      StatueScene.jsx
      TreeScene.jsx
      CityScene.jsx
  styles/
    components.css
    global.css
    tokens.css
```

## Task 1: Import, normalize, and document the approved assets

**Files:**

- Create: `src/experience/assetManifest.js`
- Create: `src/experience/assetManifest.test.js`
- Create: `docs/asset-sources.md`
- Create/copy: `public/assets/artwork/*`
- Create/copy: `public/assets/media/*`
- Create/copy: `public/assets/influences/*`
- Modify: `src/utils/assetPath.js` only if spaces or non-ASCII filenames require safer URL handling

**Public filenames:**

- Artwork: `map.png`, `steak-map.png`, `red-point.png`, `hand-cigarette.png`, `direction-arrow.png`, `road.png`, `car-01.png`…`car-04.png`, `street.png`, `pedestrian-01.png`…`pedestrian-06.png`, `statue.png`, `hand-gun.png`, `campus.png`, `campus-tree.png`, `campus-apple.png`, `hand-torch.png`, `city.png`, `burn-hole-01.png`…`burn-hole-03.png`, `sky.png`.
- Media: `map-burn.mp4`, `car-go.mp4`, `statue-firework.mp4`, `sky-firework.mp4`.
- Papers: `paper-teamlab.png`, `paper-disco-elysium.png`, `paper-edith-finch.png`.
- Representative images: `work-teamlab-borderless.*`, `work-disco-elysium.*`, `work-edith-finch.*`.

**Interface:** `ASSETS` is a frozen nested object whose values are `assetPath('/assets/...')`; scene code imports it instead of hardcoding URLs.

- [ ] Write `assetManifest.test.js` first. Assert all required semantic keys exist, the four videos are distinct `.mp4` paths, and every value begins with the configured Vite base path.
- [ ] Run `npm test -- src/experience/assetManifest.test.js`; expect failure because the manifest does not exist.
- [ ] Copy the user-supplied files from `/Users/quzhuolin/Downloads/CPS/` and the three paper PNGs from `/Users/quzhuolin/Downloads/` into the public folders under the semantic names above. Do not alter the originals.
- [ ] Browse only official project/press pages for teamLab Borderless, Disco Elysium, and What Remains of Edith Finch; save one permitted representative image per work locally and record the exact page URL, image URL, owner, and retrieval date in `docs/asset-sources.md`.
- [ ] Implement the minimal frozen `ASSETS` manifest and any safe path normalization needed.
- [ ] Run `npm test -- src/experience/assetManifest.test.js`; expect pass.
- [ ] Run a file-existence check over every manifest path and inspect thumbnails/contact sheet to catch incorrect renames or alpha loss.
- [ ] Commit: `chore: import approved narrative artwork and media`.

## Task 2: Replace Hub navigation with the four-base circular state model

**Files:**

- Create: `src/experience/baseSceneNavigation.js`
- Create: `src/experience/baseSceneNavigation.test.js`
- Modify: `src/experience/experienceReducer.js`
- Modify: `src/experience/experienceReducer.test.js`
- Modify: `src/App.jsx`
- Delete after references are gone: `src/experience/scenes/AshtrayHub.jsx`

**Interfaces:**

- `BASE_SCENES = [SCENES.STATUE, SCENES.ROAD, SCENES.CITY, SCENES.TREE]` represents `street → first-car → adstreet → campus`.
- `getAdjacentBaseScene(scene, 'left' | 'right')` wraps around that order and returns `null` for non-base scenes.
- Reducer actions: `ENTER_BASE`, `NAVIGATE_BASE`, `ADVANCE`, `SET_STEP`, `RESET_SCENE`, `OPEN_PAPERS`, `CLOSE_PAPERS`, `RESET`.
- `ADVANCE` retains the existing `fromStep` stale-event guard.
- `NAVIGATE_BASE` always resets `step` to `0`, increments `revision`, and uses `fade` unless explicitly provided an allowed transition.

- [ ] Write base-loop tests first for all eight left/right mappings and invalid-scene/direction behavior.
- [ ] Rewrite reducer tests first to assert: red-dot entry lands on Road step 0; there is no visible Hub transition; left/right base navigation resets branch state; stale `ADVANCE` events are ignored; `RESET_SCENE` returns to the current base at step 0; papers open/close without a visited gate.
- [ ] Run `npm test -- src/experience/baseSceneNavigation.test.js src/experience/experienceReducer.test.js`; expect failures against the Hub reducer.
- [ ] Implement `baseSceneNavigation.js`, update reducer actions/state, and update `App.jsx` dispatch helpers while keeping the six scene components registered.
- [ ] Remove the Hub component and all `ENTER_HUB`/`RETURN_HUB` call sites.
- [ ] Run the two focused test files; expect pass.
- [ ] Run `npm test`; preserve unrelated legacy tests.
- [ ] Commit: `refactor: replace ashtray hub with circular base scenes`.

## Task 3: Build shared artwork, arrow, required-video, and return primitives

**Files:**

- Create: `src/experience/components/ArtworkLayer.jsx`
- Create: `src/experience/components/BaseSceneArrows.jsx`
- Create: `src/experience/components/FullSceneAction.jsx`
- Create: `src/experience/components/OneShotVideo.jsx`
- Create: `src/experience/components/OneShotVideo.test.jsx`
- Modify: `src/experience/components/Scene.jsx`
- Modify: `src/experience/components/Hotspot.jsx`
- Modify: `src/experience/components/Hand.jsx`
- Modify: `src/styles/components.css`
- Modify: `src/styles/global.css`

**Interfaces:**

- `ArtworkLayer({ src, className, alt = '', fit = 'contain' })` renders a non-draggable layer in the shared stage.
- `BaseSceneArrows({ scene, onNavigate })` derives both destinations with `getAdjacentBaseScene`, renders two image buttons using `direction-arrow.png`, and rotates them with CSS.
- `FullSceneAction({ label, onClick, children })` makes the complete stage a semantic button without visible copy.
- `OneShotVideo({ src, label, onEnded, className = '' })` renders a muted, `playsInline`, `autoPlay`, non-looping video; it calls `onEnded` once, shows an invisible accessible full-scene retry after `error`, and remounts/replays on retry.
- `Scene({ id, label, tone, children })` removes visible title/subtitle/index and uses a visually hidden heading only.

- [ ] Write `OneShotVideo.test.jsx` first: verify required video attributes, single `onEnded` call despite duplicate events, no visible error copy, and retry remount after `error` + click.
- [ ] Add component tests for two arrow buttons/destinations and `Scene` having no visible caption/index.
- [ ] Run the focused tests; expect failure because the components do not exist or still show captions.
- [ ] Implement the four shared components and minimal updates to `Scene`, `Hotspot`, and `Hand`.
- [ ] Add shared 16:9 scaling, image-button reset, invisible label, focus ring, arrow placement/rotation, video cover/contain, and reduced-motion CSS. Do not add visible tooltips.
- [ ] Run the focused tests; expect pass.
- [ ] Run `npm test` and `npm run lint`.
- [ ] Commit: `feat: add shared scene artwork and media primitives`.

## Task 4: Implement the map, mandatory burn video, steak, and optional papers

**Files:**

- Create: `src/experience/influences.js`
- Create: `src/experience/scenes/InfluencePapers.jsx`
- Create: `src/experience/scenes/InfluencePapers.test.jsx`
- Modify: `src/experience/scenes/IntroCampusMap.jsx`
- Create or replace: `src/experience/scenes/IntroCampusMap.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/components.css`

**Interfaces and states:**

- `INFLUENCES` contains exactly `{ id, creator, work, description, paperSrc, imageSrc, imageAlt }` for teamLab, ZA/UM, and Giant Sparrow using the approved English copy.
- Intro steps: `0 map`, `1 map-burn video`, `2 steak`; papers are a reducer mode or dedicated intro substate, not a completion gate.
- `InfluencePapers({ onClose })` keeps `focusedId` locally; paper click focuses; Escape or backdrop click clears focus; backdrop click with no focus calls `onClose`.
- The steak contains both a steak hotspot to open papers and a red-point hotspot to enter Road.

- [ ] Write tests first for both map routes: red point → Road immediately; teaching building → one-shot burn → steak; steak red point → Road; steak body → papers.
- [ ] Write paper tests first: three optional papers appear, each opens independently, only opened paper shows visible creator/work/approved paragraph, Escape closes focus, empty backdrop returns to steak, and no all-viewed requirement exists.
- [ ] Add an accessibility regression assertion that non-paper intro states expose no visible words.
- [ ] Run focused tests; expect failure.
- [ ] Implement the approved influence data, intro state rendering, paper focus behavior, and map/steak hotspots using manifest assets.
- [ ] Style the three papers as scattered flat layers and focused cards; keep all paper text inside the focused paper only.
- [ ] Run focused tests; expect pass.
- [ ] Run `npm test` and `npm run lint`.
- [ ] Commit: `feat: implement map burn steak and influence papers`.

## Task 5: Implement base arrows and the complete Road branch

**Files:**

- Modify: `src/experience/scenes/RoadScene.jsx`
- Create or replace: `src/experience/scenes/RoadScene.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/components.css`

**Road states:** `0 first-car`, `1 car-go video`, `2 car-01`, `3 car-02`, `4 car-03`, `5 car-04`.

- [ ] Write Road tests first: base shows left/right arrows with Street/City destinations; red-car click removes arrows and starts `car-go.mp4`; only video `ended` reaches `car-01`; full-scene clicks advance one image at a time; `car-04` click resets to `first-car`; no branch state shows arrows or visible text.
- [ ] Run `npm test -- src/experience/scenes/RoadScene.test.jsx`; expect failure.
- [ ] Implement Road using `ArtworkLayer`, `Hotspot`, `BaseSceneArrows`, `OneShotVideo`, `FullSceneAction`, and the existing stale-step guard.
- [ ] Calibrate the red-car hotspot against the 1920×1080 image and document its percentage box in the test fixture or inline named constant.
- [ ] Run the focused test; expect pass.
- [ ] Run `npm test` and `npm run lint`.
- [ ] Commit: `feat: implement road escape sequence`.

## Task 6: Implement independent pedestrians and the Statue branch

**Files:**

- Modify: `src/experience/scenes/StatueScene.jsx`
- Create or replace: `src/experience/scenes/StatueScene.test.jsx`
- Modify: `src/styles/components.css`

**Statue states:** reducer step `0 street`, `1 statue focus`, `2 statue-firework video`, `3 statue final`. Pedestrian selections are local `Set` state on the base view and therefore persist while the component stays on Street but reset after base navigation remounts it.

- [ ] Write tests first: six pedestrian hotspots are independently clickable; clicking one does not disable the statue or require the other five; clicked overlays accumulate; statue click immediately enters focus and hides arrows; head click plays the required video with gun hand; `ended` leaves static `statue.png`; final full-scene click resets to Street; leaving/re-entering Street clears pedestrian overlays.
- [ ] Run the focused test; expect failure.
- [ ] Implement the six percentage hotspot definitions and corresponding `pedestrian-01`…`06` overlay layers.
- [ ] Implement statue focus, `hand-gun.png`, firework video, and full-scene return.
- [ ] Run the focused test; expect pass.
- [ ] Run `npm test` and `npm run lint`.
- [ ] Commit: `feat: implement statue authority interactions`.

## Task 7: Implement the Tree / Knowledge branch

**Files:**

- Modify: `src/experience/scenes/TreeScene.jsx`
- Create or replace: `src/experience/scenes/TreeScene.test.jsx`
- Modify: `src/styles/components.css`

**Tree states:** `0 campus`, `1 campus with torch`, `2 campus-tree focus`, `3 campus-apple final`.

- [ ] Write tests first: Campus base has left/right arrows; first tree click swaps cigarette to torch without leaving Campus; second click shows `campus-tree.png` and hides arrows; branch click reaches `campus-apple.png`; final full-scene click resets to Campus; no state contains visible text.
- [ ] Run the focused test; expect failure.
- [ ] Implement the four states with `hand-cigarette.png`, `hand-torch.png`, named percentage hotspot constants, focus transition, and full-scene return.
- [ ] Run the focused test; expect pass.
- [ ] Run `npm test` and `npm run lint`.
- [ ] Commit: `feat: implement tree knowledge sequence`.

## Task 8: Implement parallel billboard and sky interactions in City

**Files:**

- Modify: `src/experience/scenes/CityScene.jsx`
- Create or replace: `src/experience/scenes/CityScene.test.jsx`
- Modify: `src/styles/components.css`

**City states:** base `0 city`; billboard branch `1 focus`, `2 hole-01`, `3 hole-02`, `4 hole-03`; sky branch `10 sky`, `11 sky-firework video`, `12 sky final`.

- [ ] Write tests first: City base shows arrows and both billboard/sky hotspots; neither route depends on the other; billboard click hides arrows and focuses; three clicks add holes sequentially; completed billboard click returns to City; sky click immediately reaches `sky.png`; brightest-star click starts required video; `ended` leaves static `sky.png`; final full-scene click returns to City; branch states contain no arrows or visible text.
- [ ] Run the focused test; expect failure.
- [ ] Implement explicit city constants for billboard and star hotspot boxes, overlay the hole assets in sequence, and add both independent branches.
- [ ] Run the focused test; expect pass.
- [ ] Run `npm test` and `npm run lint`.
- [ ] Commit: `feat: implement city consumption and star branches`.

## Task 9: Remove obsolete placeholders and add whole-experience regressions

**Files:**

- Modify: `src/App.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/components.css`
- Modify: `src/styles/global.css`
- Modify: `src/styles/tokens.css`
- Delete if unused: obsolete placeholder-only CSS selectors and legacy experience components
- Keep unrelated legacy files only if still imported by another live entry point; otherwise remove them in a separate, reviewable cleanup.

- [ ] Extend `App.test.jsx` first to cover: intro → Road direct; complete circular left/right base loop; Road final return; Statue direct access without pedestrians; City sky direct access without billboard; Tree final return; paper optionality; transition class limited to the five approved types.
- [ ] Add a DOM regression test that scans every non-paper render for visible text nodes and fails on captions, prompts, direction labels, indices, or status messages.
- [ ] Add asset-load smoke assertions for every manifest entry and verify no source file references `/Users/quzhuolin/...`.
- [ ] Run `npm test`; expect new failures exposing remaining placeholder or visible-copy assumptions.
- [ ] Remove obsolete Hub/placeholder markup and CSS, update App scene props, and make only the minimum cleanup needed for all tests to pass.
- [ ] Run `npm test -- --run`, `npm run lint`, and `npm run build`; all must pass with zero missing-asset or React warnings.
- [ ] Commit: `test: cover complete artwork narrative flow`.

## Task 10: Visual QA, GitHub Pages publication, and live verification

**Files:**

- Modify only if QA finds defects: scene/CSS/test files above
- Verify: `vite.config.js`, GitHub Pages workflow/configuration, `README.md`

- [ ] Start the production preview and test at representative 1920×1080, laptop, tablet, and narrow mobile viewport sizes.
- [ ] Verify all hotspot boxes visually against their artwork; test mouse, keyboard, Escape, and focus indication.
- [ ] Play all four videos to completion in the browser; confirm each is non-looping, cannot be bypassed, ends at the approved static state, and retry works after a simulated media error.
- [ ] Inspect the three paper cards for readable English copy and correct local representative images; confirm no other scene contains visible words.
- [ ] Confirm the exact base loop in both directions and that arrows vanish in every branch/final state.
- [ ] Confirm console has no errors, every production asset returns HTTP 200 under the repository base path, and refresh works on the GitHub Pages URL.
- [ ] If any QA defect is found, first add or update a failing test, implement the smallest fix, then rerun `npm test -- --run`, `npm run lint`, and `npm run build`.
- [ ] Update `README.md` with local run/build instructions and the public URL; do not put narrative instructions into the rendered experience.
- [ ] Commit: `release: publish complete interactive narrative`.
- [ ] Push to the public GitHub repository, wait for Pages deployment, then run a final live smoke test at `https://z04619374-cell.github.io/object-to-object-oriented-ontology-debby/`.

## Plan Self-Review

- Every approved asset and all four required videos have an explicit import and test path.
- The obsolete Hub is removed before scene implementation, so all branches target the approved circular base model.
- Intro papers, pedestrians, billboard holes, statue, and sky dependencies match the user's final clarifications: all optional or parallel where specified.
- Every branch defines its arrow visibility, final static state, and correct base return.
- Visible-text restrictions are enforced both component-by-component and at whole-app level.
- Tests precede implementation in every task, and publication is gated by automated and browser verification.
