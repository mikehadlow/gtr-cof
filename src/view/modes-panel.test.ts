import { describe, expect, test } from "bun:test";
import * as music from "../music";
import type { RenderNode } from "../ui";
import { defaultState } from "../update/test-default-state";
import { updateScale } from "../update/updateScale";
import { chordIntervalNodes } from "./chord-interval";
import { modesNodes } from "./modes";
import { tonicsNodes } from "./tonics";

const model = updateScale({ ...defaultState });
const noRaise = () => {};

// Recursively collect all nodes of a given type (DFS order)
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

// ─── chordIntervalNodes ────────────────────────────────────────────────────

describe("chordIntervalNodes", () => {
    const nodes = chordIntervalNodes(model, noRaise);

    test("returns a single top-level g node", () => {
        expect(nodes).toHaveLength(1);
        expect(nodes[0].type).toBe("g");
    });

    test("top-level g has transform translate(0, 240)", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        expect(nodes[0].transform).toBe("translate(0, 240)");
    });

    test("contains 7 child g nodes", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        expect(nodes[0].children).toHaveLength(7);
        for (const child of nodes[0].children) {
            expect(child.type).toBe("g");
        }
    });

    test("each child g contains a circle then a text", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        for (const child of nodes[0].children) {
            if (child.type !== "g") {
                throw new Error("expected g");
            }
            expect(child.children[0].type).toBe("circle");
            expect(child.children[1].type).toBe("text");
        }
    });

    test("circles for active intervals [0,2,4] have selected class", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        const active = new Set(defaultState.chordIntervals); // [0,2,4]
        nodes[0].children.forEach((child, i) => {
            if (child.type !== "g") {
                return;
            }
            const circle = child.children[0];
            if (circle.type !== "circle") {
                return;
            }
            if (active.has(i)) {
                expect(circle.class).toBe("mode-button mode-button-selected");
            } else {
                expect(circle.class).toBe("mode-button");
            }
        });
    });

    test("text labels are 1 through 7", () => {
        const texts = collect("text", nodes);
        expect(texts).toHaveLength(7);
        for (let i = 0; i < texts.length; i++) {
            expect(texts[i].content).toBe(`${i + 1}`);
        }
    });

    test("clicking interval 0 (selected) toggles it off — raises [2,4]", () => {
        let raised: { id: string; chordIntervals: number[] } | null = null;
        const ns = chordIntervalNodes(model, (msg: any) => {
            raised = msg;
        });
        if (ns[0].type !== "g") {
            throw new Error();
        }
        const child = ns[0].children[0]; // index 0
        if (child.type !== "g") {
            throw new Error();
        }
        const circle = child.children[0];
        if (circle.type !== "circle" || !circle.onClick) {
            throw new Error("no onClick");
        }
        circle.onClick();
        expect(raised!.id).toBe("ChordIntervalChange");
        expect(raised!.chordIntervals).toEqual([2, 4]);
    });

    test("clicking interval 1 (unselected) toggles it on — raises [0,1,2,4]", () => {
        let raised: { id: string; chordIntervals: number[] } | null = null;
        const ns = chordIntervalNodes(model, (msg: any) => {
            raised = msg;
        });
        if (ns[0].type !== "g") {
            throw new Error();
        }
        const child = ns[0].children[1]; // index 1
        if (child.type !== "g") {
            throw new Error();
        }
        const circle = child.children[0];
        if (circle.type !== "circle" || !circle.onClick) {
            throw new Error("no onClick");
        }
        circle.onClick();
        expect(raised!.chordIntervals).toEqual([0, 1, 2, 4]);
    });
});

// ─── modesNodes ────────────────────────────────────────────────────────────

describe("modesNodes", () => {
    const scaleFamily0 = music.scaleFamily[0];
    const nodes = modesNodes(model, noRaise);

    test("returns a single g node with translate(0, 280)", () => {
        expect(nodes).toHaveLength(1);
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        expect(nodes[0].transform).toBe("translate(0, 280)");
    });

    test("child count matches mode count in scale family 0", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        expect(nodes[0].children).toHaveLength(scaleFamily0.modes.length);
    });

    test("each child g has a rect then a text", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        for (const child of nodes[0].children) {
            if (child.type !== "g") {
                throw new Error("expected g");
            }
            expect(child.children[0].type).toBe("rect");
            expect(child.children[1].type).toBe("text");
        }
    });

    test("exactly one rect has the selected class", () => {
        const rects = collect("rect", nodes);
        const selected = rects.filter((r) => r.class?.includes("mode-button-selected"));
        expect(selected).toHaveLength(1);
    });

    test("active mode (modeIndex 0) rect has selected class", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        const activeModeArrayIdx = scaleFamily0.modes.findIndex((m) => m.index === model.state.modeIndex);
        const child = nodes[0].children[activeModeArrayIdx];
        if (child.type !== "g") {
            throw new Error("expected g");
        }
        const rect = child.children[0];
        expect(rect.type === "rect" && rect.class).toContain("mode-button-selected");
    });

    test("inactive mode rects have mode-button class only", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        const inactiveChildren = nodes[0].children.filter((_, i) => {
            const mode = scaleFamily0.modes[i];
            return mode.index !== model.state.modeIndex;
        });
        for (const child of inactiveChildren) {
            if (child.type !== "g") {
                throw new Error("expected g");
            }
            const rect = child.children[0];
            if (rect.type === "rect") {
                expect(rect.class).toBe("mode-button");
            }
        }
    });

    test("text labels match mode names", () => {
        const texts = collect("text", nodes);
        expect(texts).toHaveLength(scaleFamily0.modes.length);
        for (let i = 0; i < texts.length; i++) {
            expect(texts[i].content).toBe(scaleFamily0.modes[i].name);
        }
    });

    test("clicking a mode rect raises ModeChanged with that mode", () => {
        let raised: any = null;
        const ns = modesNodes(model, (msg: any) => {
            raised = msg;
        });
        if (ns[0].type !== "g") {
            throw new Error();
        }
        const child = ns[0].children[0];
        if (child.type !== "g") {
            throw new Error();
        }
        const rect = child.children[0];
        if (rect.type !== "rect" || !rect.onClick) {
            throw new Error("no onClick");
        }
        rect.onClick();
        expect(raised!.id).toBe("ModeChanged");
        expect(raised!.mode).toBe(scaleFamily0.modes[0]);
    });
});

// ─── tonicsNodes ───────────────────────────────────────────────────────────

describe("tonicsNodes", () => {
    const nodes = tonicsNodes(model, noRaise);

    test("returns a single top-level g node", () => {
        expect(nodes).toHaveLength(1);
        expect(nodes[0].type).toBe("g");
    });

    test("has 7 row g nodes (one per natural)", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        expect(nodes[0].children).toHaveLength(music.naturals.length);
    });

    test("each row has 3 button g nodes", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        for (const row of nodes[0].children) {
            if (row.type !== "g") {
                throw new Error("expected g");
            }
            expect(row.children).toHaveLength(3);
        }
    });

    test("each button g contains a rect then a text", () => {
        if (nodes[0].type !== "g") {
            throw new Error("expected g");
        }
        for (const row of nodes[0].children) {
            if (row.type !== "g") {
                throw new Error();
            }
            for (const btn of row.children) {
                if (btn.type !== "g") {
                    throw new Error();
                }
                expect(btn.children[0].type).toBe("rect");
                expect(btn.children[1].type).toBe("text");
            }
        }
    });

    test("total 21 rects and 21 texts", () => {
        expect(collect("rect", nodes)).toHaveLength(21);
        expect(collect("text", nodes)).toHaveLength(21);
    });

    test("exactly one rect has tonic-button-selected class", () => {
        const selected = collect("rect", nodes).filter((r) => r.class?.includes("tonic-button-selected"));
        expect(selected).toHaveLength(1);
    });

    test("selected rect's text matches the model tonic label", () => {
        const rects = collect("rect", nodes);
        const texts = collect("text", nodes);
        const selectedIdx = rects.findIndex((r) => r.class?.includes("tonic-button-selected"));
        const expectedLabel = music.createNoteSpec(defaultState.naturalIndex, defaultState.index).label;
        expect(texts[selectedIdx].content).toBe(expectedLabel);
    });

    test("some rects have tonic-button-grey class (enharmonic equivalents)", () => {
        const grey = collect("rect", nodes).filter((r) => r.class?.includes("tonic-button-grey"));
        expect(grey.length).toBeGreaterThan(0);
    });

    test("clicking a tonic rect raises TonicChanged with noteSpec", () => {
        let raised: any = null;
        const ns = tonicsNodes(model, (msg: any) => {
            raised = msg;
        });
        if (ns[0].type !== "g") {
            throw new Error();
        }
        const firstRow = ns[0].children[0];
        if (firstRow.type !== "g") {
            throw new Error();
        }
        const firstBtn = firstRow.children[0];
        if (firstBtn.type !== "g") {
            throw new Error();
        }
        const rect = firstBtn.children[0];
        if (rect.type !== "rect" || !rect.onClick) {
            throw new Error("no onClick");
        }
        rect.onClick();
        expect(raised!.id).toBe("TonicChanged");
        expect(raised!.noteSpec).toBeDefined();
    });
});
