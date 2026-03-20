import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Model } from "../model";
import * as music from "../music";
import type { State } from "../types";
import { Update } from "./update-mode-changed";

// Build a fresh input model with diatonic scale family, zero toggles.
function makeInputModel(scaleFamilyIndex: number): Model {
    const sf = music.scaleFamily[scaleFamilyIndex];
    const defaultMode = sf.modes.find((x) => x.index === sf.defaultModeIndex)!;

    const state: State = {
        index: 3,
        naturalIndex: 3,
        chordIndex: -1,
        chordIntervals: [0, 2, 4],
        toggledNotesBitmask: 0,
        scaleFamilyIndex,
        modeIndex: defaultMode.index,
        midiToggledNotesBitmask: 0,
        isLeftHanded: false,
        isNutFlipped: false,
        fretboardLabelType: "NoteName",
        circleIsCNoon: true,
        tuningIndex: 0,
        modalState: "closed",
    };

    const noteSpec = music.createNoteSpec(state.naturalIndex, state.index);
    const nodes = music.generateScaleShim(
        noteSpec,
        defaultMode,
        state.chordIndex,
        state.chordIntervals,
        state.toggledNotesBitmask,
        state.midiToggledNotesBitmask,
        sf,
    );

    return {
        music: { nodes, mode: defaultMode },
        state,
    };
}

const outDir = join(import.meta.dir, "test-artifacts", "mode-changed");
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const sf of music.scaleFamily) {
    for (const mode of sf.modes) {
        const model = makeInputModel(sf.index);
        const msg = { id: "ModeChanged" as const, mode };
        const result = Update(model, msg);

        const safeName = mode.name.replace(/[^a-zA-Z0-9-]/g, "_");
        const filename = `${sf.name}-${safeName}.json`;
        writeFileSync(join(outDir, filename), `${JSON.stringify(result, null, 2)}\n`);
        console.log(`wrote ${filename}`);
        count++;
    }
}

console.log("done – generated", count, "fixtures");
