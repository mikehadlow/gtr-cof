import type { Msg } from "../message";
import type { Model } from "../model";
import { getNodeAtIndex } from "../music";
import type { Service } from "../types";

type Toggle = Extract<Msg, { id: "Toggle" }>;
type ChordChanged = Extract<Msg, { id: "ChordChanged" }>;

const defaultOctave = 57; // A3 MIDI note
const octave = 12;

export const playToggle: Service<Model, Toggle, Msg> = (model: Model, msg: Toggle, raise: (msg: Msg) => void): void => {
    const node = getNodeAtIndex(model.music.nodes, msg.index);
    if (node.toggle) {
        raise({
            id: "Play",
            midiNotes: [getMidiNote(model.state.index, msg.index)],
        });
    }
};

export const playChordChanged: Service<Model, ChordChanged, Msg> = (
    { state }: Model,
    msg: ChordChanged,
    raise: (msg: Msg) => void,
): void => {
    if (state.toggledNotesBitmask === 0) {
        // chord is toggled off, nothing to play.
        return;
    }
    const midiNotes = getSetBits(state.toggledNotesBitmask).map((i) => getMidiNote(msg.chordIndex, i));
    raise({
        id: "Play",
        midiNotes,
    });
};

function getMidiNote(root: number, index: number) {
    return index < root ? defaultOctave + octave + index : defaultOctave + index;
}

function getSetBits(mask: number): number[] {
    const result: number[] = [];
    let index = 0;

    while (mask > 0) {
        if (mask & 1) {
            result.push(index);
        }
        mask >>= 1;
        index++;
    }

    return result;
}
