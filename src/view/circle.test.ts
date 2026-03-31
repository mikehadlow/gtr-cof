import { describe, expect, test } from "bun:test";
import * as music from "../music";
import { defaultState } from "../update/test-default-state";
import { updateScale } from "../update/updateScale";
import { circleNodes } from "./circle";

const model = updateScale({ ...defaultState });
const noRaise = () => {};

// ─── structure ───────────────────────────────────────────────────────────────

describe("circleNodes - structure", () => {
    const view = circleNodes(music.chromatic(), "Chromatic", 500);
    const nodes = view(model, noRaise);

    test("returns 2 top-level nodes: settings g and main g", () => {
        expect(nodes).toHaveLength(2);
        expect(nodes[0].type).toBe("g");
        expect(nodes[1].type).toBe("g");
    });

    test("main g has translate(250, 250)", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        expect(nodes[1].transform).toBe("translate(250, 250)");
    });

    test("main g has 9 children: label text + 8 element groups", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        expect(nodes[1].children).toHaveLength(9);
    });

    test("first child of main g is label text", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const label = nodes[1].children[0];
        expect(label.type).toBe("text");
        if (label.type !== "text") {
            throw new Error();
        }
        expect(label.content).toBe("Chromatic");
        expect(label.textAnchor).toBe("middle");
        expect(label.x).toBe(0);
        expect(label.y).toBe(0);
    });

    test("note segment group (index 1) has 12 path children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[1];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("path");
        }
    });

    test("note text group (index 2) has 12 text children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[2];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("text");
        }
    });

    test("interval segment group (index 3) has 12 path children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[3];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("path");
        }
    });

    test("interval note group (index 4) has 12 circle children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[4];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("circle");
        }
    });

    test("interval text group (index 5) has 12 text children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[5];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("text");
        }
    });

    test("chord segment group (index 6) has 12 path children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[6];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("path");
        }
    });

    test("chord note group (index 7) has 12 circle children with r=28", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[7];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            if (c.type !== "circle") {
                throw new Error();
            }
            expect(c.r).toBe(28);
        }
    });

    test("chord text group (index 8) has 12 text children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[8];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("text");
        }
    });
});

// ─── note segments ────────────────────────────────────────────────────────────

describe("circleNodes - note segments", () => {
    const view = circleNodes(music.chromatic(), "Chromatic", 500);
    const nodes = view(model, noRaise);

    test("all paths have note-segment in class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[1];
        if (g.type !== "g") {
            throw new Error();
        }
        for (const c of g.children) {
            if (c.type !== "path") {
                throw new Error();
            }
            expect(c.class).toContain("note-segment");
        }
    });

    test("7 scale-note paths (note-segment-scale or note-segment-tonic)", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[1];
        if (g.type !== "g") {
            throw new Error();
        }
        const scaleNotes = g.children.filter(
            (c) =>
                c.type === "path" &&
                (c.class?.includes("note-segment-scale") || c.class?.includes("note-segment-tonic")),
        );
        expect(scaleNotes).toHaveLength(7);
    });

    test("5 non-scale paths have only note-segment class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[1];
        if (g.type !== "g") {
            throw new Error();
        }
        const nonScale = g.children.filter(
            (c) =>
                c.type === "path" &&
                !c.class?.includes("note-segment-scale") &&
                !c.class?.includes("note-segment-tonic"),
        );
        expect(nonScale).toHaveLength(5);
    });

    test("exactly one path has note-segment-tonic class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[1];
        if (g.type !== "g") {
            throw new Error();
        }
        const tonic = g.children.filter((c) => c.type === "path" && c.class?.includes("note-segment-tonic"));
        expect(tonic).toHaveLength(1);
    });

    test("tonic path is at the segment whose note index matches model.state.index", () => {
        // defaultState index=0 (A). With circleIsCNoon=true (offset=3), A is at position 9
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[1];
        if (g.type !== "g") {
            throw new Error();
        }
        const tonicIdx = g.children.findIndex((c) => c.type === "path" && c.class?.includes("note-segment-tonic"));
        // rotated chromatic with offset 3: [3,4,5,6,7,8,9,10,11,0,1,2] → A(0) is at position 9
        expect(tonicIdx).toBe(9);
    });

    test("tonic segment follows the model tonic, not a fixed position", () => {
        // Change tonic to C (natural index 2, chromatic index 3)
        const modelC = updateScale({ ...defaultState, index: 3, naturalIndex: 2 });
        const nodesC = view(modelC, noRaise);
        if (nodesC[1].type !== "g") {
            throw new Error();
        }
        const g = nodesC[1].children[1];
        if (g.type !== "g") {
            throw new Error();
        }
        // With circleIsCNoon=true (offset=3), C(3) → (3+3)%12=6 is at position 0
        const tonicIdx = g.children.findIndex((c) => c.type === "path" && c.class?.includes("note-segment-tonic"));
        expect(tonicIdx).toBe(0);
    });
});

// ─── interval segments ────────────────────────────────────────────────────────

describe("circleNodes - interval segments", () => {
    const view = circleNodes(music.chromatic(), "Chromatic", 500);
    const nodes = view(model, noRaise);

    test("7 interval segment paths have degree-segment-selected class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[3];
        if (g.type !== "g") {
            throw new Error();
        }
        const selected = g.children.filter((c) => c.type === "path" && c.class?.includes("degree-segment-selected"));
        expect(selected).toHaveLength(7);
    });

    test("5 non-scale interval segments have interval-segment class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[3];
        if (g.type !== "g") {
            throw new Error();
        }
        const unselected = g.children.filter((c) => c.type === "path" && c.class === "interval-segment");
        expect(unselected).toHaveLength(5);
    });
});

// ─── interval note circles ───────────────────────────────────────────────────

describe("circleNodes - interval note circles", () => {
    const view = circleNodes(music.chromatic(), "Chromatic", 500);
    const nodes = view(model, noRaise);

    test("all interval note circles have r=25 and pointer-events none", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[4];
        if (g.type !== "g") {
            throw new Error();
        }
        for (const c of g.children) {
            if (c.type !== "circle") {
                throw new Error();
            }
            expect(c.r).toBe(25);
            expect(c.pointerEvents).toBe("none");
        }
    });

    test("untoggled interval notes have class interval-note and fill none", () => {
        // defaultState has no toggled notes
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[4];
        if (g.type !== "g") {
            throw new Error();
        }
        const untoggled = g.children.filter((c) => c.type === "circle" && c.class === "interval-note");
        expect(untoggled.length).toBeGreaterThan(0);
        for (const c of untoggled) {
            if (c.type !== "circle") {
                throw new Error();
            }
            expect(c.fill).toBe("none");
        }
    });
});

// ─── chord segments ───────────────────────────────────────────────────────────

describe("circleNodes - chord segments", () => {
    const view = circleNodes(music.chromatic(), "Chromatic", 500);
    const nodes = view(model, noRaise);

    test("scale note chord segments have chord type class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[6];
        if (g.type !== "g") {
            throw new Error();
        }
        const typed = g.children.filter(
            (c) =>
                c.type === "path" &&
                (c.class?.includes("chord-segment-major") ||
                    c.class?.includes("chord-segment-minor") ||
                    c.class?.includes("chord-segment-dim") ||
                    c.class?.includes("chord-segment-aug")),
        );
        expect(typed).toHaveLength(7);
    });

    test("non-scale chord segments have chord-segment class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[6];
        if (g.type !== "g") {
            throw new Error();
        }
        const plain = g.children.filter((c) => c.type === "path" && c.class === "chord-segment");
        expect(plain).toHaveLength(5);
    });
});

// ─── click handlers ───────────────────────────────────────────────────────────

describe("circleNodes - click handlers", () => {
    const view = circleNodes(music.chromatic(), "Chromatic", 500);

    test("clicking note segment path raises TonicChanged", () => {
        let raised: any = null;
        const nodes = view(model, (msg: any) => {
            raised = msg;
        });
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[1];
        if (g.type !== "g") {
            throw new Error();
        }
        const path = g.children[0];
        if (path.type !== "path" || !path.onClick) {
            throw new Error("no onClick");
        }
        path.onClick();
        expect(raised?.id).toBe("TonicChanged");
        expect(raised?.noteSpec).toBeDefined();
    });

    test("clicking interval segment path raises Toggle", () => {
        let raised: any = null;
        const nodes = view(model, (msg: any) => {
            raised = msg;
        });
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[3];
        if (g.type !== "g") {
            throw new Error();
        }
        const path = g.children[0];
        if (path.type !== "path" || !path.onClick) {
            throw new Error("no onClick");
        }
        path.onClick();
        expect(raised?.id).toBe("Toggle");
        expect(raised?.index).toBeDefined();
    });

    test("clicking chord segment path raises ChordChanged", () => {
        let raised: any = null;
        const nodes = view(model, (msg: any) => {
            raised = msg;
        });
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[6];
        if (g.type !== "g") {
            throw new Error();
        }
        const path = g.children[0];
        if (path.type !== "path" || !path.onClick) {
            throw new Error("no onClick");
        }
        path.onClick();
        expect(raised?.id).toBe("ChordChanged");
        expect(raised?.chordIndex).toBeDefined();
    });

    test("clicking settings icon rect raises ModalStateChange circle-settings", () => {
        let raised: any = null;
        const nodes = view(model, (msg: any) => {
            raised = msg;
        });
        const settingsG = nodes[0];
        if (settingsG.type !== "g") {
            throw new Error();
        }
        const rect = settingsG.children[0];
        if (rect.type !== "rect" || !rect.onClick) {
            throw new Error("no onClick on rect");
        }
        rect.onClick();
        expect(raised?.id).toBe("ModalStateChange");
        expect(raised?.modalState).toBe("circle-settings");
    });
});

// ─── settings icon position ───────────────────────────────────────────────────

describe("circleNodes - settings icon", () => {
    test("gear rect x = svgWidth - 30", () => {
        const view = circleNodes(music.chromatic(), "Chromatic", 500);
        const nodes = view(model, noRaise);
        const settingsG = nodes[0];
        if (settingsG.type !== "g") {
            throw new Error();
        }
        const rect = settingsG.children[0];
        if (rect.type !== "rect") {
            throw new Error();
        }
        expect(rect.x).toBe(470);
    });

    test("gear use href is #icon-gear", () => {
        const view = circleNodes(music.chromatic(), "Chromatic", 500);
        const nodes = view(model, noRaise);
        const settingsG = nodes[0];
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

// ─── circleIsCNoon rotation ───────────────────────────────────────────────────

describe("circleNodes - circleIsCNoon", () => {
    // chromatic index 0 = A, index 3 = C
    // circleIsCNoon=true (offset=3): position 0 has note index 3 (C) → C at noon
    // circleIsCNoon=false (offset=0): position 0 has note index 0 (A)

    test("with circleIsCNoon true, C is at position 0 (noon)", () => {
        const modelTrue = updateScale({ ...defaultState, circleIsCNoon: true });
        const view = circleNodes(music.chromatic(), "Chromatic", 500);
        const nodes = view(modelTrue, noRaise);

        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const noteTextGroup = nodes[1].children[2];
        if (noteTextGroup.type !== "g") {
            throw new Error();
        }
        const firstText = noteTextGroup.children[0];
        if (firstText.type !== "text") {
            throw new Error();
        }
        expect(firstText.content).toBe("C");
    });

    test("with circleIsCNoon false, A is at position 0", () => {
        const modelFalse = updateScale({ ...defaultState, circleIsCNoon: false });
        const view = circleNodes(music.chromatic(), "Chromatic", 500);
        const nodes = view(modelFalse, noRaise);

        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const noteTextGroup = nodes[1].children[2];
        if (noteTextGroup.type !== "g") {
            throw new Error();
        }
        const firstText = noteTextGroup.children[0];
        if (firstText.type !== "text") {
            throw new Error();
        }
        expect(firstText.content).toBe("A");
    });

    test("circleIsCNoon true vs false show different note text at position 0", () => {
        const view = circleNodes(music.chromatic(), "Chromatic", 500);
        const modelTrue = updateScale({ ...defaultState, circleIsCNoon: true });
        const modelFalse = updateScale({ ...defaultState, circleIsCNoon: false });

        const nodesTrue = view(modelTrue, noRaise);
        const nodesFalse = view(modelFalse, noRaise);

        if (nodesTrue[1].type !== "g" || nodesFalse[1].type !== "g") {
            throw new Error();
        }
        const textGroupTrue = nodesTrue[1].children[2];
        const textGroupFalse = nodesFalse[1].children[2];
        if (textGroupTrue.type !== "g" || textGroupFalse.type !== "g") {
            throw new Error();
        }

        const text0True = textGroupTrue.children[0];
        const text0False = textGroupFalse.children[0];
        if (text0True.type !== "text" || text0False.type !== "text") {
            throw new Error();
        }
        expect(text0True.content).not.toBe(text0False.content);
    });
});
