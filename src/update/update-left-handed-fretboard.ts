import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";

export const Update: UpdateModel<Model, { id: "LeftHandedFretboard", isLeftHanded: boolean }> = (model, msg) => {
    return model;
}
