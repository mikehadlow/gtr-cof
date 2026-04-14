import type { Model } from "../model";
import * as music from "../music";
import type { State } from "../types";

export const updateScale = (state: State): Model => {
    const scaleFamily = music.scaleFamily.find((x) => x.index === state.scaleFamilyIndex);
    if (!scaleFamily) {
        throw new Error(`Invalid scaleFamilyIndex, current.scaleFamilyIndex = ${state.scaleFamilyIndex}`);
    }
    const mode = scaleFamily.modes.find((x) => x.index === state.modeIndex);
    if (!mode) {
        throw new Error(`Invalid modeIndex, current.modeIndex = ${state.modeIndex}`);
    }
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

    // update toggles, because a chord may have been generated.
    state.toggledNotesBitmask = nodes
        .filter((x) => x.toggle)
        .map((x) => x.scaleNote.note.index)
        .reduce((a, b) => a + 2 ** b, 0);

    return {
        music: {
            nodes: nodes,
            mode: mode,
        },
        state,
    };
};
