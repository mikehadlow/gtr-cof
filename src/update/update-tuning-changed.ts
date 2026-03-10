import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";

export const Update: UpdateModel<Model, { id: "TuningChanged", index: number }> = (model, msg) => {
    model.state.tuningIndex = msg.index;
    return model;
}
