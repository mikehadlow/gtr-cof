import { describe, expect, test } from "bun:test";
import type { Msg } from "../message";
import * as music from "../music";
import { scaleFamilyNodes } from "./scale-family";

const noRaise = (_msg: Msg): void => {};

describe("scaleFamilyNodes", () => {
    test("returns one node per scale family", () => {
        const nodes = scaleFamilyNodes({} as never, noRaise);
        expect(nodes.length).toBe(music.scaleFamily.length);
    });

    test("each node is a div with dropdown-content-item class", () => {
        const nodes = scaleFamilyNodes({} as never, noRaise);
        for (const node of nodes) {
            expect(node.type).toBe("div");
            if (node.type === "div") {
                expect(node.class).toBe("dropdown-content-item");
            }
        }
    });

    test("textContent matches scale family name", () => {
        const nodes = scaleFamilyNodes({} as never, noRaise);
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.type === "div") {
                expect(node.textContent).toBe(music.scaleFamily[i].name);
            }
        }
    });

    test("click handler raises ScaleFamilyChange with correct scaleFamily", () => {
        const raised: Msg[] = [];
        const nodes = scaleFamilyNodes({} as never, (msg) => raised.push(msg));
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.type === "div" && node.onClick) {
                node.onClick();
                const msg = raised[i];
                expect(msg.id).toBe("ScaleFamilyChange");
                if (msg.id === "ScaleFamilyChange") {
                    expect(msg.scaleFamily).toBe(music.scaleFamily[i]);
                }
            }
        }
    });

    test("produces 5 nodes for the 5 built-in scale families", () => {
        const nodes = scaleFamilyNodes({} as never, noRaise);
        expect(nodes.length).toBe(5);
    });
});
