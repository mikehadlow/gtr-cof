import * as events from './events';
import { FretboardLabelType } from './types';

export function init(): void {
    events.leftHandedChange.subscribe(e => {
        const checkbox = <HTMLInputElement>document.getElementById("left-handed-checkbox")
        checkbox.checked = e.isLeftHanded;
    });
    events.flipNutChange.subscribe(e => {
        const checkbox = <HTMLInputElement>document.getElementById("flip-nut-checkbox")
        checkbox.checked = e.isNutFlipped;
    });
    events.setCToNoon.subscribe(e => {
        const checkbox = <HTMLInputElement>document.getElementById("set-c-to-noon-checkbox")
        checkbox.checked = e.isC;
    });
    events.fretboardLabelChange.subscribe(e => {
        const selected = "fb-note-text-" + String(e.labelType);
        const radio = <HTMLInputElement>document.getElementById(selected);
        radio.checked = true;
    });
}

export function onLeftHandedClick(e: HTMLInputElement) {
    events.leftHandedChange.publish({ isLeftHanded: e.checked });
}

export function onFlipNut(e: HTMLInputElement) {
    events.flipNutChange.publish({ isNutFlipped: e.checked });
}

export function onSetCToNoon(e: HTMLInputElement) {
    events.setCToNoon.publish({ isC: e.checked });
}

export function onFbNoteTextClick(e: HTMLInputElement) {
    events.fretboardLabelChange.publish({ labelType: e.value as FretboardLabelType })
}
