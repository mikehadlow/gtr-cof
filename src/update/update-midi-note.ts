import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, { id: "MidiNote", toggledIndexes: number }> = (model, msg) => {
    model.state.midiToggledNotesBitmask = msg.toggledIndexes;
    return updateScale(model.state);
}
