import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, Extract<Msg, { id: "FlipNut" }>> = (model, msg) => {
    model.state.isNutFlipped = msg.isNutFlipped;
    return model;
};
