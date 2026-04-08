import type { Msg } from "../message";
import type { Model } from "../model";
import type { Service } from "../types";

import { playChordChanged, playToggle } from "./player";
import { create as createSoundService } from "./sound";

export const service: Service<Model, Msg, Msg> = (model: Model, msg: Msg, raise: (msg: Msg) => void): void => {
    const soundService = createSoundService();
    switch (msg.id) {
        case "TonicChanged":
        case "ModeChanged":
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
            playToggle(model, msg, raise);
            break;
        case "ChordChanged":
            playChordChanged(model, msg, raise);
            break;
        case "Play":
            soundService(model, msg, raise);
            break;
        default: {
            const _exhaustiveCheck: never = msg;
        }
    }
};
