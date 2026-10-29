# Ashtray Interactive Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver and publish the first navigable React/Vite increment of the RMIT ashtray point-and-click narrative.

**Architecture:** A pure reducer owns scene and transition state. Focused scene components render independent flat illustration layers inside a reusable responsive stage, while shared hotspots, hand, and overlay components provide consistent interaction behavior.

**Tech Stack:** React, Vite, Vitest, Testing Library, CSS

**Spec:** `docs/superpowers/specs/2026-10-29-ashtray-interactive-narrative-design.md`

## Global Constraints

- Keep the six required scenes as separate React components.
- Use no traditional navigation bar, puzzle, inventory, score, win condition, or video.
- Use only fade, zoom, burn, blackout, and focus transitions.
- Preserve the existing GitHub Pages base path and workflow.
- Keep old source files unimported rather than deleting them.

## Review Focus

- Rapid repeated hotspot clicks must not corrupt the active scene.
- Every branch scene must expose a return to the Ashtray Hub.
- Keyboard users must be able to activate every hotspot.
- The 16:9 stage must remain usable at mobile widths without horizontal overflow.
- Reduced-motion users must not receive long transitions.

---

### Task 1: Scene State Model

**Files:**
- Create: `src/experience/experienceReducer.js`
- Test: `src/experience/experienceReducer.test.js`

**Interfaces:**
- Produces: `initialExperienceState`, `experienceReducer(state, action)`, `SCENES`, and `TRANSITIONS`.

- [ ] Write reducer tests for entering the hub, navigating to each branch with an allowed transition, advancing local steps, returning to the hub, and ignoring invalid scenes.
- [ ] Run the focused test and verify it fails because the module does not exist.
- [ ] Implement the minimal reducer and exported constants.
- [ ] Run the focused test and full suite.

### Task 2: Reusable Stage and Scene Components

**Files:**
- Create: `src/experience/components/Scene.jsx`
- Create: `src/experience/components/Hotspot.jsx`
- Create: `src/experience/components/IllustrationLayer.jsx`
- Create: `src/experience/components/Hand.jsx`
- Create: `src/experience/components/TransitionOverlay.jsx`
- Create: `src/experience/scenes/*.jsx`
- Replace: `src/App.jsx`
- Replace: `src/App.test.jsx`

**Interfaces:**
- Consumes: reducer actions and constants from Task 1.
- Produces: six scene components and reusable interaction primitives.

- [ ] Write interaction tests for intro-to-hub, each hub direction, local scene advancement, branch return, and accessible button names.
- [ ] Run the focused test and verify failure against the old application.
- [ ] Implement the reusable primitives and six scenes with placeholder illustration layers.
- [ ] Compose them in `App` and run focused and full tests.

### Task 3: Visual System, Documentation, and Publication

**Files:**
- Replace: `src/styles/tokens.css`
- Replace: `src/styles/global.css`
- Replace: `src/styles/components.css`
- Modify: `index.html`
- Modify: `README.md`

**Interfaces:**
- Consumes: semantic class names from Task 2.
- Produces: responsive atmospheric presentation and repository documentation.

- [ ] Implement the visual tokens, stage layout, placeholder illustration language, hotspot states, transitions, responsive behavior, and reduced-motion rules.
- [ ] Update metadata and README with local commands, architecture, artwork replacement guidance, and live URL.
- [ ] Run tests, lint, and production build.
- [ ] Verify the core workflow in a browser at desktop and mobile viewport sizes.
- [ ] Commit the complete source through the GitHub connector, wait for the Pages workflow, and verify the public URL.

