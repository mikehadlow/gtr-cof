import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, Extract<Msg, { id: "FretboardLabelChange" }>> = (model, msg) => {
    model.state.fretboardLabelType = msg.labelType;
    return model;
};
