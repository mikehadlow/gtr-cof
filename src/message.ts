import type { FretboardLabelType } from './types';
import * as music from './music';

export type Msg = {
    id: "TonicChanged",
    noteSpec: music.NoteSpec
} | {
    id: "ModeChanged",
    mode: music.Mode
} | {
    id: "ChordChanged",
    chordIndex: number
} | {
    id: "Toggle",
    index: number
} | {
    id: "ChordIntervalChange",
    chordIntervals: number[]
} | {
    id: "ScaleFamilyChange",
    scaleFamily: music.ScaleFamily
} | { // Fretboard only messages
    id: "TuningChanged",
    index: number
} | {
    id: "LeftHandedFretboard",
    isLeftHanded: boolean
} | {
    id: "FlipNut",
    isNutFlipped: boolean
} | {
    id: "FretboardLabelChange",
    labelType: FretboardLabelType
} | { // MIDI only message
    id: "MidiNote",
    toggledIndexes: number
} | { // CoF only message
    id: "SetCToNoon",
    isC: boolean
}
