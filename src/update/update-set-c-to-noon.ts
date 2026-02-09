import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";

export const Update: UpdateModel<Model, { id: "SetCToNoon", isC: boolean }> = (model, msg) => {
    return model;
}
