import { State, StateSchema } from './types';
import { View, ViewContext, Svg } from "./types";
import { Model } from "./model";
import { Msg } from "./message";

const STORAGE_KEY = "app_state";

export const view: View<Model, Msg, Svg> = ({ state }: Model, _ctx: ViewContext, _raise: (msg: Msg) => void): Svg => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const defaultState: State = {
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
}

export const getStateFromLocalStorage = (): State => {
    const stateString = localStorage.getItem(STORAGE_KEY)
    if (!stateString) {
        return defaultState;
    }
    const parsed = StateSchema.safeParse(JSON.parse(stateString));
    if (!parsed.success) {
        console.log("Invalid cookie state:", parsed.error.message);
        return defaultState;
    }
    return parsed.data;
}
