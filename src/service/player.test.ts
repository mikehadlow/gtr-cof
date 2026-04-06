import { describe, expect, test } from "bun:test";
import type { Msg } from "../message";
import { defaultState } from "../update/test-default-state";
import { updateScale } from "../update/updateScale";
import { service } from "./player";

const defaultOctave = 57; // MIDI note A3

describe("player service", () => {
    test("raises Play message when toggling a note on", () => {
        // node[0] is A (chromatic index 0); bitmask bit 0 = 1 toggles it on
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 1 });

        const raised: Msg[] = [];
        service(model, { id: "Toggle", index: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toEqual({ id: "Play", midiNote: defaultOctave });
    });

    test("does not raise any message when toggling a note off", () => {
        // bitmask 0 means no notes toggled on, so node[0].toggle === false
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 0 });

        const raised: Msg[] = [];
        service(model, { id: "Toggle", index: 0 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(0);
    });

    test("Play message carries the correct index for node 7", () => {
        // node[7] is E (chromatic index 7 in A-centric layout); bitmask bit 7 = 128 toggles it on
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 128 });

        const raised: Msg[] = [];
        service(model, { id: "Toggle", index: 7 }, (msg) => raised.push(msg));

        expect(raised).toHaveLength(1);
        expect(raised[0]).toMatchObject({ id: "Play", midiNote: defaultOctave + 7 });
    });
});
