import { describe, expect, test } from "bun:test";
import { defaultState } from "./test-default-state";
import { Update } from "./update-left-handed-fretboard";
import { updateScale } from "./updateScale";

describe("update-left-handed-fretboard", () => {
    test("sets isLeftHanded to true", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "LeftHandedFretboard", isLeftHanded: true });
        expect(result.state.isLeftHanded).toBe(true);
    });

    test("sets isLeftHanded to false", () => {
        const model = updateScale({ ...defaultState, isLeftHanded: true });
        const result = Update(model, { id: "LeftHandedFretboard", isLeftHanded: false });
        expect(result.state.isLeftHanded).toBe(false);
    });
});
