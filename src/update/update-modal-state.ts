import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, Extract<Msg, { id: "ModalStateChange" }>> = (model, msg) => {
    model.state.modalState = msg.modalState;
    return model;
};
