import type { Msg } from "../../message";
import type { Model } from "../../model";
import type { ModalState, State, View } from "../../types";
import type { RenderNode } from "../../ui";
import { showCircleSettings } from "./circleSettings";
import { showFretboardSettings } from "./fretboardSettings";

const MODAL_BACKDROP_CLASS = "modal-backdrop";

export const create = (): View<Model, Msg, RenderNode> => {
    let previousState: ModalState = "closed";
    return ({ state }: Model, raise: (msg: Msg) => void): RenderNode[] => {
        if (state.modalState === previousState) {
            return []; // no modal state change.
        }
        switch (state.modalState) {
            case "closed":
                removeExistingModal();
                break;
            case "guitar-settings":
                showModal(state, raise);
                break;
            case "circle-settings":
                showModal(state, raise);
                break;
            default: {
                const _exhaustiveCheck: never = state.modalState;
            }
        }
        previousState = state.modalState;
        return [];
    };
};

function removeExistingModal(): boolean {
    const existing = document.querySelector(`.${MODAL_BACKDROP_CLASS}`);
    if (existing) {
        existing.remove();
        return true;
    }
    return false;
}

function showModal(state: State, raise: (msg: Msg) => void): void {
    switch (state.modalState) {
        case "closed":
            // do nothing this sould never be invoked
            break;
        case "guitar-settings":
            showFretboardSettings(state, raise);
            break;
        case "circle-settings":
            showCircleSettings(state, raise);
            break;
        default: {
            const _exhaustiveCheck: never = state.modalState;
        }
    }
}
