import * as events from './events';
import { FretboardLabelType } from './types';
import { View, ViewContext, Svg } from "./types";
import { Model } from "./model";
import { Msg } from "./message";

let _raise: ((msg: Msg) => void) | null = null;

export const view: View<Model, Msg, Svg> = ({ state }: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    const setCheckbox = (id: string, checked: boolean): void => {
        const checkbox = <HTMLInputElement>document.getElementById(id)
        checkbox.checked = checked;
    }
    if (ctx.init) {
        setCheckbox("left-handed-checkbox", state.isLeftHanded);
        setCheckbox("flip-nut-checkbox", state.isNutFlipped);
        setCheckbox("set-c-to-noon-checkbox", state.circleIsCNoon);

        const selected = "fb-note-text-" + state.fretboardLabelType;
        const radio = <HTMLInputElement>document.getElementById(selected);
        radio.checked = true;
        _raise = raise;
    }
}

// TODO: remove
export function init(): void {
}

export function onLeftHandedClick(e: HTMLInputElement) {
    console.log(`Event handler: is left handed: ${e.checked}`)
    if (_raise) {
        _raise({ id: "LeftHandedFretboard", isLeftHanded: e.checked })
    }
}

export function onFlipNut(e: HTMLInputElement) {
    if (_raise) {
        _raise({ id: "FlipNut", isNutFlipped: e.checked })
    }
}

export function onSetCToNoon(e: HTMLInputElement) {
    if (_raise) {
        _raise({ id: "SetCToNoon", isC: e.checked })
    }
}

export function onFbNoteTextClick(e: HTMLInputElement) {
    if (_raise) {
        _raise({ id: "FretboardLabelChange", labelType: e.value as FretboardLabelType })
    }
}
