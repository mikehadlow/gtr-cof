import { describe, expect, test } from "bun:test";
import { defaultState } from "./test-default-state";
import { Update } from "./update-fretboard-label-change";
import { updateScale } from "./updateScale";

describe("update-fretboard-label-change", () => {
    test("sets fretboardLabelType to Interval", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "FretboardLabelChange", labelType: "Interval" });
        expect(result.state.fretboardLabelType).toBe("Interval");
    });

    test("sets fretboardLabelType to None", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "FretboardLabelChange", labelType: "None" });
        expect(result.state.fretboardLabelType).toBe("None");
    });

    test("sets fretboardLabelType to NoteName", () => {
        const model = updateScale({ ...defaultState, fretboardLabelType: "Interval" });
        const result = Update(model, { id: "FretboardLabelChange", labelType: "NoteName" });
        expect(result.state.fretboardLabelType).toBe("NoteName");
    });
});
