import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, Extract<Msg, { id: "ToggleSound" }>> = (model, _msg) => {
    model.state.sound = !model.state.sound;
    return model;
};
