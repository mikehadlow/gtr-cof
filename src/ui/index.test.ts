import { describe, expect, test } from "bun:test";
import { arcCentroid, arcPath } from "./index";

describe("arcCentroid", () => {
    test("centroid at top (angle 0) points straight up", () => {
        const [x, y] = arcCentroid(0, 100, -Math.PI / 12, Math.PI / 12);
        expect(x).toBeCloseTo(0, 5);
        expect(y).toBeCloseTo(-50, 5);
    });

    test("centroid of a 90° arc from top to 3-o-clock", () => {
        const midR = 150; // (100 + 200) / 2
        const [x, y] = arcCentroid(100, 200, 0, Math.PI / 2);
        expect(x).toBeCloseTo(Math.sin(Math.PI / 4) * midR, 5);
        expect(y).toBeCloseTo(-Math.cos(Math.PI / 4) * midR, 5);
    });

    test("centroid at bottom (angle π)", () => {
        const [x, y] = arcCentroid(50, 150, Math.PI / 2, (3 * Math.PI) / 2);
        expect(x).toBeCloseTo(0, 5);
        expect(y).toBeCloseTo(100, 5); // +midR (below origin)
    });

    test("centroid at 3-o-clock (angle π/2)", () => {
        const [x, y] = arcCentroid(0, 100, 0, Math.PI);
        expect(x).toBeCloseTo(50, 5);
        expect(y).toBeCloseTo(0, 5);
    });
});

describe("arcPath", () => {
    test("returns a string starting with M and containing two A commands", () => {
        const path = arcPath(50, 100, 0, Math.PI / 2);
        expect(path).toMatch(/^M /);
        const arcCount = (path.match(/\bA\b/g) ?? []).length;
        expect(arcCount).toBe(2);
        expect(path).toContain("Z");
    });

    test("outer arc uses outerR and inner arc uses innerR", () => {
        const path = arcPath(50, 100, 0, Math.PI / 2);
        // First A command: outerR,outerR
        expect(path).toContain("A 100,100");
        // Second A command: innerR,innerR
        expect(path).toContain("A 50,50");
    });

    test("outer arc sweeps clockwise (sweep-flag=1), inner counter-clockwise (sweep-flag=0)", () => {
        const path = arcPath(50, 100, 0, Math.PI / 2);
        // outer: "... 0 0,1 ..."
        expect(path).toMatch(/A 100,100 0 0,1/);
        // inner: "... 0 0,0 ..."
        expect(path).toMatch(/A 50,50 0 0,0/);
    });

    test("large-arc flag is 0 for arcs < 180°", () => {
        const path = arcPath(50, 100, 0, Math.PI / 2);
        expect(path).toMatch(/A 100,100 0 0,1/);
    });

    test("large-arc flag is 1 for arcs > 180°", () => {
        const path = arcPath(50, 100, 0, Math.PI * 1.5);
        expect(path).toMatch(/A 100,100 0 1,1/);
        expect(path).toMatch(/A 50,50 0 1,0/);
    });

    test("start point matches sin/cos convention (angle 0 = top)", () => {
        // startAngle=0: x=sin(0)*outerR=0, y=-cos(0)*outerR=-100
        const path = arcPath(50, 100, 0, Math.PI / 6);
        expect(path).toMatch(/^M 0,-100/);
    });

    test("padAngle narrows the segment symmetrically", () => {
        const withPad = arcPath(50, 100, 0, Math.PI / 2, 0.1);
        const withoutPad = arcPath(50, 100, 0.05, Math.PI / 2 - 0.05);
        expect(withPad).toBe(withoutPad);
    });
});
