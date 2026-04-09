import type { Msg } from "../message";
import type { Model } from "../model";
import type { FretboardLabelType, View } from "../types";
import type { RenderNode } from "../ui";

type Raise = (msg: Msg) => void;
type Theme = "light" | "dark";

const LH_CHKBOX_ID = "left-handed-checkbox";
const FLIPNUT_CHKBOX_ID = "flip-nut-checkbox";
const CNOON_CHKBOX_ID = "set-c-to-noon-checkbox";
const DARKMODE_CHKBOX_ID = "dark-mode-checkbox";
const THEME_STORAGE_KEY = "app_theme";

const FB_NT_NONE_ID = "fb-note-text-None";
const FB_NT_NAME_ID = "fb-note-text-NoteName";
const FB_NT_INT_ID = "fb-note-text-Interval";

export const create = (): View<Model, Msg, RenderNode> => {
    let uninitialised = true;
    return ({ state }: Model, raise: (msg: Msg) => void): RenderNode[] => {
        const setCheckbox = (id: string, checked: boolean): void => {
            const checkbox = document.getElementById(id) as HTMLInputElement | null;
            if (checkbox === null) {
                throw new Error(`checkbox with id '${id}' not found.`);
            }
            checkbox.checked = checked;
        };
        const setClickHandler = (id: string, handler: (e: HTMLInputElement, raise: Raise) => void) => {
            const element = document.getElementById(id) as HTMLInputElement;
            element.onclick = (x) => handler(x.currentTarget as HTMLInputElement, raise);
        };
        const setThemeHandler = (id: string) => {
            const element = document.getElementById(id) as HTMLInputElement;
            element.onclick = (x) => onDarkModeClick(x.currentTarget as HTMLInputElement);
        };
        setCheckbox("left-handed-checkbox", state.isLeftHanded);
        setCheckbox("flip-nut-checkbox", state.isNutFlipped);
        setCheckbox("set-c-to-noon-checkbox", state.circleIsCNoon);
        setCheckbox("dark-mode-checkbox", getTheme() === "dark");

        const selected = `fb-note-text-${state.fretboardLabelType}`;
        setCheckbox(selected, true);
        if (uninitialised) {
            setClickHandler(LH_CHKBOX_ID, onLeftHandedClick);
            setClickHandler(FLIPNUT_CHKBOX_ID, onFlipNut);
            setClickHandler(CNOON_CHKBOX_ID, onSetCToNoon);
            setThemeHandler(DARKMODE_CHKBOX_ID);
            setClickHandler(FB_NT_NONE_ID, onFbNoteTextClick);
            setClickHandler(FB_NT_NAME_ID, onFbNoteTextClick);
            setClickHandler(FB_NT_INT_ID, onFbNoteTextClick);
            uninitialised = false;
        }
        return [];
    };
};

function onLeftHandedClick(e: HTMLInputElement, raise: Raise) {
    raise({ id: "LeftHandedFretboard", isLeftHanded: e.checked });
}

function onFlipNut(e: HTMLInputElement, raise: Raise) {
    raise({ id: "FlipNut", isNutFlipped: e.checked });
}

function onSetCToNoon(e: HTMLInputElement, raise: Raise) {
    raise({ id: "SetCToNoon", isC: e.checked });
}

function onFbNoteTextClick(e: HTMLInputElement, raise: Raise) {
    raise({ id: "FretboardLabelChange", labelType: e.value as FretboardLabelType });
}

function getTheme(): Theme {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme): void {
    document.documentElement.setAttribute("data-theme", theme);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
}

function onDarkModeClick(e: HTMLInputElement) {
    applyTheme(e.checked ? "dark" : "light");
}
