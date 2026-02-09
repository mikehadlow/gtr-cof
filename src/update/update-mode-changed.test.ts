import { describe, test, expect } from "bun:test";
import { join } from "path";
import * as music from "../music";
import { Update } from "./update-mode-changed";
import { type State } from "../types";
import { type Model } from "../model";

function makeInputModel(scaleFamilyIndex: number): Model {
    const sf = music.scaleFamily[scaleFamilyIndex];
    const defaultMode = sf.modes.find(x => x.index === sf.defaultModeIndex)!;

    const state: State = {
        index: 3,
        naturalIndex: 3,
        chordIndex: -1,
        chordIntervals: [0, 2, 4],
        toggledIndexes: 0,
        scaleFamilyIndex,
        modeIndex: defaultMode.index,
        midiToggledIndexes: 0,
        isLeftHanded: false,
        isNutFlipped: false,
        fretboardLabelType: "NoteName",
        circleIsCNoon: true,
        tuningIndex: 0,
    };

    const noteSpec = music.createNoteSpec(state.naturalIndex, state.index);
    const nodes = music.generateScaleShim(
        noteSpec, defaultMode, state.chordIndex, state.chordIntervals,
        state.toggledIndexes, state.midiToggledIndexes, sf
    );

    return {
        music: { nodes, mode: defaultMode },
        state,
    };
}

const artifactsDir = join(import.meta.dir, "test-artifacts", "mode-changed");

describe("update-mode-changed", () => {
    for (const sf of music.scaleFamily) {
        for (const mode of sf.modes) {
            const safeName = mode.name.replace(/[^a-zA-Z0-9-]/g, "_");
            const label = `${sf.name}-${safeName}`;

            test(label, async () => {
                const model = makeInputModel(sf.index);
                const msg = { id: "ModeChanged" as const, mode };
                const result = Update(model, msg);

                const fixture = await Bun.file(join(artifactsDir, `${label}.json`)).json();
                expect(result).toEqual(fixture);
            });
        }
    }
});
