# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Guitar Dashboard is an interactive music theory visualization tool for guitarists. It displays scales, modes, and chords on both a guitar fretboard and circle of fifths visualization. Built with TypeScript and D3.js v3, deployed via GitHub Pages.

**Live site**: http://guitardashboard.com/

## Build Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript (tsc)
npm run dev          # Development mode: watch + local server at http://localhost:10001
npm start            # Run local server only
```

The build outputs a single bundled file at `docs/gtr-cof.js`. CI/CD via GitHub Actions deploys to the `publish` branch on push to `master`.

## Architecture

### Module System
TypeScript namespaces compiled in dependency order (defined in `tsconfig.json`). All source files are in `/src/`. The compiled output goes to `/docs/` which is served by GitHub Pages.

### Event-Driven Communication
Modules communicate via a custom pub/sub event bus in `events-module.ts`. Key events:
- `StateChangedEvent` - General state updates
- `TonicChangedEvent`, `ModeChangedEvent`, `ScaleChangedEvent` - Music theory selection changes
- `TuningChangedEvent`, `LeftHandedFretboardEvent`, `FlipNutChange` - Display preference changes

### Key Modules
- **music-module.ts** (461 lines) - Core music theory: intervals, scale families (Diatonic, Harmonic Minor, Jazz Minor, etc.), note definitions
- **state-module.ts** - Application state interface and defaults
- **cof-module.ts** - Circle of fifths D3.js visualization (`NoteCircle` class)
- **gtr-module.ts** - Fretboard rendering with left-handed/nut flip support
- **tuning-module.ts** - Guitar tuning definitions (Standard, Drop D, All Fourths, etc.)
- **permalink-module.ts** / **cookie-module.ts** - State persistence via URL and cookies

### Entry Points
- `src/gtr-cof.ts` - Main initialization, bootstraps all modules
- `docs/index.html` - Frontend entry, contains SVG containers and UI controls

### Data Flow
```
User Interaction → Event Bus → State Update → D3 Re-render → Cookie/URL Persistence
```

## Important Notes

- Module compilation order in `tsconfig.json` matters - dependencies must come first
- Edit only `.ts` files in `/src/`, never edit generated `.js` files
- Uses D3.js v3 (not current v7) - API differs significantly
- No test framework is configured
- No linting is configured
