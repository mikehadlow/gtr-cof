import type { Msg } from "../../message";
import type { Model } from "../../model";
import type { ModalState, State, View } from "../../types";
import type { RenderNode } from "../../ui";
import { showCircleSettings } from "./circleSettings";
import { showFretboardSettings } from "./fretboardSettings";

const MODAL_BACKDROP_CLASS = "modal-backdrop";
const MODAL_CONTAINER_CLASS = "modal-container";

export const create2 = (): View<Model, Msg, RenderNode> => {
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

export function createSection(titleText?: string): HTMLDivElement {
    const section = document.createElement("div");
    section.className = "modal-section";
    if (titleText) {
        const label = document.createElement("div");
        label.className = "modal-section-title";
        label.textContent = titleText;
        section.appendChild(label);
    }
    return section;
}

function createCheckboxLabel(text: string, checked: boolean): HTMLLabelElement {
    const label = document.createElement("label");
    label.className = "modal-checkbox-label";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${text}`));
    return label;
}

export function createCheckbox(
    modal: HTMLDivElement,
    labelText: string,
    checkboxState: boolean,
    onClick: (isChecked: boolean) => void,
) {
    const section = createSection();
    const label = createCheckboxLabel(labelText, checkboxState);
    const checkbox = label.querySelector("input")!;
    checkbox.addEventListener("change", () => onClick((checkbox as HTMLInputElement).checked));
    section.appendChild(label);
    modal.appendChild(section);
}

export function createModal(modalTitle: string, raise: (msg: Msg) => void): HTMLDivElement {
    const backdrop = document.createElement("div");
    backdrop.className = MODAL_BACKDROP_CLASS;
    backdrop.addEventListener("click", () => raise({ id: "ModalStateChange", modalState: "closed" }));

    const modal = document.createElement("div");
    modal.className = MODAL_CONTAINER_CLASS;
    modal.addEventListener("click", (e) => e.stopPropagation());

    // Header
    const header = document.createElement("div");
    header.className = "modal-header";
    const title = document.createElement("span");
    title.textContent = modalTitle;
    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close";
    closeBtn.textContent = "\u00d7";
    closeBtn.addEventListener("click", () => raise({ id: "ModalStateChange", modalState: "closed" }));
    header.appendChild(title);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    return modal;
}
