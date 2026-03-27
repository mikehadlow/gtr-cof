# Plan: Replace D3.js with Custom SVG Render Model

## Context

D3.js v3 is a legacy, unmaintained dependency used conservatively here — mainly for DOM selection, arc path generation, and data binding. The existing Elm-style architecture already wants views to be pure functions, but they're impure because they mutate the DOM directly. This refactor completes that design: views become pure functions returning a `RenderNode[]` tree, and a central reconciler applies it to the DOM. This removes the D3 dependency, enables unit testing of view output, and eliminates the awkward `ctx.init` / `NoteCircleState` / `fretboardStateHasChanged` patterns.

## Scope

SVG views only: `circle.ts`, `guitar.ts`, `tonics.ts`, `modes.ts`, `chord-interval.ts`, `ui/index.ts`.
Non-SVG views (`scale-family.ts`, `tuning.ts`, `settings.ts`, `menu.ts`, `modal/`) are out of scope — they use HTML DOM and can be migrated separately or replaced with native `<select>` elements later.

---

## TDD Approach

Follow red-green TDD throughout, especially for Phase 1 and Phase 3.

**Phase 1 (render model & arc math):** Write tests first for `arcPath` and `arcCentroid` — these are pure math functions with known outputs (e.g. a 90° arc should produce specific SVG path coordinates). Write tests for `createElement` / `renderToSvg` using a lightweight DOM (Bun's test runner supports `jsdom` or happy-dom via `--dom`).

**Phase 3 (porting views):** For each view, the workflow is:
1. **Red** — Write a test that calls the new `SvgView` function with a known model and asserts on the returned `RenderNode[]` (count, types, classes, event handlers). This test fails because the view still uses D3.
2. **Green** — Port the view to return `RenderNode[]` until the test passes.
3. **Refactor** — Clean up, then move to the next view.

This is where the new architecture pays off: views returning plain data structures can be tested without a DOM or D3. Example for `chord-interval.ts`:

```typescript
// Red: write this first
test("chord-interval view returns 7 circles", () => {
    const nodes = chordIntervalView(model, () => {});
    const circles = nodes.flatMap(collectByType('circle'));
    expect(circles).toHaveLength(7);
});

test("active interval circle has selected class", () => {
    const model = modelWithChordIntervals([0, 2, 4]);
    const nodes = chordIntervalView(model, () => {});
    const circles = nodes.flatMap(collectByType('circle'));
    expect(circles[0].class).toContain('mode-button-selected');
    expect(circles[1].class).not.toContain('mode-button-selected');
});
```

---

## Phase 1 — Define the Render Model in `src/ui/index.ts`

Replace the existing D3-based `appendSettingsIcon` with a full render model module.

### 1a. RenderNode Discriminated Union

```typescript
export type RenderNode =
  | { type: 'g'; transform?: string; children: RenderNode[] }
  | { type: 'circle'; cx: number; cy: number; r: number; class?: string; fill?: string; stroke?: string; strokeWidth?: number; pointerEvents?: string; onClick?: () => void }
  | { type: 'rect'; x: number; y: number; width: number; height: number; class?: string; fill?: string; stroke?: string; strokeWidth?: number; onClick?: () => void }
  | { type: 'path'; d: string; class?: string; onClick?: () => void }
  | { type: 'text'; x: number; y: number; class?: string; textAnchor?: string; transform?: string; content: string }
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number; stroke?: string; strokeWidth?: number }
  | { type: 'use'; href: string; x: number; y: number; width: number; height: number; style?: Record<string, string> }
```

### 1b. Arc Math Utilities

Replace `d3.svg.arc()` — used in `circle.ts` for all segment paths and centroids:

```typescript
export function arcPath(innerR: number, outerR: number, startAngle: number, endAngle: number, padAngle = 0): string
export function arcCentroid(innerR: number, outerR: number, startAngle: number, endAngle: number): [number, number]
```

D3 convention: angle 0 = 12 o'clock, clockwise. SVG coords: `x = sin(a) * r`, `y = -cos(a) * r`.

### 1c. Reconciler — Full Rebuild

Start simple: clear container and recreate all elements. Adequate for ~300 elements at event-driven re-render rates.

```typescript
const SVG_NS = 'http://www.w3.org/2000/svg';

export function renderToSvg(container: SVGElement, nodes: RenderNode[]): void {
    while (container.firstChild) container.removeChild(container.firstChild);
    for (const node of nodes) container.appendChild(createElement(node));
}

function createElement(node: RenderNode): SVGElement { /* switch on node.type */ }
```

`createElement` handles: setting attributes, `addEventListener('click', ...)` for nodes with `onClick`, and recursing into `children` for `'g'` nodes.

### 1d. Settings Icon as RenderNode[]

Replace the old `appendSettingsIcon(svg, onClick)` D3 function with:

```typescript
export function settingsIconNodes(x: number, y: number, onClick: () => void): RenderNode[]
```

Returns a `'g'` node with the transparent `'rect'` hit area and `'use'` element. Hover effect via CSS `:hover` on the group rather than JS mouseover/mouseout.

---

## Phase 2 — Update the View Type

**File: `src/view/index.ts`** (and related types)

Change the `View` type — remove `ctx: ViewContext` (no longer needed; reconciler handles init transparently), change return type to `RenderNode[]`:

```typescript
// Before
type View<TModel, TMsg, TSvg> = (model: TModel, ctx: ViewContext, raise: (msg: TMsg) => void) => TSvg;

// After
type SvgView<TModel, TMsg> = (model: TModel, raise: (msg: TMsg) => void) => RenderNode[];
```

Each SVG view is registered alongside its container ID:

```typescript
const svgViews: Array<{ containerId: string; view: SvgView<Model, Msg> }> = [
    { containerId: "chromatic", view: chromaticView },
    { containerId: "cof",       view: cofView },
    { containerId: "gtr",       view: guitarView },
    { containerId: "modes",     view: modesView },  // tonics + modes + chord-interval all render here
];
```

The composite view function in `src/view/index.ts` calls each view, then calls `renderToSvg` on the result.

The non-SVG views (`menuView`, `settingsView`, `tuningView`, etc.) keep their existing signature and are called separately.

---

## Phase 3 — Port Views (Simplest First)

### 3a. `src/view/chord-interval.ts`
7 circles + 7 text nodes. No arcs. Easy first migration.

### 3b. `src/view/modes.ts`
Variable rect + text nodes per mode. Currently does `.selectAll("g").remove()` each render — full rebuild reconciler makes this trivial.

### 3c. `src/view/tonics.ts`
~21 rect + text nodes. Currently uses D3 data binding with `indexer = (d) => d.noteSpec.label`.

### 3d. `src/view/circle.ts`
Most complex. Uses `d3.svg.arc` for all segment paths and centroid calculations.

Migration steps:
- Replace `d3.svg.arc()` calls with `arcPath()` and `arcCentroid()` from `src/ui/index.ts`
- Remove `NoteCircleState` (cached D3 selections no longer needed)
- Remove `draw()` / `update()` split — just return all nodes each render
- `NoteCircle` class becomes a pure function: `noteCircleNodes(data: NoteCircleData, raise): RenderNode[]`
- Settings icon node comes from `settingsIconNodes()`

### 3e. `src/view/guitar.ts`
Complex transform handling.

Migration steps:
- Remove `fretboardStateHasChanged()` check — reconciler handles this
- Handedness flip: emit a `'g'` node with `transform="translate(1200,0) scale(-1,1)"` or `"translate(0,0) scale(1,1)"`
- Text label flip: `transform` attribute on each `'text'` node
- Remove `fretboardElement.transform.baseVal` manipulation (SVG DOM hack)
- Return all fret/dot/string/note nodes on each render

---

## Phase 4 — Remove D3

```bash
bun remove d3 @types/d3
```

Remove all `import * as d3 from 'd3'` statements. Remove `d3` from `package.json`.

---

## Critical Files

| File | Change |
|------|--------|
| `src/ui/index.ts` | Full rewrite: RenderNode types, arc math, reconciler, settingsIconNodes |
| `src/view/index.ts` | Update composite view to use reconciler; register svgViews with container IDs |
| `src/view/circle.ts` | Port to return RenderNode[]; replace d3.svg.arc with arcPath/arcCentroid |
| `src/view/guitar.ts` | Port to return RenderNode[]; replace D3 transforms |
| `src/view/tonics.ts` | Port to return RenderNode[] |
| `src/view/modes.ts` | Port to return RenderNode[] |
| `src/view/chord-interval.ts` | Port to return RenderNode[] |
| `package.json` | Remove d3 dependency |

## Reusable Utilities to Carry Forward

- Arc segment data computation in `circle.ts` (the `segments(...)` call etc.) — unchanged, only the rendering changes
- All music theory logic in `music.ts` — untouched
- All update handlers in `update/` — untouched
- The model, state, message types — untouched

---

## Verification

1. `bun run typecheck` — no type errors
2. `bun test` — existing tests pass
3. `bun run build` — bundles successfully
4. `bun run start` → visual check at http://localhost:3000:
   - Both circles render and respond to note/interval/chord clicks
   - Fretboard renders with correct notes, responds to clicks
   - Mode, tonic, chord-interval buttons all work
   - Left-handed toggle flips fretboard correctly
   - Settings modal opens from gear icon on both circles and fretboard
   - Tuning change re-renders fretboard
