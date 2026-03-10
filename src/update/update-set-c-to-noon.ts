import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";

export const Update: UpdateModel<Model, { id: "SetCToNoon", isC: boolean }> = (model, msg) => {
    model.state.circleIsCNoon = msg.isC;
    return model;
}
