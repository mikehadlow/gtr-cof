import { describe, expect, test } from "bun:test";
import type { RenderNode } from "../ui";
import { defaultState } from "../update/test-default-state";
import { updateScale } from "../update/updateScale";
import { guitarNodes } from "./guitar";
import * as tuning from "./tuning";

const model = updateScale({ ...defaultState });
const noRaise = () => {};
const std = tuning.tunings[0]; // EADGBE, 6 strings

function collect<T extends RenderNode["type"]>(type: T, nodes: RenderNode[]): Extract<RenderNode, { type: T }>[] {
    const result: Extract<RenderNode, { type: T }>[] = [];
    for (const node of nodes) {
        if (node.type === type) {
            result.push(node as Extract<RenderNode, { type: T }>);
        }
        if (node.type === "g") {
            result.push(...collect(type, node.children));
        }
    }
    return result;
}

// Helper to get the fretboard group (last top-level node)
function getFretboard(nodes: RenderNode[]) {
    const fb = nodes[nodes.length - 1];
    if (fb.type !== "g") {
        throw new Error("expected fretboard to be a g node");
    }
    return fb;
}

// ─── structure ─────────────────────────────────────────────────────────────

describe("guitarNodes - structure", () => {
    const nodes = guitarNodes(model, noRaise);

    test("returns 3 top-level nodes: title text, settings icon g, fretboard g", () => {
        expect(nodes).toHaveLength(3);
    });

    test("first node is title text with class mode-text", () => {
        expect(nodes[0].type).toBe("text");
        if (nodes[0].type !== "text") {
            throw new Error();
        }
        expect(nodes[0].class).toBe("mode-text");
        expect(nodes[0].x).toBe(30);
        expect(nodes[0].y).toBe(15);
    });

    test("title contains tuning string and description", () => {
        if (nodes[0].type !== "text") {
            throw new Error();
        }
        expect(nodes[0].content).toContain(std.tuning);
        expect(nodes[0].content).toContain(std.description);
    });

    test("second node is settings icon g", () => {
        expect(nodes[1].type).toBe("g");
    });

    test("third node is the fretboard g", () => {
        expect(nodes[2].type).toBe("g");
    });

    test("fretboard g has 2 + numStrings children (frets g, dots g, one per string)", () => {
        const fb = getFretboard(nodes);
        expect(fb.children).toHaveLength(2 + std.notes.length);
    });

    test("frets group (index 0) has 16 rect children", () => {
        const fb = getFretboard(nodes);
        const fretsGroup = fb.children[0];
        if (fretsGroup.type !== "g") {
            throw new Error();
        }
        expect(fretsGroup.children).toHaveLength(16);
        for (const c of fretsGroup.children) {
            expect(c.type).toBe("rect");
        }
    });

    test("dots group (index 1) has correct dot count", () => {
        const fb = getFretboard(nodes);
        const dotsGroup = fb.children[1];
        if (dotsGroup.type !== "g") {
            throw new Error();
        }
        expect(dotsGroup.children).toHaveLength(std.dots.length);
        for (const c of dotsGroup.children) {
            expect(c.type).toBe("circle");
        }
    });

    test("each string group has 1 line + 16 circles + 16 texts = 33 children", () => {
        const fb = getFretboard(nodes);
        for (let si = 0; si < std.notes.length; si++) {
            const strGroup = fb.children[2 + si];
            if (strGroup.type !== "g") {
                throw new Error();
            }
            expect(strGroup.children).toHaveLength(33);
        }
    });

    test("each string group's first child is a line", () => {
        const fb = getFretboard(nodes);
        for (let si = 0; si < std.notes.length; si++) {
            const strGroup = fb.children[2 + si];
            if (strGroup.type !== "g") {
                throw new Error();
            }
            expect(strGroup.children[0].type).toBe("line");
        }
    });

    test("string groups have correct translate transforms", () => {
        const fb = getFretboard(nodes);
        for (let si = 0; si < std.notes.length; si++) {
            const strGroup = fb.children[2 + si];
            if (strGroup.type !== "g") {
                throw new Error();
            }
            expect(strGroup.transform).toBe(`translate(0, ${si * 40 + 20})`);
        }
    });

    test("note circles (indices 1-16 in string group) have r=15", () => {
        const fb = getFretboard(nodes);
        const strGroup = fb.children[2];
        if (strGroup.type !== "g") {
            throw new Error();
        }
        for (let i = 1; i <= 16; i++) {
            const c = strGroup.children[i];
            if (c.type !== "circle") {
                throw new Error();
            }
            expect(c.r).toBe(15);
        }
    });

    test("note texts (indices 17-32 in string group) have text-anchor middle", () => {
        const fb = getFretboard(nodes);
        const strGroup = fb.children[2];
        if (strGroup.type !== "g") {
            throw new Error();
        }
        for (let i = 17; i <= 32; i++) {
            const t = strGroup.children[i];
            if (t.type !== "text") {
                throw new Error();
            }
            expect(t.textAnchor).toBe("middle");
        }
    });
});

// ─── fret geometry ─────────────────────────────────────────────────────────

describe("guitarNodes - fret geometry", () => {
    const nodes = guitarNodes(model, noRaise);

    test("first fret rect has class fret-nut (nut)", () => {
        const fb = getFretboard(nodes);
        const fretsGroup = fb.children[0];
        if (fretsGroup.type !== "g") {
            throw new Error();
        }
        const firstRect = fretsGroup.children[0];
        if (firstRect.type !== "rect") {
            throw new Error();
        }
        expect(firstRect.class).toBe("fret-nut");
    });

    test("remaining fret rects have class fret-line", () => {
        const fb = getFretboard(nodes);
        const fretsGroup = fb.children[0];
        if (fretsGroup.type !== "g") {
            throw new Error();
        }
        for (let i = 1; i < 16; i++) {
            const rect = fretsGroup.children[i];
            if (rect.type !== "rect") {
                throw new Error();
            }
            expect(rect.class).toBe("fret-line");
        }
    });

    test("fret rects have no inline stroke — styling via CSS class", () => {
        const fb = getFretboard(nodes);
        const fretsGroup = fb.children[0];
        if (fretsGroup.type !== "g") {
            throw new Error();
        }
        for (const c of fretsGroup.children) {
            if (c.type !== "rect") {
                throw new Error();
            }
            expect(c.stroke).toBeUndefined();
            expect(c.strokeWidth).toBeUndefined();
        }
    });
});

// ─── note circle styling ───────────────────────────────────────────────────

describe("guitarNodes - note circle styling", () => {
    test("scale note circles have fret-note-scale class", () => {
        const nodes = guitarNodes(model, noRaise);
        const noteCircles = collect("circle", nodes).filter((c) => c.r === 15);
        const scaleCircles = noteCircles.filter((c) => c.class?.includes("fret-note-scale"));
        expect(scaleCircles.length).toBeGreaterThan(0);
    });

    test("non-scale note circles have fret-note class only", () => {
        const nodes = guitarNodes(model, noRaise);
        const noteCircles = collect("circle", nodes).filter((c) => c.r === 15);
        const hidden = noteCircles.filter((c) => c.class === "fret-note");
        expect(hidden.length).toBeGreaterThan(0);
    });

    test("tonic note with no toggled notes has fret-note-tonic class", () => {
        // defaultState has no toggled notes; the tonic note gets fret-note-tonic class
        const nodes = guitarNodes(model, noRaise);
        const noteCircles = collect("circle", nodes).filter((c) => c.r === 15);
        const tonic = noteCircles.filter((c) => c.class?.includes("fret-note-tonic"));
        expect(tonic.length).toBeGreaterThan(0);
    });
});

// ─── click handlers ────────────────────────────────────────────────────────

describe("guitarNodes - click handlers", () => {
    test("clicking a note circle raises Toggle with the note's chromatic index", () => {
        let raised: unknown = null;
        const nodes = guitarNodes(model, (msg) => {
            raised = msg;
        });
        const fb = getFretboard(nodes);
        const strGroup = fb.children[2];
        if (strGroup.type !== "g") {
            throw new Error();
        }
        const circle = strGroup.children[1];
        if (circle.type !== "circle" || !circle.onClick) {
            throw new Error("no onClick on circle");
        }
        circle.onClick();
        expect((raised as { id: string })?.id).toBe("Toggle");
        expect((raised as { index: number })?.index).toBeDefined();
    });

    test("settings icon rect click raises ModalStateChange guitar-settings", () => {
        let raised: unknown = null;
        const nodes = guitarNodes(model, (msg) => {
            raised = msg;
        });
        const settingsG = nodes[1];
        if (settingsG.type !== "g") {
            throw new Error();
        }
        const rect = settingsG.children[0];
        if (rect.type !== "rect" || !rect.onClick) {
            throw new Error("no onClick on settings rect");
        }
        rect.onClick();
        expect((raised as { id: string })?.id).toBe("ModalStateChange");
        expect((raised as { modalState: string })?.modalState).toBe("guitar-settings");
    });
});

// ─── handedness ────────────────────────────────────────────────────────────

describe("guitarNodes - handedness", () => {
    test("right-handed: fretboard g has translate(0, 0) scale(1, 1)", () => {
        const nodes = guitarNodes(model, noRaise);
        const fb = getFretboard(nodes);
        expect(fb.transform).toBe("translate(0, 0) scale(1, 1)");
    });

    test("left-handed: fretboard g has translate(1200, 0) scale(-1, 1)", () => {
        const m = updateScale({ ...defaultState, isLeftHanded: true });
        const nodes = guitarNodes(m, noRaise);
        const fb = getFretboard(nodes);
        expect(fb.transform).toBe("translate(1200, 0) scale(-1, 1)");
    });

    test("right-handed: text nodes have scale(1, 1) transform", () => {
        const nodes = guitarNodes(model, noRaise);
        const fb = getFretboard(nodes);
        const strGroup = fb.children[2];
        if (strGroup.type !== "g") {
            throw new Error();
        }
        const text = strGroup.children[17];
        if (text.type !== "text") {
            throw new Error();
        }
        expect(text.transform).toContain("scale(1, 1)");
    });

    test("left-handed: text nodes have scale(-1, 1) transform", () => {
        const m = updateScale({ ...defaultState, isLeftHanded: true });
        const nodes = guitarNodes(m, noRaise);
        const fb = getFretboard(nodes);
        const strGroup = fb.children[2];
        if (strGroup.type !== "g") {
            throw new Error();
        }
        const text = strGroup.children[17];
        if (text.type !== "text") {
            throw new Error();
        }
        expect(text.transform).toContain("scale(-1, 1)");
    });

    test("left-handed: text x values are negated vs right-handed", () => {
        const mRH = updateScale({ ...defaultState, isLeftHanded: false });
        const mLH = updateScale({ ...defaultState, isLeftHanded: true });
        const nodesRH = guitarNodes(mRH, noRaise);
        const nodesLH = guitarNodes(mLH, noRaise);
        const fbRH = getFretboard(nodesRH);
        const fbLH = getFretboard(nodesLH);
        const strRH = fbRH.children[2];
        const strLH = fbLH.children[2];
        if (strRH.type !== "g" || strLH.type !== "g") {
            throw new Error();
        }
        const textRH = strRH.children[17];
        const textLH = strLH.children[17];
        if (textRH.type !== "text" || textLH.type !== "text") {
            throw new Error();
        }
        expect(textLH.x).toBe(-textRH.x);
    });

    test("right-handed title does not contain 'Left Handed'", () => {
        const nodes = guitarNodes(model, noRaise);
        if (nodes[0].type !== "text") {
            throw new Error();
        }
        expect(nodes[0].content).not.toContain("Left Handed");
    });

    test("left-handed title contains 'Left Handed'", () => {
        const m = updateScale({ ...defaultState, isLeftHanded: true });
        const nodes = guitarNodes(m, noRaise);
        if (nodes[0].type !== "text") {
            throw new Error();
        }
        expect(nodes[0].content).toContain("Left Handed");
    });
});

// ─── nut flip ──────────────────────────────────────────────────────────────

describe("guitarNodes - nut flip", () => {
    test("nut flipped title contains 'Nut Flipped'", () => {
        const m = updateScale({ ...defaultState, isNutFlipped: true });
        const nodes = guitarNodes(m, noRaise);
        if (nodes[0].type !== "text") {
            throw new Error();
        }
        expect(nodes[0].content).toContain("Nut Flipped");
    });

    test("normal title does not contain 'Nut Flipped'", () => {
        const nodes = guitarNodes(model, noRaise);
        if (nodes[0].type !== "text") {
            throw new Error();
        }
        expect(nodes[0].content).not.toContain("Nut Flipped");
    });

    test("nut flip changes which note is on the second string (B vs A in EADGBE)", () => {
        // EADGBE reversed: [high-E, B, G, D, A, low-E] → second string = B (index 11)
        // EADGBE normal:   [low-E, A, D, G, B, high-E] → second string = A (index 9)
        let raisedNormal: unknown = null;
        let raisedFlipped: unknown = null;
        const mNormal = updateScale({ ...defaultState, isNutFlipped: false });
        const mFlipped = updateScale({ ...defaultState, isNutFlipped: true });

        const nodesN = guitarNodes(mNormal, (msg) => {
            raisedNormal = msg;
        });
        const nodesF = guitarNodes(mFlipped, (msg) => {
            raisedFlipped = msg;
        });

        const fbN = getFretboard(nodesN);
        const fbF = getFretboard(nodesF);
        // Second string group is at children[3] (index 2 = frets g, index 3 = second string)
        const strN = fbN.children[3];
        const strF = fbF.children[3];
        if (strN.type !== "g" || strF.type !== "g") {
            throw new Error();
        }
        const circleN = strN.children[1];
        const circleF = strF.children[1];
        if (circleN.type !== "circle" || circleF.type !== "circle") {
            throw new Error();
        }
        if (!circleN.onClick || !circleF.onClick) {
            throw new Error();
        }
        circleN.onClick();
        circleF.onClick();
        expect((raisedNormal as { index: number })?.index).not.toBe((raisedFlipped as { index: number })?.index);
    });
});

// ─── labels ────────────────────────────────────────────────────────────────

describe("guitarNodes - labels", () => {
    test("None: all note label texts are empty strings", () => {
        const m = updateScale({ ...defaultState, fretboardLabelType: "None" });
        const nodes = guitarNodes(m, noRaise);
        const texts = collect("text", nodes).filter((t) => t.class !== "mode-text");
        for (const t of texts) {
            expect(t.content).toBe("");
        }
    });

    test("NoteName: scale notes have non-empty note name labels", () => {
        const m = updateScale({ ...defaultState, fretboardLabelType: "NoteName" });
        const nodes = guitarNodes(m, noRaise);
        const texts = collect("text", nodes).filter((t) => t.class !== "mode-text");
        const nonEmpty = texts.filter((t) => t.content !== "");
        expect(nonEmpty.length).toBeGreaterThan(0);
    });

    test("Interval: scale notes have non-empty interval labels", () => {
        const m = updateScale({ ...defaultState, fretboardLabelType: "Interval" });
        const nodes = guitarNodes(m, noRaise);
        const texts = collect("text", nodes).filter((t) => t.class !== "mode-text");
        const nonEmpty = texts.filter((t) => t.content !== "");
        expect(nonEmpty.length).toBeGreaterThan(0);
    });

    test("NoteName and Interval labels differ for the same scale note", () => {
        const mName = updateScale({ ...defaultState, fretboardLabelType: "NoteName" });
        const mInterval = updateScale({ ...defaultState, fretboardLabelType: "Interval" });
        const nodesName = guitarNodes(mName, noRaise);
        const nodesInterval = guitarNodes(mInterval, noRaise);
        const textsName = collect("text", nodesName).filter((t) => t.class !== "mode-text" && t.content !== "");
        const textsInterval = collect("text", nodesInterval).filter((t) => t.class !== "mode-text" && t.content !== "");
        // At least one label differs between the two modes
        expect(textsName.some((t, i) => t.content !== textsInterval[i]?.content)).toBe(true);
    });
});

// ─── settings icon position ───────────────────────────────────────────────

describe("guitarNodes - settings icon", () => {
    test("gear rect x = svgWidth(1160) - 30 = 1130", () => {
        const nodes = guitarNodes(model, noRaise);
        const settingsG = nodes[1];
        if (settingsG.type !== "g") {
            throw new Error();
        }
        const rect = settingsG.children[0];
        if (rect.type !== "rect") {
            throw new Error();
        }
        expect(rect.x).toBe(1130);
    });

    test("gear use href is #icon-gear", () => {
        const nodes = guitarNodes(model, noRaise);
        const settingsG = nodes[1];
        if (settingsG.type !== "g") {
            throw new Error();
        }
        const useEl = settingsG.children[1];
        if (useEl.type !== "use") {
            throw new Error();
        }
        expect(useEl.href).toBe("#icon-gear");
    });
});
