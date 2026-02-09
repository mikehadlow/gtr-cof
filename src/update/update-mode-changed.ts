import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import * as music from '../music';
import { updateScale } from "./index";

export const Update: UpdateModel<Model, { id: "ModeChanged", mode: music.Mode }> = (model, msg) => {
    const current = model.state;
    current.modeIndex = msg.mode.index;
    current.chordIndex = -1;
    return updateScale(current);
}
