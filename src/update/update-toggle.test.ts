import { describe, expect, test } from "bun:test";
import { defaultState } from "./test-default-state";
import { Update } from "./update-toggle";
import { updateScale } from "./updateScale";

describe("update-toggle", () => {
    test("toggles a note on (index 0)", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "Toggle", index: 0 });
        expect(result.state.toggledNotesBitmask & (2 ** 0)).toBeTruthy();
    });

    test("toggles a note off (index 0)", () => {
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 2 ** 0 });
        const result = Update(model, { id: "Toggle", index: 0 });
        expect(result.state.toggledNotesBitmask & (2 ** 0)).toBe(0);
    });

    test("toggles a note on (index 7)", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "Toggle", index: 7 });
        expect(result.state.toggledNotesBitmask & (2 ** 7)).toBeTruthy();
    });

    test("toggles a note off (index 7)", () => {
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 2 ** 7 });
        const result = Update(model, { id: "Toggle", index: 7 });
        expect(result.state.toggledNotesBitmask & (2 ** 7)).toBe(0);
    });

    test("toggling one note does not affect another", () => {
        const model = updateScale({ ...defaultState, toggledNotesBitmask: 2 ** 7 });
        const result = Update(model, { id: "Toggle", index: 0 });
        expect(result.state.toggledNotesBitmask & (2 ** 7)).toBeTruthy();
    });
});
