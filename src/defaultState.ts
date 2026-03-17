import { State } from './types';

export const defaultState: State = Object.freeze({
    index: 3, // C
    naturalIndex: 3, // C
    chordIndex: -1, // no chord
    chordIntervals: [0, 2, 4], // standard triad
    toggledIndexes: 0, // index bitflag
    scaleFamilyIndex: 0, // diatornic
    modeIndex: 0, // major
    midiToggledIndexes: 0,
    isLeftHanded: false,
    isNutFlipped: false,
    fretboardLabelType: "NoteName",
    circleIsCNoon: true,
    tuningIndex: 0,
} as const satisfies State);
