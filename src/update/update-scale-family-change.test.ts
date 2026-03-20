import { describe, expect, test } from "bun:test";
import * as music from "../music";
import { defaultState } from "./test-default-state";
import { Update } from "./update-scale-family-change";
import { updateScale } from "./updateScale";

describe("update-scale-family-change", () => {
    test("sets scaleFamilyIndex", () => {
        const model = updateScale({ ...defaultState });
        const harmonicMinor = music.scaleFamily.find((sf) => sf.index === 1)!;
        const result = Update(model, { id: "ScaleFamilyChange", scaleFamily: harmonicMinor });
        expect(result.state.scaleFamilyIndex).toBe(1);
    });

    test("sets modeIndex to the scale family's default", () => {
        const model = updateScale({ ...defaultState });
        const harmonicMinor = music.scaleFamily.find((sf) => sf.index === 1)!;
        const result = Update(model, { id: "ScaleFamilyChange", scaleFamily: harmonicMinor });
        expect(result.state.modeIndex).toBe(harmonicMinor.defaultModeIndex);
    });

    test("clears chordIndex", () => {
        const model = updateScale({ ...defaultState, chordIndex: 3 });
        const diatonic = music.scaleFamily.find((sf) => sf.index === 0)!;
        const result = Update(model, { id: "ScaleFamilyChange", scaleFamily: diatonic });
        expect(result.state.chordIndex).toBe(-1);
    });
});
