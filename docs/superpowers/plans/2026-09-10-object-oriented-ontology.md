# Object to Object-Oriented Ontology Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive, single-page interactive narrative that moves from Debby's apparent travel memory to its photographic and metadata construction.

**Architecture:** A React/Vite client renders one state-machine-driven experience. Journey copy and metadata live in one editable data module; focused components render each phase and plain CSS controls the restrained monochrome visual system.

**Tech Stack:** React 19, Vite, Vitest, Testing Library, ESLint, plain CSS

**Spec:** `docs/superpowers/specs/2026-09-10-object-oriented-ontology-design.md`

## Global Constraints

- Retain only the textual perspectives `DEBBY`, `PHOTOGRAPHER`, `CAMERA`, and `MEMORY`.
- Include no audio, title-deconstruction sequence, backend, traditional navigation, or nonfunctional button.
- Keep all journey content editable from `src/data/journeys.js`.
- Use only black, white, grey, greyscale imagery, and restrained geometric construction.
- Support desktop, mobile, keyboard use, and reduced motion.

---

### Task 1: Narrative state and project foundation

**Files:**
- Create: `package.json`, `vite.config.js`, `eslint.config.js`, `index.html`
- Create: `src/narrativeReducer.js`
- Test: `src/narrativeReducer.test.js`

**Interfaces:**
- Produces: `initialNarrativeState`, `narrativeReducer(state, action)`, and actions `BEGIN`, `REQUEST_OPEN`, `OPEN_MEMORY`, `CONTINUE`, `TOGGLE_METADATA`, `NEXT`, `PREVIOUS`, `FINISH`, `RESTART`.

- [ ] Write reducer tests asserting each user action reaches the intended phase and clamps journey/perspective indices.
- [ ] Run `pnpm test --run src/narrativeReducer.test.js` and confirm failure because the module is absent.
- [ ] Add the minimal Vite/Vitest configuration and reducer implementation.
- [ ] Re-run the reducer test and confirm it passes.

### Task 2: Editable journey content and image placeholders

**Files:**
- Create: `src/data/journeys.js`
- Create: `public/images/journey-air.svg`, `public/images/journey-window.svg`, `public/images/journey-water.svg`

**Interfaces:**
- Produces: `journeys`, whose records contain `id`, `image`, `imageAlt`, `location`, `date`, `caption`, `perspectives`, and `metadata`.
- Consumes: perspective identifiers `debby`, `photographer`, `camera`, and `memory`.

- [ ] Add three complete sample records with conspicuous replacement-friendly fields.
- [ ] Add three monochrome abstract SVG placeholders with no fabricated photo realism.
- [ ] Validate every record through the consuming component tests in Task 4.

### Task 3: Focused interface components

**Files:**
- Create: `src/components/Intro.jsx`, `JourneyFrame.jsx`, `PerspectiveStack.jsx`, `MetadataPanel.jsx`, `Ending.jsx`, `Geometry.jsx`

**Interfaces:**
- `Intro({ onBegin })`
- `JourneyFrame({ journey, index, total, openRequested, onImageClick, onOpen, onPrevious, onNext })`
- `PerspectiveStack({ perspectives, visibleCount, onContinue, onViewData, onNextJourney })`
- `MetadataPanel({ metadata, onClose })`
- `Ending({ onRestart })`

- [ ] Implement semantic, keyboard-accessible presentational components with no narrative copy duplicated from the data module.
- [ ] Ensure metadata is a labelled dialog, closes on Escape, and returns focus to its trigger.

### Task 4: Integrated experience via TDD

**Files:**
- Create: `src/App.jsx`, `src/main.jsx`, `src/App.test.jsx`, `src/test/setup.js`

**Interfaces:**
- Consumes: `journeys`, reducer exports, and Task 3 components.
- Produces: the complete route-free experience rendered by `App`.

- [ ] Write a failing interaction test for intro to first journey.
- [ ] Run the targeted test and verify the expected failure.
- [ ] Implement the minimal integration needed to pass it.
- [ ] Repeat red-green cycles for image prompt, four ordered perspectives, metadata open/close, previous/next navigation, final ending, and restart.
- [ ] Run the full test suite and confirm all interaction tests pass.

### Task 5: Monochrome art direction and responsive layout

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/components.css`
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: global color/type/spacing/motion tokens and responsive styles consumed by all components.

- [ ] Add the black/white/grey token system, typography hierarchy, hairline geometry, and visible focus styles.
- [ ] Add measured reveal/crossfade animations and a `prefers-reduced-motion` override.
- [ ] Add two-column desktop and single-column mobile rules without horizontal scrolling.
- [ ] Run tests and production build.

### Task 6: Browser QA and final verification

**Files:**
- Modify only files implicated by observed defects.

**Interfaces:**
- Exercises the complete public UI contract.

- [ ] Start Vite on a local fixed port.
- [ ] Verify page identity, meaningful DOM, no framework overlay, and clean browser console.
- [ ] Exercise `BEGIN → image → OPEN THIS MEMORY → four CONTINUE actions → VIEW OBJECT DATA → close → NEXT JOURNEY`.
- [ ] Exercise previous navigation, final ending, restart, Escape-to-close, and keyboard focus.
- [ ] Repeat visual inspection at desktop and mobile viewport sizes and correct clipping, overlap, or tap-target defects.
- [ ] Run fresh `pnpm test --run`, `pnpm lint`, and `pnpm build`; report exact results.
