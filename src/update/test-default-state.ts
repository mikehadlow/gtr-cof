import { type State } from "../types";

export const defaultState: State = {
    index: 0,
    naturalIndex: 0,
    chordIndex: -1,
    chordIntervals: [0, 2, 4],
    toggledIndexes: 0,
    scaleFamilyIndex: 0,
    modeIndex: 0,
    midiToggledIndexes: 0,
    isLeftHanded: false,
    isNutFlipped: false,
    fretboardLabelType: "NoteName",
    circleIsCNoon: true,
    tuningIndex: 0,
};
