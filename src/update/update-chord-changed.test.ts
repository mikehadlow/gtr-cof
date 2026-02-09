import { describe, test, expect } from "bun:test";
import { join } from "path";
import * as music from "../music";
import { Update } from "./update-chord-changed";
import { type State } from "../types";
import { type Model } from "../model";

function makeInputModel(chordIndex: number): Model {
    const state: State = {
        index: 3,
        naturalIndex: 3,
        chordIndex,
        chordIntervals: [0, 2, 4],
        toggledIndexes: 0,
        scaleFamilyIndex: 0,
        modeIndex: 0,
        midiToggledIndexes: 0,
        isLeftHanded: false,
        isNutFlipped: false,
        fretboardLabelType: "NoteName",
        circleIsCNoon: true,
        tuningIndex: 0,
    };

    const scaleFamily = music.scaleFamily[0];
    const mode = scaleFamily.modes.find(x => x.index === 0)!;
    const noteSpec = music.createNoteSpec(state.naturalIndex, state.index);
    const nodes = music.generateScaleShim(
        noteSpec, mode, state.chordIndex, state.chordIntervals,
        state.toggledIndexes, state.midiToggledIndexes, scaleFamily
    );

    return {
        music: { nodes, mode },
        state,
    };
}

const artifactsDir = join(import.meta.dir, "test-artifacts", "chord-changed");

// Get scale note indexes from a baseline model.
const baseline = makeInputModel(-1);
const scaleNoteIndexes = baseline.music.nodes
    .filter(x => x.scaleNote.note.index !== -1)
    .map(x => x.scaleNote.note.index);

describe("update-chord-changed", () => {
    describe("select chord from no-chord state", () => {
        for (const noteIndex of scaleNoteIndexes) {
            test(`select-${noteIndex}`, async () => {
                const model = makeInputModel(-1);
                const msg = { id: "ChordChanged" as const, chordIndex: noteIndex };
                const result = Update(model, msg);

                const fixture = await Bun.file(join(artifactsDir, `select-${noteIndex}.json`)).json();
                expect(result).toEqual(fixture);
            });
        }
    });

    describe("toggle off already-selected chord", () => {
        for (const noteIndex of scaleNoteIndexes) {
            test(`toggle-off-${noteIndex}`, async () => {
                const model = makeInputModel(noteIndex);
                const msg = { id: "ChordChanged" as const, chordIndex: noteIndex };
                const result = Update(model, msg);

                const fixture = await Bun.file(join(artifactsDir, `toggle-off-${noteIndex}.json`)).json();
                expect(result).toEqual(fixture);
            });
        }
    });
});
