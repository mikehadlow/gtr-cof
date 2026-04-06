import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, Extract<Msg, { id: "Toggle" }>> = (model, msg) => {
    const current = model.state;
    current.toggledNotesBitmask = current.toggledNotesBitmask ^ (2 ** msg.index);
    return updateScale(current);
};
