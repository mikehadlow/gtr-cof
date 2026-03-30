# Plan: Replace D3.js with Custom SVG Render Model

## Context

D3.js v3 is a legacy, unmaintained dependency used conservatively here — mainly for DOM selection, arc path generation, and data binding. The existing Elm-style architecture already wants views to be pure functions, but they're impure because they mutate the DOM directly. This refactor completes that design: views become pure functions returning a `RenderNode[]` tree, and a central reconciler applies it to the DOM. This removes the D3 dependency, enables unit testing of view output, and eliminates the awkward `ctx.init` / `NoteCircleState` / `fretboardStateHasChanged` patterns.

## Scope

SVG views only: `circle.ts`, `guitar.ts`, `tonics.ts`, `modes.ts`, `chord-interval.ts`, `ui/index.ts`.
Non-SVG views (`scale-family.ts`, `tuning.ts`, `settings.ts`, `menu.ts`, `modal/`) are out of scope — they use HTML DOM and can be migrated separately or replaced with native `<select>` elements later.

---

## Progress

### ✅ Phase 1a — RenderNode Discriminated Union
Done. `RenderNode` type exported from `src/ui/index.ts`.

### ✅ Phase 1b — Arc Math Utilities
Done. `arcPath` and `arcCentroid` exported from `src/ui/index.ts`.
Tests: `src/ui/index.test.ts` (11 tests, pure math, no DOM).

### ✅ Phase 1c — Reconciler — Full Rebuild
Done. `renderToSvg` exported from `src/ui/index.ts`. `createElement` is internal.
Tests: `src/ui/reconciler.test.ts` (18 tests).
DOM environment: uses `@happy-dom/global-registrator` (installed as devDependency).
Import pattern for happy-dom test files:
```typescript
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();  // blank line before/after required by biome

import { describe, expect, test } from "bun:test";
```

### ✅ Phase 1d — Settings Icon as RenderNode[]
Done. `settingsIconNodes(svgWidth, onClick): RenderNode[]` exported from `src/ui/index.ts`.

### ✅ Phase 2 — Update the View Type
Done.
- `SvgView<TModel, TMsg>` added to `src/types.ts` (alongside existing `View`, not replacing it).
- `svgViews` array and reconciler loop added to `src/view/index.ts`.
- Old `View`-based views and `SvgView`-based views coexist; old views are removed from `views[]` as they are ported.

### ✅ Phase 3a — `src/view/chord-interval.ts`
Done. `chordIntervalNodes(model, raise): RenderNode[]` exported. Old D3 `view` export still present but no longer called.

### ✅ Phase 3b — `src/view/modes.ts`
Done. `modesNodes(model, raise): RenderNode[]` exported. Old D3 `view` export still present but no longer called.

### ✅ Phase 3c — `src/view/tonics.ts`
Done. `tonicsNodes(model, raise): RenderNode[]` exported. Old D3 `view` export still present but no longer called.
Tests for 3a/3b/3c: `src/view/modes-panel.test.ts` (25 tests, no DOM needed — pure data).

**Combined view wired in `src/view/index.ts`:**
```typescript
const modesPanelView: SvgView<Model, Msg> = (model, raise) => [
    ...tonicsNodes(model, raise),
    ...chordIntervalNodes(model, raise),
    ...modesNodes(model, raise),
];
const svgViews = [{ containerId: "modes", view: modesPanelView }];
```
Old `tonicsView`, `modesView`, `chordIntervalView` removed from `views[]`.

### ✅ Phase 3d — `src/view/circle.ts`
Done. `circleNodes(noteIndexes, label, svgWidth): SvgView<Model, Msg>` exported. `NoteCircleState`, `draw()`, `update()` removed. Old D3 `create` export gone.
Tests: `src/view/circle.test.ts` (30 tests, pure data — no DOM needed).

Registered in `svgViews`:
```typescript
{ containerId: "chromatic", view: circleNodes(music.chromatic(), "Chromatic", 500) },
{ containerId: "cof", view: circleNodes(music.fifths(), "Circle of Fifths", 500) },
```
svgWidth=500 is the `width` attribute on both `#chromatic` and `#cof` SVG elements in `docs/index.html`.

### ⬜ Phase 3e — `src/view/guitar.ts`
Not done.

Migration steps:
- Remove `fretboardStateHasChanged()` check — reconciler handles this.
- Handedness flip: emit a `'g'` node with `transform="translate(1200,0) scale(-1,1)"` or `"translate(0,0) scale(1,1)"`.
- Text label flip: `transform` attribute on each `'text'` node.
- Remove `fretboardElement.transform.baseVal` manipulation (SVG DOM hack).
- Return all fret/dot/string/note nodes on each render.
- Register as `{ containerId: "gtr", view: guitarView }` in `svgViews`.

---

## Implementation Notes

### Biome import ordering
Biome sorts imports alphabetically within groups. `../types` sorts before `../ui`, so always place the `../types` import above the `../ui` import. Example:
```typescript
import type { Svg, View, ViewContext } from "../types";
import type { RenderNode } from "../ui";
```

### Old D3 exports
The old `view` exports in `chord-interval.ts`, `modes.ts`, `tonics.ts` are dead code — still exported but no longer imported anywhere. Clean them up in Phase 4 along with the D3 imports.

### Test helper: collect
A recursive DFS collector used in view tests (defined inline in `modes-panel.test.ts`; copy it into new test files):
```typescript
function collect<T extends RenderNode["type"]>(type: T, nodes: RenderNode[]): Extract<RenderNode, { type: T }>[] {
    const result: Extract<RenderNode, { type: T }>[] = [];
    for (const node of nodes) {
        if (node.type === type) result.push(node as Extract<RenderNode, { type: T }>);
        if (node.type === "g") result.push(...collect(type, node.children));
    }
    return result;
}
```

### circle.ts: segment geometry
The `generateSegments` function and `rotate` helper in `circle.ts` are pure and can be kept as-is. Only the rendering changes. The two circle instances (chromatic / cof) differ only by their `noteIndexes` array and label — the factory pattern handles this.

---

## Phase 4 — Remove D3

```bash
bun remove d3 @types/d3
```

After all views are ported:
- Remove all `import d3 from "d3"` statements.
- Delete the old D3 `view` exports from `chord-interval.ts`, `modes.ts`, `tonics.ts`.
- Delete `appendSettingsIcon` from `src/ui/index.ts` (replaced by `settingsIconNodes`).
- Remove `d3` from `package.json`.

---

## Critical Files

| File | Status | Change |
|------|--------|--------|
| `src/ui/index.ts` | ✅ | RenderNode, arc math, reconciler, `settingsIconNodes` all done |
| `src/types.ts` | ✅ | `SvgView` type added |
| `src/view/index.ts` | ✅ (growing) | `modesPanelView` registered; chromatic/cof/gtr to be added |
| `src/view/chord-interval.ts` | ✅ | `chordIntervalNodes` done |
| `src/view/modes.ts` | ✅ | `modesNodes` done |
| `src/view/tonics.ts` | ✅ | `tonicsNodes` done |
| `src/view/circle.ts` | ✅ | `circleNodes` done; D3 removed |
| `src/view/guitar.ts` | ⬜ | Port to return RenderNode[]; replace D3 transforms |
| `package.json` | ⬜ | Remove d3 dependency |

## Test Files

| File | Coverage |
|------|----------|
| `src/ui/index.test.ts` | `arcPath`, `arcCentroid` (11 tests) |
| `src/ui/reconciler.test.ts` | `renderToSvg`, `createElement` all 7 node types (18 tests) |
| `src/view/modes-panel.test.ts` | `chordIntervalNodes`, `modesNodes`, `tonicsNodes` (25 tests) |
| `src/view/circle.test.ts` | `circleNodes` structure, classes, click handlers, rotation (30 tests) |

## Reusable Utilities to Carry Forward

- Arc segment data computation in `circle.ts` (the `generateSegments` / `rotate` functions) — unchanged, only the rendering changes
- All music theory logic in `music.ts` — untouched
- All update handlers in `update/` — untouched
- The model, state, message types — untouched

---

## Verification

1. `bun run typecheck` — no type errors
2. `bun test` — all tests pass
3. `bun run check` — biome lint/format clean
4. `bun run build` — bundles successfully
5. `bun run start` → visual check at http://localhost:3000:
   - Both circles render and respond to note/interval/chord clicks
   - Fretboard renders with correct notes, responds to clicks
   - Mode, tonic, chord-interval buttons all work
   - Left-handed toggle flips fretboard correctly
   - Settings modal opens from gear icon on both circles and fretboard
   - Tuning change re-renders fretboard
