import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";

export const Update: UpdateModel<Model, { id: "Toggle", index: number }> = (model, msg) => {
    return model;
}
