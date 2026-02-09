import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import * as music from '../music';

export const Update: UpdateModel<Model, { id: "ScaleFamilyChange", scaleFamily: music.ScaleFamily }> = (model, msg) => {
    return model;
}
