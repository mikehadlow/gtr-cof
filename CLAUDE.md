# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Guitar Dashboard is an interactive music theory visualization tool for guitarists. It displays scales, modes, and chords on both a guitar fretboard and circle of fifths visualization. Built with TypeScript and D3.js v3, deployed via GitHub Pages.

**Live site**: http://guitardashboard.com/

## Build Commands

Guitar Dashboard uses Bun for build, development, and testing.

```bash
bun install          # Install dependencies
bun run build        # Bundle to JS
bun run start        # Development mode: local server at http://localhost:3000
bun run typecheck    # Run tsc with --noEmit
bun test             # Run unit tests with the Bun test runner
bun run check        # Run all checks: typecheck, tests, biome lint/format, dep-cruise
```

Run `bun run check` after every change and fix any errors before finishing.

The build outputs a single bundled file at `docs/gtr-cof.js`. CI/CD via GitHub Actions deploys to the `publish` branch on push to `master`.

## Architecture

### Module System
Uses ES modules

### Elm style architecture
The application uses an Elm-style Model Msg Update View architecture. Any user interaction triggers a message which
in turn triggers a handler, the handler updates the model which is then applied to each view in turn which updates
the UI.
- **index.ts** - main entry point which also implements the update loop
- **model.ts** - defines the model
- **message.ts** - defines messages
- **update/*.ts** - defines the update handlers
- **view/index.ts** - registers and invokes views

### Key Modules
- **music.ts** (461 lines) - Core music theory: intervals, scale families (Diatonic, Harmonic Minor, Jazz Minor, etc.), note definitions
- **state.ts** - Application state interface and defaults
- **circle.ts** - Circle of fifths D3.js visualization (`NoteCircle` class)
- **guitar.ts** - Fretboard rendering with left-handed/nut flip support
- **tuning.ts** - Guitar tuning definitions (Standard, Drop D, All Fourths, etc.)
- **permalink.ts** / **storage.ts** - State persistence via URL and local storage

### Entry Points
- `src/index.ts` - Main initialization, bootstraps all modules
- `docs/index.html` - Frontend entry, contains SVG containers and UI controls

## Long-running Plans

Plans for significant refactors or multi-phase work are kept in the `plans/` folder at the repo root.

## Important Notes

- Edit only `.ts` files in `/src/`, never edit generated `.js` files
- Uses D3.js v3 (not current v7) - API differs significantly
- No linting is configured
