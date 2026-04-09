import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Model } from "../src/model";
import * as music from "../src/music";
import type { State } from "../src/types";
import { Update } from "../src/update/update-chord-changed";

// Build a fresh input model with diatonic scale family, no chord selected.
function makeInputModel(chordIndex: number): Model {
    const state: State = {
        index: 3,
        naturalIndex: 3,
        chordIndex,
        chordIntervals: [0, 2, 4],
        toggledNotesBitmask: 0,
        scaleFamilyIndex: 0, // diatonic
        modeIndex: 0,
        midiToggledNotesBitmask: 0,
        isLeftHanded: false,
        isNutFlipped: false,
        fretboardLabelType: "NoteName",
        circleIsCNoon: true,
        tuningIndex: 0,
        modalState: "closed",
        sound: true,
    };

    const scaleFamily = music.scaleFamily[0];
    const mode = scaleFamily.modes.find((x) => x.index === 0)!;
    const noteSpec = music.createNoteSpec(state.naturalIndex, state.index);
    const nodes = music.generateScaleShim(
        noteSpec,
        mode,
        state.chordIndex,
        state.chordIntervals,
        state.toggledNotesBitmask,
        state.midiToggledNotesBitmask,
        scaleFamily,
    );

    return {
        music: { nodes, mode },
        state,
    };
}

const outDir = join(import.meta.dir, "..", "src", "update", "test-artifacts", "chord-changed");
mkdirSync(outDir, { recursive: true });

// Get the scale note indexes from a baseline model (no chord selected).
const baseline = makeInputModel(-1);
const scaleNoteIndexes = baseline.music.nodes
    .filter((x) => x.scaleNote.note.index !== -1)
    .map((x) => x.scaleNote.note.index);

let count = 0;

// Case 1: selecting each chord from no-chord state (chordIndex starts at -1)
for (const noteIndex of scaleNoteIndexes) {
    const model = makeInputModel(-1);
    const msg = { id: "ChordChanged" as const, chordIndex: noteIndex };
    const result = Update(model, msg);

    const filename = `select-${noteIndex}.json`;
    writeFileSync(join(outDir, filename), `${JSON.stringify(result, null, 2)}\n`);
    console.log(`wrote ${filename}`);
    count++;
}

// Case 2: toggle off – clicking the same chord that's already selected
for (const noteIndex of scaleNoteIndexes) {
    const model = makeInputModel(noteIndex);
    const msg = { id: "ChordChanged" as const, chordIndex: noteIndex };
    const result = Update(model, msg);

    const filename = `toggle-off-${noteIndex}.json`;
    writeFileSync(join(outDir, filename), `${JSON.stringify(result, null, 2)}\n`);
    console.log(`wrote ${filename}`);
    count++;
}

console.log("done – generated", count, "fixtures");
