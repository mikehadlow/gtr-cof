import { describe, expect, test } from "bun:test";
import type { Msg } from "../message";
import * as music from "../music";
import type { State } from "../types";
import { scaleFamilySelectNodes } from "./scale-family";

const defaultState: State = {
    index: 0,
    naturalIndex: 0,
    chordIndex: -1,
    chordIntervals: [0, 2, 4],
    toggledNotesBitmask: 0,
    scaleFamilyIndex: 0,
    modeIndex: 0,
    midiToggledNotesBitmask: 0,
    isLeftHanded: false,
    isNutFlipped: false,
    fretboardLabelType: "None",
    circleIsCNoon: true,
    tuningIndex: 0,
    modalState: "closed",
    sound: false,
};

const noRaise = (_msg: Msg): void => {};

describe("scaleFamilySelectNodes", () => {
    test("returns a single selectHtml node", () => {
        const model = { state: defaultState, music: { nodes: [], mode: music.scaleFamily[0].modes[0] } };
        const nodes = scaleFamilySelectNodes(model, noRaise);
        expect(nodes.length).toBe(1);
        expect(nodes[0].type).toBe("selectHtml");
    });

    test("options match all scale families", () => {
        const model = { state: defaultState, music: { nodes: [], mode: music.scaleFamily[0].modes[0] } };
        const nodes = scaleFamilySelectNodes(model, noRaise);
        const node = nodes[0];
        if (node.type === "selectHtml") {
            expect(node.options.length).toBe(music.scaleFamily.length);
            for (let i = 0; i < music.scaleFamily.length; i++) {
                expect(node.options[i].label).toBe(music.scaleFamily[i].name);
                expect(node.options[i].value).toBe(String(music.scaleFamily[i].index));
            }
        }
    });

    test("selectedValue reflects current scaleFamilyIndex", () => {
        const model = {
            state: { ...defaultState, scaleFamilyIndex: 2 },
            music: { nodes: [], mode: music.scaleFamily[2].modes[0] },
        };
        const nodes = scaleFamilySelectNodes(model, noRaise);
        const node = nodes[0];
        if (node.type === "selectHtml") {
            expect(node.selectedValue).toBe("2");
        }
    });

    test("onChange raises ScaleFamilyChange with the correct scaleFamily", () => {
        const raised: Msg[] = [];
        const model = { state: defaultState, music: { nodes: [], mode: music.scaleFamily[0].modes[0] } };
        const nodes = scaleFamilySelectNodes(model, (msg) => raised.push(msg));
        const node = nodes[0];
        if (node.type === "selectHtml") {
            node.onChange("1");
            expect(raised.length).toBe(1);
            expect(raised[0].id).toBe("ScaleFamilyChange");
            if (raised[0].id === "ScaleFamilyChange") {
                expect(raised[0].scaleFamily).toBe(music.scaleFamily[1]);
            }
        }
    });
});
