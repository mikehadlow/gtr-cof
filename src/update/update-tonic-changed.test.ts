import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import type { Model } from "../model";
import * as music from "../music";
import type { State } from "../types";
import { Update } from "./update-tonic-changed";

function makeInputModel(): Model {
    const state: State = {
        index: 3,
        naturalIndex: 3,
        chordIndex: -1,
        chordIntervals: [0, 2, 4],
        toggledNotesBitmask: 0,
        scaleFamilyIndex: 0,
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

const suffixes = [
    { offset: -1, suffix: "flat" },
    { offset: 0, suffix: "natural" },
    { offset: 1, suffix: "sharp" },
] as const;

const artifactsDir = join(import.meta.dir, "test-artifacts", "tonic-changed");

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
