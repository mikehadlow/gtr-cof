import { describe, expect, test } from "bun:test";
import { defaultState } from "./test-default-state";
import { Update } from "./update-chord-interval-change";
import { updateScale } from "./updateScale";

describe("update-chord-interval-change", () => {
    test("sets chordIntervals", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "ChordIntervalChange", chordIntervals: [0, 2, 4, 6] });
        expect(result.state.chordIntervals).toEqual([0, 2, 4, 6]);
    });

    test("clears toggledIndexes", () => {
        const model = updateScale({ ...defaultState, toggledNotesBitmask: (2 ** 0) | (2 ** 4) });
        const result = Update(model, { id: "ChordIntervalChange", chordIntervals: [0, 2, 4] });
        expect(result.state.toggledNotesBitmask).toBe(0);
    });
});
