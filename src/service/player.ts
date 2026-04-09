import type { Msg, SequenceEvent } from "../message";
import type { Model } from "../model";
import { getNodeAtIndex } from "../music";
import type { Service } from "../types";

type Toggle = Extract<Msg, { id: "Toggle" }>;
type ChordChanged = Extract<Msg, { id: "ChordChanged" }>;
type TonicChanged = Extract<Msg, { id: "TonicChanged" }>;
type ModeChanged = Extract<Msg, { id: "ModeChanged" }>;

const defaultOctave = 57; // A3 MIDI note
const octave = 12;

export const playToggle: Service<Model, Toggle, Msg> = (model: Model, msg: Toggle, raise: (msg: Msg) => void): void => {
    if (!model.state.sound) {
        return;
    }
    const node = getNodeAtIndex(model.music.nodes, msg.index);
    if (node.toggle) {
        raise({
            id: "Play",
            sequence: [
                {
                    timestamp: 0,
                    midiNotes: [getMidiNote(model.state.index, msg.index)],
                },
            ],
        });
    }
};

export const playChordChanged: Service<Model, ChordChanged, Msg> = (
    { state }: Model,
    msg: ChordChanged,
    raise: (msg: Msg) => void,
): void => {
    if (!state.sound) {
        return;
    }
    if (state.toggledNotesBitmask === 0) {
        // chord is toggled off, nothing to play.
        return;
    }
    const midiNotes = getSetBits(state.toggledNotesBitmask).map((i) => getMidiNote(msg.chordIndex, i));
    raise({
        id: "Play",
        sequence: [
            {
                timestamp: 0,
                midiNotes,
            },
        ],
    });
};

export const playTonicChanged: Service<Model, TonicChanged, Msg> = (
    model: Model,
    _msg: TonicChanged,
    raise: (msg: Msg) => void,
): void => playScale(model, raise);

export const playModeChanged: Service<Model, ModeChanged, Msg> = (
    model: Model,
    _msg: ModeChanged,
    raise: (msg: Msg) => void,
): void => playScale(model, raise);

function playScale({ music, state }: Model, raise: (msg: Msg) => void): void {
    if (!state.sound) {
        return;
    }
    let i = 0;
    const sequence: SequenceEvent[] = [
        ...music.nodes.filter((n) => n.scaleNote.isScaleNote).map(({ scaleNote }) => scaleNote.note.index),
        state.index + octave, // add the tonic an octave above at the end
    ].map((index) => ({
        timestamp: i++ * 200,
        midiNotes: [getMidiNote(state.index, index)],
    }));
    raise({
        id: "Play",
        sequence,
    });
}

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
