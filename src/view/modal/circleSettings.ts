import type { Msg } from "../../message";
import type { State } from "../../types";
import { createCheckbox, createModal } from ".";

export function showCircleSettings(state: State, raise: (msg: Msg) => void) {
    const modal = createModal("Circle Settings", raise);
    createCheckbox(modal, "Set C To Noon", state.circleIsCNoon, (isChecked) =>
        raise({ id: "SetCToNoon", isC: isChecked }),
    );
}
