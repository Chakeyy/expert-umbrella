# Caves of Qud-Inspired 1-Bit Pixel Art Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a unique Caves of Qud-inspired 1-bit pixel art portfolio in React, featuring glyph-bordered terminal UI, custom palette switching, a gallery codex with artifact inspection, a playable micro-overworld exploration mode, structured folders for the user's own art, and turnkey GitHub Pages deployment with GitHub PAT instructions.

**Architecture:** A lightweight React + TypeScript + Vite SPA. No sound effects per user request. No pre-generated AI art—the art registry in `src/data/art.ts` is cleanly structured for the user's own supplied 1-bit art files placed in `public/art/`, with clean SVG geometric wireframe fallbacks.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Vitest + React Testing Library, `gh-pages` deployment pipeline.

**Spec:** The design choices established in chat: 1-bit pixel art portfolio, Caves of Qud terminal aesthetic, silent (no SFX), user-supplied art structure, GitHub integration with PAT support, and free hosting ready.

## Global Constraints

- No sound effects or Web Audio (per user directive).
- No pre-generated AI art: user supplies their own pixel art in `public/art/`.
- Must render crisp with `image-rendering: pixelated` and high contrast.
- Must run cleanly on desktop and mobile browsers.
- Provide step-by-step GitHub repository creation and PAT push configuration for free hosting via GitHub Pages.

## Review Focus

1. Image loading failure or missing user art files — ensure clean, styled 1-bit placeholder fallback renders without layout shift.
2. Viewport scaling and pixel distortion on mobile displays — ensure responsive CSS grid and viewport containment without blur.
3. Keyboard navigation conflict when typing or switching screens — ensure hotkeys (WASD / Arrows / Esc) are scoped properly.
4. Mobile touch controls for the wanderer mini-map — provide touch directional buttons.
5. GitHub Pages base path configuration in Vite — ensure relative asset paths (`base: './'`) work on custom repo URLs.

---

### Task 1: Project Scaffolding, Git Init, and Test Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `tests/setup.ts`
- Create: `tests/App.test.tsx`

**Interfaces:**
- Consumes: None
- Produces: Working React + Vite + Vitest testing environment.

- [ ] **Step 1: Write initial test checking root renders**

```tsx
// tests/App.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeDefined();
  });
});
```

- [ ] **Step 2: Initialize Vite project with React, TypeScript, Tailwind, and Vitest**

Configure dependencies, `vite.config.ts` with `base: './'` for GitHub Pages compatibility.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/App.test.tsx`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: initialize project scaffolding and test setup"
```

---

### Task 2: 1-Bit Palette System and Scanline/CRT Visual Engine

**Files:**
- Create: `src/theme/palettes.ts`
- Create: `tests/theme.test.ts`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: None
- Produces: `PALETTES`: Record of 1-bit color themes (Green Phosphor, Amber CRT, Monochrome 1-bit, Cybernetic Cyan, Game Boy Olive), `applyPalette(name: string): void`.

- [ ] **Step 1: Write failing test for palette definitions**

```ts
// tests/theme.test.ts
import { describe, it, expect } from 'vitest';
import { PALETTES, getPaletteCssVariables } from '../src/theme/palettes';

describe('Palettes', () => {
  it('contains expected retro themes', () => {
    expect(PALETTES['monochrome']).toBeDefined();
    expect(PALETTES['phosphor']).toBeDefined();
    expect(PALETTES['amber']).toBeDefined();
  });

  it('generates css variables with fg, bg, and border colors', () => {
    const vars = getPaletteCssVariables('monochrome');
    expect(vars['--color-bg']).toBe('#000000');
    expect(vars['--color-fg']).toBe('#ffffff');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/theme.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/theme/palettes.ts` and CSS scanline effects in `src/index.css`**

Implement theme definitions, CSS variables, and scanlines/CRT toggle class in `src/index.css`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/theme.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/theme/ tests/theme.test.ts src/index.css
git commit -m "feat: add 1-bit palette themes and CRT visual styling"
```

---

### Task 3: Caves of Qud-Style UI Components (Glyph Borders, Terminal Header, Status Bar)

**Files:**
- Create: `src/components/GlyphFrame.tsx`
- Create: `src/components/TerminalHeader.tsx`
- Create: `src/components/StatusBar.tsx`
- Create: `tests/GlyphFrame.test.tsx`

**Interfaces:**
- Consumes: `src/theme/palettes.ts`
- Produces: Reusable ASCII/glyph frame component (`╔══╗`, `║`, `╚══╝`), terminal headers, top nav tabs, and bottom status ticker.

- [ ] **Step 1: Write test for GlyphFrame rendering with title**

```tsx
// tests/GlyphFrame.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GlyphFrame } from '../src/components/GlyphFrame';

describe('GlyphFrame', () => {
  it('renders children with title border', () => {
    render(<GlyphFrame title="ARCHIVES"><span>Content Inside</span></GlyphFrame>);
    expect(screen.getByText('ARCHIVES')).toBeDefined();
    expect(screen.getByText('Content Inside')).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/GlyphFrame.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `GlyphFrame`, `TerminalHeader`, and `StatusBar`**

ASCII double-line borders, retro indicator lights, active tab indicators, and palette switcher.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/GlyphFrame.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ tests/GlyphFrame.test.tsx
git commit -m "feat: add Qud-style glyph frames and terminal navigation"
```

---

### Task 4: User-Supplied Art Registry and Codex Gallery View

**Files:**
- Create: `src/data/art.ts`
- Create: `public/art/README.md`
- Create: `src/components/CodexView.tsx`
- Create: `src/components/ArtInspectorModal.tsx`
- Create: `tests/CodexView.test.tsx`

**Interfaces:**
- Consumes: `src/components/GlyphFrame.tsx`
- Produces: Art data registry designed for the user's own images, full art gallery with filtering by category, item list with ASCII indicator, and high-detail artifact inspection modal with zoom and lore.

- [ ] **Step 1: Write test for CodexView filtering and selection**

```tsx
// tests/CodexView.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CodexView } from '../src/components/CodexView';

describe('CodexView', () => {
  it('renders art entries and selects an item', () => {
    render(<CodexView />);
    const items = screen.getAllByRole('button');
    expect(items.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/CodexView.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/data/art.ts` + `public/art/README.md` + `CodexView.tsx` + `ArtInspectorModal.tsx`**

Include clean structured entries with fallback placeholders so the user can easily swap in their own images, title, lore, dimensions, year, and tags.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/CodexView.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/ public/art/ src/components/CodexView.tsx src/components/ArtInspectorModal.tsx tests/CodexView.test.tsx
git commit -m "feat: implement art codex gallery and user art directory structure"
```

---

### Task 5: Playable 1-Bit "Wanderer" Overworld Mini-Map

**Files:**
- Create: `src/components/WandererView.tsx`
- Create: `src/game/mapData.ts`
- Create: `tests/WandererView.test.tsx`

**Interfaces:**
- Consumes: `src/data/art.ts`
- Produces: An interactive 2D grid where visitors control an `@` wanderer, exploring salt dunes, chrome monoliths, and ancient ruins. Stepping onto an ancient shrine inspects the corresponding artwork! Supports keyboard and touch D-pad.

- [ ] **Step 1: Write test for WandererView rendering and movement**

```tsx
// tests/WandererView.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WandererView } from '../src/components/WandererView';

describe('WandererView', () => {
  it('renders tile grid and nomad player icon', () => {
    render(<WandererView onInspectArt={() => {}} />);
    expect(screen.getByText('@')).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/WandererView.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/game/mapData.ts` and `src/components/WandererView.tsx`**

Tilemap with biomes (`.`, `~`, `^`, `♣`, `Ω`, `∩`), collision detection, discovery triggers for portfolio art pieces, and on-screen directional touch pad for mobile.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/WandererView.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/game/ src/components/WandererView.tsx tests/WandererView.test.tsx
git commit -m "feat: add interactive 1-bit wanderer exploration overworld"
```

---

### Task 6: Character Sheet (Artist Dossier) and Transmission (Contact) Views

**Files:**
- Create: `src/components/CharacterSheetView.tsx`
- Create: `src/components/TransmissionView.tsx`
- Create: `tests/CharacterSheetView.test.tsx`

**Interfaces:**
- Consumes: `src/components/GlyphFrame.tsx`
- Produces:
  - Character Sheet / Bio: Level, Mutations/Skills (e.g., "1-Bit Dithering Mastery", "Palette Alchemy"), Equipment (Aseprite, Graphics Tablet), Commission Status.
  - Transmission / Contact: Submittable contact form, Social / Frequency links (GitHub, Bluesky, Twitter/X, Itch.io, ArtStation, Email).

- [ ] **Step 1: Write test for CharacterSheetView**

```tsx
// tests/CharacterSheetView.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CharacterSheetView } from '../src/components/CharacterSheetView';

describe('CharacterSheetView', () => {
  it('renders artist profile and stats', () => {
    render(<CharacterSheetView />);
    expect(screen.getByText(/CHARACTER DOSSIER/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/CharacterSheetView.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `CharacterSheetView` and `TransmissionView`**

Style with Qud RPG stat sheets, attribute modifiers, equipment slots, and terminal frequency broadcasts.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/CharacterSheetView.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/CharacterSheetView.tsx src/components/TransmissionView.tsx tests/CharacterSheetView.test.tsx
git commit -m "feat: add character dossier bio and transmission contact views"
```

---

### Task 7: App Integration, CRT Toggle, and GitHub Pages / PAT Deployment Guide

**Files:**
- Modify: `src/App.tsx`
- Create: `README.md` (complete instructions on replacing art images + GitHub Pages PAT deploy script & guide)
- Create: `scripts/deploy-github.sh` (one-command script to deploy using GitHub PAT)
- Create: `tests/Integration.test.tsx`

**Interfaces:**
- Consumes: All views and theme modules.
- Produces: Complete working application with tab navigation, hotkeys, responsive mobile layout, and turnkey GitHub Pages deployment config.

- [ ] **Step 1: Write full integration test for view switching**

```tsx
// tests/Integration.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('Full Integration', () => {
  it('allows switching between Codex, Wanderer, Dossier, and Transmissions', () => {
    render(<App />);
    const wandererTab = screen.getByText(/WANDERER/i);
    fireEvent.click(wandererTab);
    expect(screen.getByText('@')).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/Integration.test.tsx`
Expected: FAIL

- [ ] **Step 3: Assemble full App with header tabs, keyboard shortcuts, and CRT scanline toggles**

Wire all components together in `src/App.tsx`. Create `README.md` and `scripts/deploy-github.sh` with explicit step-by-step instructions on deploying using a GitHub Personal Access Token (PAT) to GitHub Pages.

- [ ] **Step 4: Run full test suite to verify everything passes**

Run: `npx vitest run`
Expected: ALL PASS

- [ ] **Step 5: Build verification**

Run: `npm run build`
Expected: Vite build succeeds with clean output in `dist/`.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: complete Caves of Qud 1-bit portfolio with GitHub PAT deployment"
```
