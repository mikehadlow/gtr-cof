import type { Msg } from "../message";
import type { Model } from "../model";
import type { Service } from "../types";

import { playChordChanged, playModeChanged, playToggle, playTonicChanged } from "./player";
import { create as createSoundService } from "./sound";

const soundService = createSoundService();

export const service: Service<Model, Msg, Msg> = (model: Model, msg: Msg, raise: (msg: Msg) => void): void => {
    switch (msg.id) {
        case "ChordIntervalChange":
        case "ScaleFamilyChange":
        case "TuningChanged":
        case "LeftHandedFretboard":
        case "FlipNut":
        case "FretboardLabelChange":
        case "SetCToNoon":
        case "ModalStateChange":
        case "ToggleSound":
            // Do nothing
            break;
        case "Toggle":
            playToggle(model, msg, raise);
            break;
        case "ChordChanged":
            playChordChanged(model, msg, raise);
            break;
        case "Play":
            soundService(model, msg, raise);
            break;
        case "TonicChanged":
            playTonicChanged(model, msg, raise);
            break;
        case "ModeChanged":
            playModeChanged(model, msg, raise);
            break;
        default: {
            const _exhaustiveCheck: never = msg;
        }
    }
};
