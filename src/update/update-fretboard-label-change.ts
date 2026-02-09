import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import type { FretboardLabelType } from '../types';

export const Update: UpdateModel<Model, { id: "FretboardLabelChange", labelType: FretboardLabelType }> = (model, msg) => {
    return model;
}
