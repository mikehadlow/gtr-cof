import { describe, expect, test } from "bun:test";
import { parseTuning, type Tuning, tuningInfos, tunings } from "./tuning-model";

describe("tuning-model", () => {
    test("should successfully parse all tunings", () => {
        expect(tunings.length > 0).toBeTrue();
        const guitarStandard: Tuning = tunings[0];
        expect(guitarStandard.index).toBe(0);
        expect(guitarStandard.description).toBe("Guitar Standard");
        expect(guitarStandard.tuning).toBe("EADGBE");
        expect(guitarStandard.notes.map((x) => x.index)).toEqual([7, 0, 5, 10, 2, 7]); // E,A,D,G,B,E
    });

    test("parseTuning should work", () => {
        const notes = parseTuning({ tuning: "ABCDEFG", dots: [], description: "" });
        expect(notes.map((x) => x.index)).toEqual([0, 2, 3, 5, 7, 8, 10]);
    });

    test("parseTuning should parse sharps and flats", () => {
        const notes = parseTuning({ tuning: "A♯B♭CDEFG♭", dots: [], description: "" });
        expect(notes.map((x) => x.index)).toEqual([1, 1, 3, 5, 7, 8, 9]);
    });

    test("parseTuning should reject invalid naturals", () => {
        expect(() => parseTuning({ tuning: "HBCDEFG", dots: [], description: "" })).toThrow();
    });

    test("parseTuning should reject repeated accidentals", () => {
        expect(() => parseTuning({ tuning: "AB♯♯CDEFG", dots: [], description: "" })).toThrow();
    });

    test("parseTuning should output octave numbers", () => {
        const strings = parseTuning(tuningInfos[0]); // Guitar Standard: EADGBE [2,2,3,3,3,4]
        expect(strings.map((x) => x.octave)).toEqual([2, 2, 3, 3, 3, 4]);
    });

    test("parseTuning should default octave to 3 when not provided", () => {
        const strings = parseTuning({ tuning: "EADGBE", dots: [], description: "" });
        expect(strings.map((x) => x.octave)).toEqual([3, 3, 3, 3, 3, 3]);
    });

    test("parseTuning should throw when octave length does not match string count", () => {
        expect(() => parseTuning({ tuning: "EADGBE", dots: [], description: "", octave: [2, 2, 3] })).toThrow(
            "octave length must match number of strings",
        );
    });

    test("parseTuning should not throw for any defined tuning", () => {
        for (const info of tuningInfos) {
            expect(() => parseTuning(info)).not.toThrow();
        }
    });
});
