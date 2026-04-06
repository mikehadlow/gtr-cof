import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, Extract<Msg, { id: "MidiNote" }>> = (model, msg) => {
    model.state.midiToggledNotesBitmask = msg.toggledIndexes;
    return updateScale(model.state);
};
