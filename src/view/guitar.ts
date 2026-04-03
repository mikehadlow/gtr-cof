import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { FretboardLabelType, View } from "../types";
import type { RenderNode } from "../ui";
import { settingsIconNodes } from "../ui";
import * as tuning from "./tuning";

type StringNote = {
    readonly octave: number;
    readonly index: number;
    readonly node: music.Node;
};

const stringGap = 40;
const fretGap = 70;
const fretWidth = 5;
const noteRadius = 15;
const pad = 20;
const numberOfFrets = 16;

const svgWidth = 1160;

function noteX(i: number): number {
    return i * fretGap + pad + 30;
}

function noteFill(sn: StringNote, hasToggledNotes: boolean): string {
    if (sn.node.toggle) {
        return "white";
    }
    if (sn.node.scaleNote.isScaleNote) {
        if (sn.node.scaleNote.isTonic) {
            return hasToggledNotes ? "white" : "#FFE000";
        }
        return "white";
    }
    return "rgba(255, 255, 255, 0.01)";
}

function noteStroke(sn: StringNote, hasToggledNotes: boolean): string {
    if (sn.node.midiToggle) {
        return "OrangeRed";
    }
    if (sn.node.toggle) {
        return `#${sn.node.chordInterval.colour.toString(16).padStart(6, "0")}`;
    }
    if (hasToggledNotes) {
        return "none";
    }
    if (sn.node.scaleNote.isScaleNote) {
        return "#1A1A2E";
    }
    return "none";
}

function noteStrokeWidth(sn: StringNote): number {
    if (sn.node.midiToggle) {
        return 10;
    }
    if (sn.node.toggle) {
        return 4;
    }
    if (sn.node.scaleNote.isScaleNote) {
        return 2;
    }
    return 0;
}

function labelText(sn: StringNote, labelType: FretboardLabelType): string {
    const visible = sn.node.scaleNote.isScaleNote || sn.node.toggle;
    if (!visible) {
        return "";
    }
    switch (labelType) {
        case "None":
            return "";
        case "NoteName":
            return sn.node.scaleNote.note.label;
        case "Interval":
            return sn.node.intervalName;
        default:
            throw new Error(`Unexpected label type: ${labelType}`);
    }
}

function allNotesFromWithNodes(startIndex: number, nodeByIndex: Map<number, music.Node>): StringNote[] {
    const items: StringNote[] = [];
    for (let i = 0; i < numberOfFrets; i++) {
        const idx = (i + startIndex) % 12;
        items.push({
            octave: Math.floor((i + 1) / 12),
            index: idx,
            node: nodeByIndex.get(idx) ?? music.nullNode,
        });
    }
    return items;
}

export const guitarNodes: View<Model, Msg, RenderNode> = (model: Model, raise: (msg: Msg) => void): RenderNode[] => {
    const { tuningIndex, isLeftHanded, isNutFlipped, fretboardLabelType } = model.state;
    const tuningInfo = tuning.tunings[tuningIndex];
    const nodeByIndex = new Map(model.music.nodes.map((n) => [n.scaleNote.note.index, n]));
    const hasToggledNotes = model.music.nodes.some((x) => x.toggle);

    const titleContent =
        tuningInfo.tuning +
        " " +
        tuningInfo.description +
        (isLeftHanded ? ", Left Handed" : "") +
        (isNutFlipped ? ", Nut Flipped" : "");

    const titleNode: RenderNode = {
        type: "text",
        x: 30,
        y: 15,
        class: "mode-text",
        content: titleContent,
    };

    const fretRects: RenderNode[] = Array.from(
        { length: numberOfFrets },
        (_, i): RenderNode => ({
            type: "rect",
            x: (i + 1) * fretGap + pad - fretWidth,
            y: pad + stringGap / 2 - fretWidth,
            width: fretWidth,
            height: stringGap * (tuningInfo.notes.length - 1) + fretWidth * 2,
            fill: i === 0 ? "black" : "none",
            stroke: "grey",
            strokeWidth: 1,
        }),
    );

    const dotCircles: RenderNode[] = tuningInfo.dots.map(
        ([fret, pos]): RenderNode => ({
            type: "circle",
            r: 10,
            cx: fret * fretGap + pad + 30 + pos * 10,
            cy: tuningInfo.notes.length * stringGap + pad + 15,
            fill: "lightgrey",
        }),
    );

    const stringOrder = isNutFlipped ? tuningInfo.notes.slice() : tuningInfo.notes.slice().reverse();

    const stringGroups: RenderNode[] = stringOrder.map((startIndex, si): RenderNode => {
        const fretNotes = allNotesFromWithNodes(startIndex, nodeByIndex);

        const stringLine: RenderNode = {
            type: "line",
            x1: pad + fretGap,
            y1: stringGap / 2,
            x2: pad + fretGap * numberOfFrets + 20,
            y2: stringGap / 2,
            stroke: "black",
            strokeWidth: 2,
        };

        const noteCircles: RenderNode[] = fretNotes.map(
            (sn, i): RenderNode => ({
                type: "circle",
                r: noteRadius,
                cy: stringGap / 2,
                cx: noteX(i),
                fill: noteFill(sn, hasToggledNotes),
                stroke: noteStroke(sn, hasToggledNotes),
                strokeWidth: noteStrokeWidth(sn),
                onClick: () => raise({ id: "Toggle", index: sn.index }),
            }),
        );

        const noteTexts: RenderNode[] = fretNotes.map((sn, i): RenderNode => {
            const x = isLeftHanded ? -noteX(i) : noteX(i);
            const transform = isLeftHanded ? "translate(0, 0) scale(-1, 1)" : "translate(0, 0) scale(1, 1)";
            return {
                type: "text",
                x,
                y: stringGap / 2 + 5,
                textAnchor: "middle",
                transform,
                content: labelText(sn, fretboardLabelType),
            };
        });

        return {
            type: "g",
            transform: `translate(0, ${si * stringGap + pad})`,
            children: [stringLine, ...noteCircles, ...noteTexts],
        };
    });

    const fretboardTransform = isLeftHanded ? "translate(1200, 0) scale(-1, 1)" : "translate(0, 0) scale(1, 1)";

    const fretboardGroup: RenderNode = {
        type: "g",
        transform: fretboardTransform,
        children: [{ type: "g", children: fretRects }, { type: "g", children: dotCircles }, ...stringGroups],
    };

    return [
        titleNode,
        ...settingsIconNodes(svgWidth, () => raise({ id: "ModalStateChange", modalState: "guitar-settings" })),
        fretboardGroup,
    ];
};
