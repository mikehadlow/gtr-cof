export type FretboardLabelType = "None" | "NoteName" | "Interval";

export type State = {
    index: number;
    naturalIndex: number;
    chordIndex: number;
    chordIntervals: number[];
    toggledIndexes: number;
    scaleFamilyIndex: number;
    modeIndex: number;
    midiToggledIndexes: number;
    isLeftHanded: boolean;
    isNutFlipped: boolean;
    fretboardLabelType: FretboardLabelType;
    circleIsCNoon: boolean;
    tuningIndex: number;
};
