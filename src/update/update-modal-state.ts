import type { Model } from "../model";
import type { ModalState, Update as UpdateModel } from "../types";

export const Update: UpdateModel<Model, { id: "ModalStateChange"; modalState: ModalState }> = (model, msg) => {
    model.state.modalState = msg.modalState;
    return model;
};
