import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, { id: "Toggle", index: number }> = (model, msg) => {
    const current = model.state;
    current.toggledIndexes = current.toggledIndexes ^ 2 ** msg.index;
    return updateScale(current);
}
