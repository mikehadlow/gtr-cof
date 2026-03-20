import type { Model } from "../model";
import type { FretboardLabelType, Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, { id: "FretboardLabelChange"; labelType: FretboardLabelType }> = (
    model,
    msg,
) => {
    model.state.fretboardLabelType = msg.labelType;
    return model;
};
