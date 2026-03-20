import { type Update as UpdateModel, ModalState } from "../types";
import { type Model } from "../model";

export const Update: UpdateModel<Model, { id: "ModalStateChange", modalState: ModalState }> = (model, msg) => {
    model.state.modalState = msg.modalState;
    return model;
}
