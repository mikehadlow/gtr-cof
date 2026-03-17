import { FretboardLabelType } from './types';
import { View, ViewContext, Svg } from "./types";
import { Model } from "./model";
import { Msg } from "./message";

type Raise = (msg: Msg) => void;

const LH_CHKBOX_ID = "left-handed-checkbox";
const FLIPNUT_CHKBOX_ID = "flip-nut-checkbox";
const CNOON_CHKBOX_ID = "set-c-to-noon-checkbox";

const FB_NT_NONE_ID = "fb-note-text-None";
const FB_NT_NAME_ID = "fb-note-text-NoteName";
const FB_NT_INT_ID = "fb-note-text-Interval";

export const view: View<Model, Msg, Svg> = ({ state }: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    const setCheckbox = (id: string, checked: boolean): void => {
        const checkbox = <HTMLInputElement>document.getElementById(id)
        checkbox.checked = checked;
    }
    const setClickHandler = (id: string, handler: (e: HTMLInputElement, raise: Raise) => void) => {
        const element = document.getElementById(id) as HTMLInputElement;
        element.onclick = (x) => handler(x.currentTarget as HTMLInputElement, raise);
    }
    if (ctx.init) {
        setCheckbox("left-handed-checkbox", state.isLeftHanded);
        setCheckbox("flip-nut-checkbox", state.isNutFlipped);
        setCheckbox("set-c-to-noon-checkbox", state.circleIsCNoon);

        const selected = "fb-note-text-" + state.fretboardLabelType;
        const radio = <HTMLInputElement>document.getElementById(selected);
        radio.checked = true;

        setClickHandler(LH_CHKBOX_ID, onLeftHandedClick);
        setClickHandler(FLIPNUT_CHKBOX_ID, onFlipNut);
        setClickHandler(CNOON_CHKBOX_ID, onSetCToNoon);
        setClickHandler(FB_NT_NONE_ID, onFbNoteTextClick);
        setClickHandler(FB_NT_NAME_ID, onFbNoteTextClick);
        setClickHandler(FB_NT_INT_ID, onFbNoteTextClick);
    }
}

function onLeftHandedClick(e: HTMLInputElement, raise: Raise) {
    raise({ id: "LeftHandedFretboard", isLeftHanded: e.checked })
}

function onFlipNut(e: HTMLInputElement, raise: Raise) {
    raise({ id: "FlipNut", isNutFlipped: e.checked })
}

function onSetCToNoon(e: HTMLInputElement, raise: Raise) {
    raise({ id: "SetCToNoon", isC: e.checked })
}

function onFbNoteTextClick(e: HTMLInputElement, raise: Raise) {
    raise({ id: "FretboardLabelChange", labelType: e.value as FretboardLabelType })
}
