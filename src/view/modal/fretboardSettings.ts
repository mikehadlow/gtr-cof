import type { Msg } from "../../message";
import type { FretboardLabelType, State } from "../../types";
import { tunings } from "../tuning";
import { createCheckbox, createModal, createSection } from "./common";

export function showFretboardSettings(state: State, raise: (msg: Msg) => void) {
    const modal = createModal("Fretboard Settings", raise);

    // Tuning
    {
        const tuningSection = createSection("Tuning");
        const select = document.createElement("select");
        select.className = "modal-select";
        for (const t of tunings) {
            const opt = document.createElement("option");
            opt.value = String(t.index);
            opt.textContent = `${t.tuning}  ${t.description}`;
            if (t.index === state.tuningIndex) {
                opt.selected = true;
            }
            select.appendChild(opt);
        }
        select.addEventListener("change", () => {
            raise({ id: "TuningChanged", index: parseInt(select.value, 10) });
        });
        tuningSection.appendChild(select);
        modal.appendChild(tuningSection);
    }

    // Left Handed
    createCheckbox(modal, "Left Handed", state.isLeftHanded, (isChecked) =>
        raise({ id: "LeftHandedFretboard", isLeftHanded: isChecked }),
    );

    // Flip Nut
    createCheckbox(modal, "Flip Nut", state.isNutFlipped, (isChecked) =>
        raise({ id: "FlipNut", isNutFlipped: isChecked }),
    );

    // Note Labels
    {
        const nlSection = createSection("Note Labels");
        const labelOptions: Array<{ label: string; value: FretboardLabelType }> = [
            { label: "None", value: "None" },
            { label: "Note Names", value: "NoteName" },
            { label: "Intervals", value: "Interval" },
        ];
        for (const opt of labelOptions) {
            const radioLabel = document.createElement("label");
            radioLabel.className = "modal-radio-label";
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "modal-fb-note-text";
            radio.value = opt.value;
            radio.checked = state.fretboardLabelType === opt.value;
            radio.addEventListener("change", () => {
                raise({ id: "FretboardLabelChange", labelType: opt.value });
            });
            radioLabel.appendChild(radio);
            radioLabel.appendChild(document.createTextNode(` ${opt.label}`));
            nlSection.appendChild(radioLabel);
        }
        modal.appendChild(nlSection);
    }
}
