import { describe, expect, test } from "bun:test";
import * as music from "../music";
import { defaultState } from "../update/test-default-state";
import { updateScale } from "../update/updateScale";
import { circleNodes } from "./circle";

const model = updateScale({ ...defaultState });
const noRaise = () => {};

// Indexes into the main g's children array
const LABEL_CHILD_IDX = 0;
const NOTE_GROUP_IDX = 1;
const INTERVAL_GROUP_IDX = 2;
const CHORD_GROUP_IDX = 3;

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

    test("main g has 4 children: label text + 3 segment groups", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        expect(nodes[1].children).toHaveLength(4);
    });

    test("first child of main g is label text", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const label = nodes[1].children[LABEL_CHILD_IDX];
        expect(label.type).toBe("text");
        if (label.type !== "text") {
            throw new Error();
        }
        expect(label.content).toBe("Chromatic");
        expect(label.textAnchor).toBe("middle");
        expect(label.x).toBe(0);
        expect(label.y).toBe(0);
    });

    test("note segment group has 12 segment children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[NOTE_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("segment");
        }
    });

    test("interval segment group has 12 segment children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[INTERVAL_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("segment");
        }
    });

    test("chord segment group has 12 segment children", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[CHORD_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        expect(g.children).toHaveLength(12);
        for (const c of g.children) {
            expect(c.type).toBe("segment");
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
        const g = nodes[1].children[NOTE_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        for (const c of g.children) {
            if (c.type !== "segment") {
                throw new Error();
            }
            expect(c.class).toContain("note-segment");
        }
    });

    test("7 scale-note paths (note-segment-scale or note-segment-tonic)", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[NOTE_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const scaleNotes = g.children.filter(
            (c) =>
                c.type === "segment" &&
                (c.class?.includes("note-segment-scale") || c.class?.includes("note-segment-tonic")),
        );
        expect(scaleNotes).toHaveLength(7);
    });

    test("5 non-scale paths have only note-segment class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[NOTE_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const nonScale = g.children.filter(
            (c) =>
                c.type === "segment" &&
                !c.class?.includes("note-segment-scale") &&
                !c.class?.includes("note-segment-tonic"),
        );
        expect(nonScale).toHaveLength(5);
    });

    test("exactly one path has note-segment-tonic class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[NOTE_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const tonic = g.children.filter((c) => c.type === "segment" && c.class?.includes("note-segment-tonic"));
        expect(tonic).toHaveLength(1);
    });

    test("tonic path is at the segment whose note index matches model.state.index", () => {
        // defaultState index=0 (A). With circleIsCNoon=true (offset=3), A is at position 9
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[NOTE_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const tonicIdx = g.children.findIndex((c) => c.type === "segment" && c.class?.includes("note-segment-tonic"));
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
        const g = nodesC[1].children[NOTE_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        // With circleIsCNoon=true (offset=3), C(3) → (3+3)%12=6 is at position 0
        const tonicIdx = g.children.findIndex((c) => c.type === "segment" && c.class?.includes("note-segment-tonic"));
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
        const g = nodes[1].children[INTERVAL_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const selected = g.children.filter((c) => c.type === "segment" && c.class?.includes("degree-segment-selected"));
        expect(selected).toHaveLength(7);
    });

    test("5 non-scale interval segments have interval-segment class", () => {
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[INTERVAL_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const unselected = g.children.filter((c) => c.type === "segment" && c.class === "interval-segment");
        expect(unselected).toHaveLength(5);
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
        const g = nodes[1].children[CHORD_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const typed = g.children.filter(
            (c) =>
                c.type === "segment" &&
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
        const g = nodes[1].children[CHORD_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const plain = g.children.filter((c) => c.type === "segment" && c.class === "chord-segment");
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
        const g = nodes[1].children[NOTE_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const path = g.children[0];
        if (path.type !== "segment" || !path.onClick) {
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
        const g = nodes[1].children[INTERVAL_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const path = g.children[0];
        if (path.type !== "segment" || !path.onClick) {
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
        const g = nodes[1].children[CHORD_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const path = g.children[0];
        if (path.type !== "segment" || !path.onClick) {
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
        const noteSegmentGroup = nodes[1].children[NOTE_GROUP_IDX];
        if (noteSegmentGroup.type !== "g") {
            throw new Error();
        }
        const firstSegment = noteSegmentGroup.children[0];
        if (firstSegment.type !== "segment") {
            throw new Error();
        }
        expect(firstSegment.label).toBe("C");
    });

    test("with circleIsCNoon false, A is at position 0", () => {
        const modelFalse = updateScale({ ...defaultState, circleIsCNoon: false });
        const view = circleNodes(music.chromatic(), "Chromatic", 500);
        const nodes = view(modelFalse, noRaise);

        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const noteSegmentGroup = nodes[1].children[NOTE_GROUP_IDX];
        if (noteSegmentGroup.type !== "g") {
            throw new Error();
        }
        const firstSegment = noteSegmentGroup.children[0];
        if (firstSegment.type !== "segment") {
            throw new Error();
        }
        expect(firstSegment.label).toBe("A");
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
        const segGroupTrue = nodesTrue[1].children[NOTE_GROUP_IDX];
        const segGroupFalse = nodesFalse[1].children[NOTE_GROUP_IDX];
        if (segGroupTrue.type !== "g" || segGroupFalse.type !== "g") {
            throw new Error();
        }

        const seg0True = segGroupTrue.children[0];
        const seg0False = segGroupFalse.children[0];
        if (seg0True.type !== "segment" || seg0False.type !== "segment") {
            throw new Error();
        }
        expect(seg0True.label).not.toBe(seg0False.label);
    });
});

// ─── segment labels ───────────────────────────────────────────────────────────

describe("circleNodes - segment labels", () => {
    // With circleIsCNoon=true (offset=3) and tonic A (index 0):
    //   position 9 → note index 0 = A (tonic)
    //   position 0 → note index 3 = C

    const view = circleNodes(music.chromatic(), "Chromatic", 500);
    const nodes = view(model, noRaise);

    if (nodes[1].type !== "g") {
        throw new Error();
    }
    const noteGroup = nodes[1].children[NOTE_GROUP_IDX];
    const intervalGroup = nodes[1].children[INTERVAL_GROUP_IDX];
    const chordGroup = nodes[1].children[CHORD_GROUP_IDX];
    if (noteGroup.type !== "g" || intervalGroup.type !== "g" || chordGroup.type !== "g") {
        throw new Error();
    }

    test("note segment at tonic position (9) has label 'A'", () => {
        const seg = noteGroup.children[9];
        if (seg.type !== "segment") {
            throw new Error();
        }
        expect(seg.label).toBe("A");
    });

    test("note segment at position 0 (C noon) has label 'C'", () => {
        const seg = noteGroup.children[0];
        if (seg.type !== "segment") {
            throw new Error();
        }
        expect(seg.label).toBe("C");
    });

    test("interval segment at tonic position (9) has intervalName '1'", () => {
        // Tonic = A, interval ord=0 type=Nat → getIntervalName gives "" + (0+1) = "1"
        const seg = intervalGroup.children[9];
        if (seg.type !== "segment") {
            throw new Error();
        }
        expect(seg.label).toBe("1");
    });

    test("interval segments for scale notes have non-empty labels", () => {
        const scaleSegments = intervalGroup.children.filter(
            (c) => c.type === "segment" && c.class?.includes("degree-segment-selected"),
        );
        for (const c of scaleSegments) {
            if (c.type !== "segment") {
                throw new Error();
            }
            expect(c.label.length).toBeGreaterThan(0);
        }
    });

    test("chord segment at tonic position (9) has roman numeral 'I'", () => {
        // A major chord = uppercase I
        const seg = chordGroup.children[9];
        if (seg.type !== "segment") {
            throw new Error();
        }
        expect(seg.label).toBe("I");
    });

    test("chord segments for non-scale notes have empty labels", () => {
        const nonScaleSegments = chordGroup.children.filter((c) => c.type === "segment" && c.class === "chord-segment");
        for (const c of nonScaleSegments) {
            if (c.type !== "segment") {
                throw new Error();
            }
            expect(c.label).toBe("");
        }
    });
});

// ─── segment selection ────────────────────────────────────────────────────────

describe("circleNodes - segment selection", () => {
    const view = circleNodes(music.chromatic(), "Chromatic", 500);

    test("interval segments have no selection when no notes are toggled", () => {
        const nodes = view(model, noRaise);
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[INTERVAL_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const withSelection = g.children.filter((c) => c.type === "segment" && c.selection !== undefined);
        expect(withSelection).toHaveLength(0);
    });

    test("chord segments have no selection when no chord is selected", () => {
        // defaultState has chordIndex: -1
        const nodes = view(model, noRaise);
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[CHORD_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const withSelection = g.children.filter((c) => c.type === "segment" && c.selection !== undefined);
        expect(withSelection).toHaveLength(0);
    });

    test("with A chord selected, 3 interval segments have selection (root, 3rd, 5th)", () => {
        // chordIndex=0 selects the A chord; chordIntervals=[0,2,4] → A(pos 9), C#(pos 1), E(pos 4)
        const modelWithChord = updateScale({ ...defaultState, chordIndex: 0 });
        const nodes = view(modelWithChord, noRaise);
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[INTERVAL_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const withSelection = g.children.filter((c) => c.type === "segment" && c.selection !== undefined);
        expect(withSelection).toHaveLength(3);
    });

    test("toggled interval segments have selection.class 'interval-note-selected'", () => {
        const modelWithChord = updateScale({ ...defaultState, chordIndex: 0 });
        const nodes = view(modelWithChord, noRaise);
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[INTERVAL_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const toggled = g.children.filter((c) => c.type === "segment" && c.selection !== undefined);
        for (const c of toggled) {
            if (c.type !== "segment" || !c.selection) {
                throw new Error();
            }
            expect(c.selection.class).toBe("interval-note-selected");
        }
    });

    test("toggled interval segments have selection.fill as a hex colour string", () => {
        const modelWithChord = updateScale({ ...defaultState, chordIndex: 0 });
        const nodes = view(modelWithChord, noRaise);
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[INTERVAL_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const toggled = g.children.filter((c) => c.type === "segment" && c.selection !== undefined);
        for (const c of toggled) {
            if (c.type !== "segment" || !c.selection) {
                throw new Error();
            }
            expect(c.selection.fill).toMatch(/^#[0-9a-f]{6}$/);
        }
    });

    test("chord root segment (A at position 9) has selection when A chord is selected", () => {
        const modelWithChord = updateScale({ ...defaultState, chordIndex: 0 });
        const nodes = view(modelWithChord, noRaise);
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[CHORD_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const seg = g.children[9]; // A is at position 9 with circleIsCNoon=true
        if (seg.type !== "segment") {
            throw new Error();
        }
        expect(seg.selection).toBeDefined();
    });

    test("chord root selection.class matches the chord type (A major → chord-segment-major)", () => {
        const modelWithChord = updateScale({ ...defaultState, chordIndex: 0 });
        const nodes = view(modelWithChord, noRaise);
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[CHORD_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const seg = g.children[9];
        if (seg.type !== "segment" || !seg.selection) {
            throw new Error();
        }
        expect(seg.selection.class).toBe("chord-segment-major");
    });

    test("exactly one chord segment has selection when a chord is selected", () => {
        const modelWithChord = updateScale({ ...defaultState, chordIndex: 0 });
        const nodes = view(modelWithChord, noRaise);
        if (nodes[1].type !== "g") {
            throw new Error();
        }
        const g = nodes[1].children[CHORD_GROUP_IDX];
        if (g.type !== "g") {
            throw new Error();
        }
        const withSelection = g.children.filter((c) => c.type === "segment" && c.selection !== undefined);
        expect(withSelection).toHaveLength(1);
    });
});
