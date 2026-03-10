import { describe, test, expect } from "bun:test";
import { Update } from "./update-set-c-to-noon";
import { updateScale } from "./updateScale";
import { defaultState } from "./test-default-state";

describe("update-set-c-to-noon", () => {
    test("sets circleIsCNoon to false", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "SetCToNoon", isC: false });
        expect(result.state.circleIsCNoon).toBe(false);
    });

    test("sets circleIsCNoon to true", () => {
        const model = updateScale({ ...defaultState, circleIsCNoon: false });
        const result = Update(model, { id: "SetCToNoon", isC: true });
        expect(result.state.circleIsCNoon).toBe(true);
    });
});
