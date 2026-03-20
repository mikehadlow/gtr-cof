import { describe, expect, test } from "bun:test";
import { defaultState } from "./test-default-state";
import { Update } from "./update-tuning-changed";
import { updateScale } from "./updateScale";

describe("update-tuning-changed", () => {
    test("sets tuningIndex", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "TuningChanged", index: 2 });
        expect(result.state.tuningIndex).toBe(2);
    });

    test("updates from non-zero tuningIndex", () => {
        const model = updateScale({ ...defaultState, tuningIndex: 3 });
        const result = Update(model, { id: "TuningChanged", index: 1 });
        expect(result.state.tuningIndex).toBe(1);
    });
});
