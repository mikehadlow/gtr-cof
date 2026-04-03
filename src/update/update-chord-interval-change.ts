import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, { id: "ChordIntervalChange"; chordIntervals: number[] }> = (model, msg) => {
    const current = model.state;
    current.chordIntervals = msg.chordIntervals;
    if (current.chordIndex !== -1) {
        current.toggledNotesBitmask = 0;
    }
    return updateScale(current);
};
