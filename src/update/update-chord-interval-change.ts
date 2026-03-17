import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, { id: "ChordIntervalChange", chordIntervals: number[] }> = (model, msg) => {
    const current = model.state;
    current.chordIntervals = msg.chordIntervals;
    current.toggledNotesBitmask = 0;
    return updateScale(current);
}
