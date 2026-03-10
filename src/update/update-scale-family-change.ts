import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import * as music from '../music';
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, { id: "ScaleFamilyChange", scaleFamily: music.ScaleFamily }> = (model, msg) => {
    const current = model.state;
    current.scaleFamilyIndex = msg.scaleFamily.index;
    current.modeIndex = msg.scaleFamily.defaultModeIndex;
    current.chordIndex = -1
    return updateScale(current);
}
