import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, { id: "LeftHandedFretboard"; isLeftHanded: boolean }> = (model, msg) => {
    model.state.isLeftHanded = msg.isLeftHanded;
    return model;
};
