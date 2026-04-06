import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, Extract<Msg, { id: "LeftHandedFretboard" }>> = (model, msg) => {
    model.state.isLeftHanded = msg.isLeftHanded;
    return model;
};
