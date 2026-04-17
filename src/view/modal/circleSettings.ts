import type { Msg } from "../../message";
import type { State } from "../../types";
import { applyTheme, createCheckbox, createModal, getTheme } from "./common";

export function showCircleSettings(state: State, raise: (msg: Msg) => void) {
    const modal = createModal("Circle Settings", raise);
    createCheckbox(modal, "Set C To Noon", state.circleIsCNoon, (isChecked) =>
        raise({ id: "SetCToNoon", isC: isChecked }),
    );
    createCheckbox(modal, "Dark Mode", getTheme() === "dark", (isChecked) =>
        applyTheme(isChecked ? "dark" : "light"),
    );
}
