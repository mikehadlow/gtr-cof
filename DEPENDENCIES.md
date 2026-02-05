# Dependency Graph

This document shows the import dependencies between TypeScript modules in the project.

## Visual Graph

```
                            ┌─────────────────────────────────────┐
                            │             index.ts                │
                            │          (main entrypoint)          │
                            └─────────────────────────────────────┘
                                             │
       ┌─────────────────────────────────────┼─────────────────────────────────────┐
       │         │         │         │       │       │         │         │         │
       ▼         ▼         ▼         ▼       ▼       ▼         ▼         ▼         ▼
    menu.ts  tonics.ts  modes.ts   cof.ts  gtr.ts tuning.ts scale-   settings.ts  state.ts
       │         │         │         │       │       │      family.ts    │          │
       │         │         │         │       │       │         │         │          │
       │         ▼         ▼         ▼       ▼       ▼         ▼         ▼          │
       │    ┌────┴─────────┴─────────┴───────┴───────┴─────────┴─────────┘          │
       │    │                                                                        │
       │    ▼                                                                        │
       │  events.ts ◄───────────────────────────────────────────────────────────────┤
       │    │                                                                        │
       │    │         ┌──────────────────────────────────────────────┐              │
       │    ▼         ▼                                              │              │
       │  music.ts ◄──┘                                              │              │
       │    │                                                        │              │
       │    ▼                                                        │              │
       │  mod.ts                                                     │              │
       │                                                             │              │
       │                     ┌───────────────────────────────────────┘              │
       │                     │                                                      │
       │                     ▼                                                      │
       │                  types.ts ◄────────────────────────────────────────────────┤
       │                     │                                                      │
       │                     ▼                                                      │
       │                   (zod)                                                    │
       │                                                                            │
       │         ┌──────────────────────────────────────────────────────────────────┤
       │         │                                                                  │
       │         ▼                                                                  │
       │     cookie.ts ◄────────────────────────────────────────────────────────────┤
       │                                                                            │
       │     permalink.ts ◄─────────────────────────────────────────────────────────┘
       │         │
       │         ▼
       │     state.ts (re-exports from types)
       │
       └──► (no imports)
```

## Summary Table

| Module | Internal Dependencies | External Dependencies |
|--------|----------------------|----------------------|
| `index.ts` | menu, tonics, modes, chord-interval, cof, gtr, tuning, scale-family, settings, permalink, state, cookie, music | d3 |
| `mod.ts` | (none) | (none) |
| `menu.ts` | (none) | (none) |
| `types.ts` | (none) | zod |
| `music.ts` | mod | (none) |
| `events.ts` | types, music | (none) |
| `state.ts` | events, music, cookie, permalink, types | (none) |
| `gtr.ts` | events, music, tuning | d3 |
| `tuning.ts` | events, music | d3 |
| `cookie.ts` | events, types | (none) |
| `cof.ts` | events, music | d3 |
| `tonics.ts` | events, music | d3 |
| `modes.ts` | events, music | d3 |
| `scale-family.ts` | events, music | d3 |
| `settings.ts` | events, types | (none) |
| `permalink.ts` | events, types, state | (none) |
| `chord-interval.ts` | events | d3 |
| `midi.ts` | events | (none) |

## Layered View (Bottom-Up)

```
Layer 0 (Foundation):    mod.ts, menu.ts, types.ts (+ zod)
                              │
Layer 1 (Core):          music.ts
                              │
Layer 2 (Event Bus):     events.ts
                              │
Layer 3 (Modules):       cookie.ts, settings.ts, midi.ts, tuning.ts,
                         tonics.ts, modes.ts, cof.ts, gtr.ts,
                         scale-family.ts, chord-interval.ts
                              │
Layer 4 (State):         permalink.ts, state.ts
                              │
Layer 5 (Entry):         index.ts
```
