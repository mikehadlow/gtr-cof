import type { Msg } from "../../message";

const MODAL_BACKDROP_CLASS = "modal-backdrop";
const MODAL_CONTAINER_CLASS = "modal-container";
const THEME_STORAGE_KEY = "app_theme";

export type Theme = "light" | "dark";

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

export function getTheme(): Theme {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
    document.documentElement.setAttribute("data-theme", theme);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
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
