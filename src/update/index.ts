import { type Update as UpdateModel, State } from "../types";
import { type Model } from "../model";
import { type Msg } from "../message";
import * as music from '../music';

import { Update as UpdateTonicChanged } from "./update-tonic-changed";
import { Update as UpdateModeChanged } from "./update-mode-changed";
import { Update as UpdateChordChanged } from "./update-chord-changed";
import { Update as UpdateToggle } from "./update-toggle";
import { Update as UpdateChordIntervalChange } from "./update-chord-interval-change";
import { Update as UpdateScaleFamilyChange } from "./update-scale-family-change";
import { Update as UpdateTuningChanged } from "./update-tuning-changed";
import { Update as UpdateLeftHandedFretboard } from "./update-left-handed-fretboard";
import { Update as UpdateFlipNut } from "./update-flip-nut";
import { Update as UpdateFretboardLabelChange } from "./update-fretboard-label-change";
import { Update as UpdateMidiNote } from "./update-midi-note";
import { Update as UpdateSetCToNoon } from "./update-set-c-to-noon";

export const Update: UpdateModel<Model, Msg> = (model: Model, msg: Msg): Model => {
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
        case "MidiNote":
            return UpdateMidiNote(model, msg);
        case "SetCToNoon":
            return UpdateSetCToNoon(model, msg);
        default:
            const _exhaustiveCheck: never = msg;
            return _exhaustiveCheck;
    }
}

export const updateScale = (current: State): Model => {
    const scaleFamily = music.scaleFamily.find(x => x.index == current.scaleFamilyIndex);
    if (!scaleFamily) {
        throw "scaleFamily is " + scaleFamily + ", current.scaleFamilyIndex = " + current.scaleFamilyIndex;
    }
    const mode = scaleFamily.modes.find(x => x.index == current.modeIndex);
    if (!mode) {
        throw "mode is " + mode + "current.modeIndex" + current.modeIndex;
    }
    const noteSpec = music.createNoteSpec(current.naturalIndex, current.index);

    const nodes = music.generateScaleShim(
        noteSpec,
        mode,
        current.chordIndex,
        current.chordIntervals,
        current.toggledIndexes,
        current.midiToggledIndexes,
        scaleFamily);

    // update togges, because a chord may have been generated.
    current.toggledIndexes = nodes
        .filter(x => x.toggle)
        .map(x => x.scaleNote.note.index)
        .reduce((a, b) => a + 2 ** b, 0);

    return {
        music: {
            nodes: nodes,
            mode: mode
        },
        state: current
    }
}
