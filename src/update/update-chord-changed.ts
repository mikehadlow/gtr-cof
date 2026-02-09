import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";

export const Update: UpdateModel<Model, { id: "ChordChanged", chordIndex: number }> = (model, msg) => {
    return model;
}
