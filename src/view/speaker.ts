import type { Msg } from "../message";
import type { Model } from "../model";
import type { View } from "../types";
import type { RenderNode } from "../ui";

const SPEAKER_BTN_ID = "speaker-btn";
const SPEAKER_ICON_ID = "speaker-icon";

export const create = (): View<Model, Msg, RenderNode> => {
    let uninitialised = true;
    return ({ state }: Model, raise: (msg: Msg) => void): RenderNode[] => {
        const icon = document.getElementById(SPEAKER_ICON_ID);
        if (icon) {
            icon.setAttribute("href", state.sound ? "#icon-speaker-wave" : "#icon-speaker-x");
        }
        if (uninitialised) {
            const btn = document.getElementById(SPEAKER_BTN_ID);
            if (btn) {
                btn.addEventListener("click", () => raise({ id: "ToggleSound" }));
            }
            uninitialised = false;
        }
        return [];
    };
};
