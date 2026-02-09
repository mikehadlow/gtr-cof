import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import { updateScale } from ".";

export const Update: UpdateModel<Model, { id: "ChordChanged", chordIndex: number }> = (model, msg) => {
    const current = model.state;
    // if the user is clicking on the same chord, then toggle it off.
    if (msg.chordIndex === current.chordIndex) {
        current.chordIndex = -1
    }
    else {
        current.chordIndex = msg.chordIndex;
    }
    // un-toggle any previously selected notes
    current.toggledIndexes = 0;
    return updateScale(current);
}
