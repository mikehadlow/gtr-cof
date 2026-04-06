import type { Msg } from "../message";
import type { Model } from "../model";
import type { Service } from "../types";

import { service as playerService } from "./player";

export const service: Service<Model, Msg, Msg> = (model: Model, msg: Msg, raise: (msg: Msg) => void): void => {
    switch (msg.id) {
        case "TonicChanged":
        case "ModeChanged":
        case "ChordChanged":
        case "ChordIntervalChange":
        case "ScaleFamilyChange":
        case "TuningChanged":
        case "LeftHandedFretboard":
        case "FlipNut":
        case "FretboardLabelChange":
        case "MidiNote":
        case "SetCToNoon":
        case "ModalStateChange":
            // Do nothing
            break;
        case "Toggle":
            playerService(model, msg, raise);
            break;
        case "Play":
            break;
        default: {
            const _exhaustiveCheck: never = msg;
        }
    }
};
