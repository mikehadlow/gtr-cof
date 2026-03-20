import { describe, expect, test } from "bun:test";
import { defaultState } from "./test-default-state";
import { Update } from "./update-flip-nut";
import { updateScale } from "./updateScale";

describe("update-flip-nut", () => {
    test("sets isNutFlipped to true", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "FlipNut", isNutFlipped: true });
        expect(result.state.isNutFlipped).toBe(true);
    });

    test("sets isNutFlipped to false", () => {
        const model = updateScale({ ...defaultState, isNutFlipped: true });
        const result = Update(model, { id: "FlipNut", isNutFlipped: false });
        expect(result.state.isNutFlipped).toBe(false);
    });
});
