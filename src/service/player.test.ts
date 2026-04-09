import { describe, expect, test } from "bun:test";
import type { Msg } from "../message";
import { createNoteSpec } from "../music";
import { defaultState } from "../update/test-default-state";
import { updateScale } from "../update/updateScale";
import { playChordChanged, playModeChanged, playToggle, playTonicChanged } from "./player";

const defaultOctave = 57; // MIDI note A3

describe("playToggle service", () => {
    test("raises Play message when toggling a note on", () => {
        // node[0] is A (chromatic index 0); bitmask bit 0 = 1 toggles it on
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 1 });

        const raised: Msg[] = [];
        playToggle(model, { id: "Toggle", index: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", sequence: [{ timestamp: 0, midiNotes: [defaultOctave] }] });
    });

    test("does not raise any message when toggling a note off", () => {
        // bitmask 0 means no notes toggled on, so node[0].toggle === false
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 0 });

        const raised: Msg[] = [];
        playToggle(model, { id: "Toggle", index: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(0);
    });

    test("Play message carries the correct index for node 7", () => {
        // node[7] is E (chromatic index 7 in A-centric layout); bitmask bit 7 = 128 toggles it on
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 128 });

        const raised: Msg[] = [];
        playToggle(model, { id: "Toggle", index: 7 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toMatchObject({ id: "Play", sequence: [{ timestamp: 0, midiNotes: [defaultOctave + 7] }] });
    });

    test("Toggle midiNote overrides generated", () => {
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 1 });

        const raised: Msg[] = [];
        playToggle(model, { id: "Toggle", index: 0, midiNote: 45 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toMatchObject({ id: "Play", sequence: [{ timestamp: 0, midiNotes: [45] }] });
    });
});

const noteLength = 200;

// A major (Ionian, default state): A B C# D E F# G# A-octave
// note indices: [0, 2, 4, 5, 7, 9, 11] + tonic+12 = 12
// getMidiNote(root=0, index) = defaultOctave + index (none below root)
const aMajorSequence = [
    { timestamp: 0 * noteLength, midiNotes: [57] },
    { timestamp: 1 * noteLength, midiNotes: [59] },
    { timestamp: 2 * noteLength, midiNotes: [61] },
    { timestamp: 3 * noteLength, midiNotes: [62] },
    { timestamp: 4 * noteLength, midiNotes: [64] },
    { timestamp: 5 * noteLength, midiNotes: [66] },
    { timestamp: 6 * noteLength, midiNotes: [68] },
    { timestamp: 7 * noteLength, midiNotes: [69] },
];

describe("playTonicChanged service", () => {
    test("raises Play with ascending scale sequence for default state (A major)", () => {
        const model = updateScale({ ...defaultState });

        const raised: Msg[] = [];
        playTonicChanged(model, { id: "TonicChanged", noteSpec: createNoteSpec(0, 0) }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", sequence: aMajorSequence });
    });
});

describe("playModeChanged service", () => {
    test("raises Play with ascending scale sequence for default state (A major)", () => {
        const model = updateScale({ ...defaultState });

        const raised: Msg[] = [];
        playModeChanged(model, { id: "ModeChanged", mode: model.music.mode }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", sequence: aMajorSequence });
    });

    test("raises Play with correct notes for A Dorian (modeIndex 2)", () => {
        // A Dorian note indices: [0, 2, 3, 5, 7, 9, 10] + tonic+12
        const model = updateScale({ ...defaultState, modeIndex: 2 });

        const raised: Msg[] = [];
        playModeChanged(model, { id: "ModeChanged", mode: model.music.mode }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({
            id: "Play",
            sequence: [
                { timestamp: 0 * noteLength, midiNotes: [57] },
                { timestamp: 1 * noteLength, midiNotes: [59] },
                { timestamp: 2 * noteLength, midiNotes: [60] },
                { timestamp: 3 * noteLength, midiNotes: [62] },
                { timestamp: 4 * noteLength, midiNotes: [64] },
                { timestamp: 5 * noteLength, midiNotes: [66] },
                { timestamp: 6 * noteLength, midiNotes: [67] },
                { timestamp: 7 * noteLength, midiNotes: [69] },
            ],
        });
    });
});

describe("playChordChaged service", () => {
    test("does not raise any message when bitmask is 0", () => {
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 0 });

        const raised: Msg[] = [];
        playChordChanged(model, { id: "ChordChanged", chordIndex: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(0);
    });

    test("raises Play with a single note when one bit is set", () => {
        // bit 0 set, chordIndex 0: getMidiNote(0, 0) => index(0) < root(0) is false => defaultOctave + 0
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 1 });

        const raised: Msg[] = [];
        playChordChanged(model, { id: "ChordChanged", chordIndex: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", sequence: [{ timestamp: 0, midiNotes: [defaultOctave] }] });
    });

    test("raises Play with multiple notes when several bits are set", () => {
        // bits 0, 2, 4 set (bitmask = 1 + 4 + 16 = 21), chordIndex 0
        // getMidiNote(0, 0) = 57, getMidiNote(0, 2) = 59, getMidiNote(0, 4) = 61
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 21 });

        const raised: Msg[] = [];
        playChordChanged(model, { id: "ChordChanged", chordIndex: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({
            id: "Play",
            sequence: [{ timestamp: 0, midiNotes: [defaultOctave, defaultOctave + 2, defaultOctave + 4] }],
        });
    });

    test("bumps notes below the chord root up an octave", () => {
        // bit 0 set, chordIndex 5: getMidiNote(5, 0) => index(0) < root(5) => defaultOctave + 12 + 0 = 69
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 1 });

        const raised: Msg[] = [];
        playChordChanged(model, { id: "ChordChanged", chordIndex: 5 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", sequence: [{ timestamp: 0, midiNotes: [defaultOctave + 12] }] });
    });
});
