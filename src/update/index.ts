import type { Msg } from "../message";
import type { Model } from "../model";
import type { Update as UpdateModel } from "../types";
import { Update as UpdateChordChanged } from "./update-chord-changed";
import { Update as UpdateChordIntervalChange } from "./update-chord-interval-change";
import { Update as UpdateFlipNut } from "./update-flip-nut";
import { Update as UpdateFretboardLabelChange } from "./update-fretboard-label-change";
import { Update as UpdateLeftHandedFretboard } from "./update-left-handed-fretboard";
import { Update as UpdateModalState } from "./update-modal-state";
import { Update as UpdateModeChanged } from "./update-mode-changed";
import { Update as UpdateScaleFamilyChange } from "./update-scale-family-change";
import { Update as UpdateSetCToNoon } from "./update-set-c-to-noon";
import { Update as UpdateToggle } from "./update-toggle";
import { Update as UpdateTonicChanged } from "./update-tonic-changed";
import { Update as UpdateTuningChanged } from "./update-tuning-changed";

export { updateScale } from "./updateScale";

export const update: UpdateModel<Model, Msg> = (model: Model, msg: Msg): Model => {
    switch (msg.id) {
        case "TonicChanged":
            return UpdateTonicChanged(model, msg);
        case "ModeChanged":
            return UpdateModeChanged(model, msg);
        case "ChordChanged":
            return UpdateChordChanged(model, msg);
        case "Toggle":
            return UpdateToggle(model, msg);
        case "ChordIntervalChange":
            return UpdateChordIntervalChange(model, msg);
        case "ScaleFamilyChange":
            return UpdateScaleFamilyChange(model, msg);
        case "TuningChanged":
            return UpdateTuningChanged(model, msg);
        case "LeftHandedFretboard":
            return UpdateLeftHandedFretboard(model, msg);
        case "FlipNut":
            return UpdateFlipNut(model, msg);
        case "FretboardLabelChange":
            return UpdateFretboardLabelChange(model, msg);
        case "SetCToNoon":
            return UpdateSetCToNoon(model, msg);
        case "ModalStateChange":
            return UpdateModalState(model, msg);
        case "Play":
            // TODO: visual representation of played notes
            return model;
        default: {
            const _exhaustiveCheck: never = msg;
            return _exhaustiveCheck;
        }
    }
};
