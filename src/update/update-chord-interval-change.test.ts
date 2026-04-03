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

    test("does not clear toggledIndexes when no chord is selected", () => {
        const toggledNotesBitmask = (2 ** 0) | (2 ** 4);
        const model = updateScale({ ...defaultState, toggledNotesBitmask });
        const result = Update(model, { id: "ChordIntervalChange", chordIntervals: [0, 2, 4] });
        expect(result.state.toggledNotesBitmask).toBe(toggledNotesBitmask);
    });

    test("clears toggledIndexes when chord is selected", () => {
        const toggledNotesBitmask = (2 ** 3) | (2 ** 4);
        const cSevenChord = (2 ** 0) | (2 ** 4) | (2 ** 7) | (2 ** 11); // C7 toggles
        const model = updateScale({ ...defaultState, toggledNotesBitmask, chordIndex: 0 });
        const result = Update(model, { id: "ChordIntervalChange", chordIntervals: [0, 2, 4, 6] });
        expect(result.state.toggledNotesBitmask).toBe(cSevenChord);
    });
});
