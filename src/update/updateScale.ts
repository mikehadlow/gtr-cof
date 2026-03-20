import type { Model } from "../model";
import * as music from "../music";
import type { State } from "../types";

export const updateScale = (current: State): Model => {
    const scaleFamily = music.scaleFamily.find((x) => x.index === current.scaleFamilyIndex);
    if (!scaleFamily) {
        throw new Error(`Invalid scaleFamilyIndex, current.scaleFamilyIndex = ${current.scaleFamilyIndex}`);
    }
    const mode = scaleFamily.modes.find((x) => x.index === current.modeIndex);
    if (!mode) {
        throw new Error(`Invalid modeIndex, current.modeIndex = ${current.modeIndex}`);
    }
    const noteSpec = music.createNoteSpec(current.naturalIndex, current.index);

    const nodes = music.generateScaleShim(
        noteSpec,
        mode,
        current.chordIndex,
        current.chordIntervals,
        current.toggledNotesBitmask,
        current.midiToggledNotesBitmask,
        scaleFamily,
    );

    // update toggles, because a chord may have been generated.
    current.toggledNotesBitmask = nodes
        .filter((x) => x.toggle)
        .map((x) => x.scaleNote.note.index)
        .reduce((a, b) => a + 2 ** b, 0);

    return {
        music: {
            nodes: nodes,
            mode: mode,
        },
        state: current,
    };
};
