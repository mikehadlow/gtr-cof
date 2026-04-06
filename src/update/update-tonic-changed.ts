import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";
import { updateScale } from "./updateScale";

export const Update: UpdateModel<Model, Extract<Msg, { id: "TonicChanged" }>> = (model, msg) => {
    const current = model.state;

    current.index = msg.noteSpec.index;
    current.naturalIndex = msg.noteSpec.natural.index;
    current.chordIndex = -1;
    return updateScale(current);
};
