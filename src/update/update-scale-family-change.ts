import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, Extract<Msg, { id: "ScaleFamilyChange" }>> = (model, msg) => {
    const current = model.state;
    current.scaleFamilyIndex = msg.scaleFamily.index;
    current.modeIndex = msg.scaleFamily.defaultModeIndex;
    current.chordIndex = -1;
    return updateScale(current);
};
