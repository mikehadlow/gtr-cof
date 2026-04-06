import type { Msg } from "../message";
import type { Model } from "../model";
import { getNodeAtIndex } from "../music";
import type { Service } from "../types";

type Toggle = Extract<Msg, { id: "Toggle" }>;

const defaultOctave = 57; // A3 MIDI note
const octave = 12;

export const service: Service<Model, Toggle, Msg> = (model: Model, msg: Toggle, raise: (msg: Msg) => void): void => {
    const node = getNodeAtIndex(model.music.nodes, msg.index);
    if (node.toggle) {
        // toggling on note, so it should be played
        console.log(`ON  node ${node.scaleNote.note.label}`);
        raise({
            id: "Play",
            midiNote: getMidiNote(model, msg),
        });
    }
};

// Play a note relative to the current tonic
function getMidiNote({ state }: Model, msg: Toggle): number {
    const midiNote = msg.index < state.index ? defaultOctave + octave + msg.index : defaultOctave + msg.index;
    console.log(`getMidiNote: state.index: ${state.index}, msg.index: ${msg.index}`);
    return midiNote;
}
