import { describe, test, expect } from "bun:test";
import { join } from "path";
import * as music from "../music";
import { Update } from "./update-tonic-changed";
import { type State } from "../types";
import { type Model } from "../model";

function makeInputModel(): Model {
    const state: State = {
        index: 3,
        naturalIndex: 3,
        chordIndex: -1,
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

const suffixes = [
    { offset: -1, suffix: "flat" },
    { offset: 0,  suffix: "natural" },
    { offset: 1,  suffix: "sharp" },
] as const;

const artifactsDir = join(import.meta.dir, "test-artifacts");

describe("update-tonic-changed", () => {
    for (const nat of music.naturals) {
        for (const { offset, suffix } of suffixes) {
            const label = `${nat.label}-${suffix}`;

            test(label, async () => {
                const noteIndex = (nat.index + offset + 12) % 12;
                const noteSpec = music.createNoteSpec(nat.index, noteIndex);
                const msg = { id: "TonicChanged" as const, noteSpec };

                const model = makeInputModel();
                const result = Update(model, msg);

                const fixture = await Bun.file(join(artifactsDir, `${label}.json`)).json();
                expect(result).toEqual(fixture);
            });
        }
    }
});
