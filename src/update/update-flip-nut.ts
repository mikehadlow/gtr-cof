import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, { id: "FlipNut"; isNutFlipped: boolean }> = (model, msg) => {
    model.state.isNutFlipped = msg.isNutFlipped;
    return model;
};
