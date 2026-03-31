import { describe, expect, test } from "bun:test";
import type { Msg } from "../../message";
import { tuningNodes, tunings } from "./index";

const noRaise = (_msg: Msg): void => {};

describe("tuningNodes", () => {
    test("returns one node per tuning", () => {
        const nodes = tuningNodes({} as never, noRaise);
        expect(nodes.length).toBe(tunings.length);
    });

    test("each node is a div with dropdown-content-item class", () => {
        const nodes = tuningNodes({} as never, noRaise);
        for (const node of nodes) {
            expect(node.type).toBe("div");
            if (node.type === "div") {
                expect(node.class).toBe("dropdown-content-item");
            }
        }
    });

    test("textContent format is '{tuning}   {description}'", () => {
        const nodes = tuningNodes({} as never, noRaise);
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const t = tunings[i];
            if (node.type === "div") {
                expect(node.textContent).toBe(`${t.tuning}   ${t.description}`);
            }
        }
    });

    test("click handler raises TuningChanged with correct index", () => {
        const raised: Msg[] = [];
        const nodes = tuningNodes({} as never, (msg) => raised.push(msg));
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.type === "div" && node.onClick) {
                node.onClick();
                const msg = raised[i];
                expect(msg.id).toBe("TuningChanged");
                if (msg.id === "TuningChanged") {
                    expect(msg.index).toBe(tunings[i].index);
                }
            }
        }
    });

    test("produces 27 nodes for the 27 built-in tunings", () => {
        const nodes = tuningNodes({} as never, noRaise);
        expect(nodes.length).toBe(27);
    });
});
