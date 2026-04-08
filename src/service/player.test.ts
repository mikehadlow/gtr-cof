import { describe, expect, test } from "bun:test";
import type { Msg } from "../message";
import { defaultState } from "../update/test-default-state";
import { updateScale } from "../update/updateScale";
import { playChordChanged, playToggle } from "./player";

const defaultOctave = 57; // MIDI note A3

describe("playToggle service", () => {
    test("raises Play message when toggling a note on", () => {
        // node[0] is A (chromatic index 0); bitmask bit 0 = 1 toggles it on
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 1 });

        const raised: Msg[] = [];
        playToggle(model, { id: "Toggle", index: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", midiNotes: [defaultOctave] });
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
        expect(raised[0]).toMatchObject({ id: "Play", midiNotes: [defaultOctave + 7] });
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
        expect(raised[0]).toEqual({ id: "Play", midiNotes: [defaultOctave] });
    });

    test("raises Play with multiple notes when several bits are set", () => {
        // bits 0, 2, 4 set (bitmask = 1 + 4 + 16 = 21), chordIndex 0
        // getMidiNote(0, 0) = 57, getMidiNote(0, 2) = 59, getMidiNote(0, 4) = 61
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 21 });

        const raised: Msg[] = [];
        playChordChanged(model, { id: "ChordChanged", chordIndex: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", midiNotes: [defaultOctave, defaultOctave + 2, defaultOctave + 4] });
    });

    test("bumps notes below the chord root up an octave", () => {
        // bit 0 set, chordIndex 5: getMidiNote(5, 0) => index(0) < root(5) => defaultOctave + 12 + 0 = 69
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 1 });

        const raised: Msg[] = [];
        playChordChanged(model, { id: "ChordChanged", chordIndex: 5 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", midiNotes: [defaultOctave + 12] });
    });
});
