# Dependency Graph

This document shows the import dependencies between TypeScript modules in the project.

## Architecture Overview

The project uses an **Elm-style Model-Message-Update-View** architecture:

- **`index.ts`** — entry point, bootstraps the update loop
- **`model.ts`** — application model type
- **`message.ts`** — union type of all user/system messages (Msg)
- **`update/`** — pure update handlers (one per message type)
- **`view/`** — rendering logic, reads Model and emits RenderNodes
- **`ui/`** — low-level SVG rendering primitives

## Visual Graph

Arrows point from importer to imported (downward = depends on).

```
                         ┌──────────────────────────────┐
                         │           index.ts            │
                         │       (main entrypoint)       │
                         └──────────────────────────────┘
                    ┌─────────┬──────────┬──────────┬────┘
                    ▼         ▼          ▼          ▼
              update/     view/      wakelock.ts  (shared below)
              index.ts    index.ts
                    │         │
                    │    ┌────┴──────────────────────────────────┐
                    │    │      │         │        │      │       │
                    │    ▼      ▼         ▼        ▼      ▼       ▼
                    │  circle guitar    modes   tonics settings ...etc
                    │    │      │         │        │
                    │    └──────┴─────────┴────────┘
                    │                 │
                    │           ui/index.ts
                    │
              ┌─────┴──────┐
              ▼            ▼
          model.ts     message.ts
              │    ╲   ╱   │
              │     ╲ ╱    │
              │      ╳     │
              │     ╱ ╲    │
              ▼    ╱   ╲   ▼
           types.ts    music.ts
              │    ╲       │
              ▼     ╲      ▼
            (zod)    ▼   mod.ts
                defaultState.ts
```

## Module Summary Table

### Root-level modules

| Module | Internal Dependencies | External Dependencies |
|--------|----------------------|----------------------|
| `index.ts` | message, model, types, update/index, view/index, wakelock | — |
| `mod.ts` | (none) | — |
| `music.ts` | mod | — |
| `types.ts` | (none) | zod |
| `model.ts` | music, types | — |
| `message.ts` | music, types | — |
| `defaultState.ts` | types | — |
| `wakelock.ts` | (none) | — |

### `update/` modules

| Module | Internal Dependencies | External Dependencies |
|--------|----------------------|----------------------|
| `update/index.ts` | message, model, types, updateScale, update-* | — |
| `update/updateScale.ts` | model, music, types | — |
| `update/update-chord-changed.ts` | model, types, updateScale | — |
| `update/update-chord-interval-change.ts` | model, types, updateScale | — |
| `update/update-flip-nut.ts` | model, types | — |
| `update/update-fretboard-label-change.ts` | model, types | — |
| `update/update-left-handed-fretboard.ts` | model, types | — |
| `update/update-midi-note.ts` | model, types, updateScale | — |
| `update/update-modal-state.ts` | model, types | — |
| `update/update-mode-changed.ts` | model, music, types, updateScale | — |
| `update/update-scale-family-change.ts` | model, music, types, updateScale | — |
| `update/update-set-c-to-noon.ts` | model, types | — |
| `update/update-toggle.ts` | model, types, updateScale | — |
| `update/update-tonic-changed.ts` | model, music, types, updateScale | — |
| `update/update-tuning-changed.ts` | model, types | — |

### `view/` modules

| Module | Internal Dependencies | External Dependencies |
|--------|----------------------|----------------------|
| `view/index.ts` | message, model, music, types, ui, chord-interval, circle, guitar, menu, modal, modes, permalink, scale-family, settings, storage, tonics, tuning | — |
| `view/circle.ts` | message, model, music, types, ui | — |
| `view/chord-interval.ts` | message, model, ui | — |
| `view/guitar.ts` | message, model, music, types, ui, view/tuning | — |
| `view/menu.ts` | message, model, types, ui | — |
| `view/modes.ts` | message, model, music, ui | — |
| `view/permalink.ts` | defaultState, message, model, types, ui | — |
| `view/scale-family.ts` | message, model, music, types, ui | — |
| `view/settings.ts` | message, model, types, ui | — |
| `view/storage.ts` | defaultState, message, model, types, ui | — |
| `view/tonics.ts` | message, model, music, ui | — |
| `view/tuning/index.ts` | message, model, types, ui, tuning-model | — |
| `view/tuning/tuning-model.ts` | music | — |
| `view/modal/index.ts` | message, model, types, ui, circleSettings, fretboardSettings | — |
| `view/modal/common.ts` | message | — |
| `view/modal/circleSettings.ts` | message, types, modal/common | — |
| `view/modal/fretboardSettings.ts` | message, types, view/tuning, modal/common | — |

### `ui/` modules

| Module | Internal Dependencies | External Dependencies |
|--------|----------------------|----------------------|
| `ui/index.ts` | (none) | — |

## Layered View (Bottom-Up)

```
Layer 0 (Foundation):    mod.ts, types.ts (+ zod), wakelock.ts
                              │
Layer 1 (Core):          music.ts, defaultState.ts
                              │
Layer 2 (Model):         model.ts, message.ts
                              │
Layer 3 (UI Primitives): ui/index.ts
                              │
Layer 4 (Update):        update/updateScale.ts, update/update-*.ts
                         update/index.ts
                              │
Layer 5 (View):          view/tuning/tuning-model.ts
                         view/tuning/index.ts
                         view/modal/common.ts
                         view/modal/circleSettings.ts, view/modal/fretboardSettings.ts
                         view/modal/index.ts
                         view/*.ts, view/index.ts
                              │
Layer 6 (Entry):         index.ts
```
