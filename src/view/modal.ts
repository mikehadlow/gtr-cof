import { tunings } from './tuning';
import type { State, FretboardLabelType, ModalState } from '../types';
import type { Msg } from '../message';
import { type View, ViewContext, type Svg } from "../types";
import type { Model } from "../model";

const MODAL_BACKDROP_CLASS = 'modal-backdrop';
const MODAL_CONTAINER_CLASS = 'modal-container';

export const create = (): View<Model, Msg, Svg> => {
    let previousState: ModalState = "closed";
    return ({ state }: Model, _ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
        if (state.modalState === previousState) {
            return; // no modal state change.
        }
        switch (state.modalState) {
            case "closed":
                removeExistingModal();
                break;
            case "guitar-settings":
                showFretboardSettingsModal(state, raise);
                break;
            default:
                const _exhaustiveCheck: never = state.modalState;
        }
        previousState = state.modalState;
    }
}

function removeExistingModal(): boolean {
    const existing = document.querySelector(`.${MODAL_BACKDROP_CLASS}`);
    if (existing) {
        existing.remove();
        return true;
    }
    return false;
}

function showFretboardSettingsModal(state: State, raise: (msg: Msg) => void): void {
    if (removeExistingModal()) return;

    const backdrop = document.createElement('div');
    backdrop.className = MODAL_BACKDROP_CLASS;
    backdrop.addEventListener('click', () => raise({ id: "ModalStateChange", modalState: "closed" }));

    const modal = document.createElement('div');
    modal.className = MODAL_CONTAINER_CLASS;
    modal.addEventListener('click', e => e.stopPropagation());

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    const title = document.createElement('span');
    title.textContent = 'Fretboard Settings';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.textContent = '\u00d7';
    closeBtn.addEventListener('click', () => raise({ id: "ModalStateChange", modalState: "closed" }));
    header.appendChild(title);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    // Tuning
    const tuningSection = createSection('Tuning');
    const select = document.createElement('select');
    select.className = 'modal-select';
    for (const t of tunings) {
        const opt = document.createElement('option');
        opt.value = String(t.index);
        opt.textContent = `${t.tuning}  ${t.description}`;
        if (t.index === state.tuningIndex) opt.selected = true;
        select.appendChild(opt);
    }
    select.addEventListener('change', () => {
        raise({ id: 'TuningChanged', index: parseInt(select.value) });
    });
    tuningSection.appendChild(select);
    modal.appendChild(tuningSection);

    // Left Handed
    const lhSection = createSection();
    const lhLabel = createCheckboxLabel('Left Handed', state.isLeftHanded);
    const lhCheckbox = lhLabel.querySelector('input')!;
    lhCheckbox.addEventListener('change', () => {
        raise({ id: 'LeftHandedFretboard', isLeftHanded: (lhCheckbox as HTMLInputElement).checked });
    });
    lhSection.appendChild(lhLabel);
    modal.appendChild(lhSection);

    // Flip Nut
    const fnSection = createSection();
    const fnLabel = createCheckboxLabel('Flip Nut', state.isNutFlipped);
    const fnCheckbox = fnLabel.querySelector('input')!;
    fnCheckbox.addEventListener('change', () => {
        raise({ id: 'FlipNut', isNutFlipped: (fnCheckbox as HTMLInputElement).checked });
    });
    fnSection.appendChild(fnLabel);
    modal.appendChild(fnSection);

    // Note Labels
    const nlSection = createSection('Note Labels');
    const labelOptions: Array<{ label: string; value: FretboardLabelType }> = [
        { label: 'None', value: 'None' },
        { label: 'Note Names', value: 'NoteName' },
        { label: 'Intervals', value: 'Interval' },
    ];
    for (const opt of labelOptions) {
        const radioLabel = document.createElement('label');
        radioLabel.className = 'modal-radio-label';
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'modal-fb-note-text';
        radio.value = opt.value;
        radio.checked = state.fretboardLabelType === opt.value;
        radio.addEventListener('change', () => {
            raise({ id: 'FretboardLabelChange', labelType: opt.value });
        });
        radioLabel.appendChild(radio);
        radioLabel.appendChild(document.createTextNode(' ' + opt.label));
        nlSection.appendChild(radioLabel);
    }
    modal.appendChild(nlSection);

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
}

function createSection(titleText?: string): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'modal-section';
    if (titleText) {
        const label = document.createElement('div');
        label.className = 'modal-section-title';
        label.textContent = titleText;
        section.appendChild(label);
    }
    return section;
}

function createCheckboxLabel(text: string, checked: boolean): HTMLLabelElement {
    const label = document.createElement('label');
    label.className = 'modal-checkbox-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + text));
    return label;
}
