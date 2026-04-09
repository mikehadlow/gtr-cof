import { describe, expect, test } from "bun:test";
import { parseTuning, type Tuning, tunings } from "./tuning-model";

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
        const notes = parseTuning("ABCDEFG");
        expect(notes.map((x) => x.index)).toEqual([0, 2, 3, 5, 7, 8, 10]);
    });

    test("parseTuning should parse sharps and flats", () => {
        const notes = parseTuning("A♯B♭CDEFG♭");
        expect(notes.map((x) => x.index)).toEqual([1, 1, 3, 5, 7, 8, 9]);
    });

    test("parseTuning should reject invalid naturals", () => {
        expect(() => parseTuning("HBCDEFG")).toThrow();
    });

    test("parseTuning should reject repeated accidentals", () => {
        expect(() => parseTuning("AB♯♯CDEFG")).toThrow();
    });
});
