import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { SvgView } from "../types";
import type { RenderNode } from "../ui";
import { arcCentroid, arcPath, settingsIconNodes } from "../ui";

type Segment = {
    readonly startAngle: number;
    readonly endAngle: number;
    readonly index: number;
};

export const circleNodes = (noteIndexes: number[], label: string, svgWidth: number): SvgView<Model, Msg> => {
    return (model: Model, raise: (msg: Msg) => void): RenderNode[] => {
        const offset = model.state.circleIsCNoon ? 3 : 0;
        const segments = generateSegments(rotate(noteIndexes, offset));

        const pad = 50;
        const chordRadius = 240;
        const noteRadius = 200;
        const degreeRadius = 135;
        const innerRadius = 90;
        const cx = noteRadius + pad;
        const cy = noteRadius + pad;

        const nodeByIndex = new Map(model.music.nodes.map((n) => [n.scaleNote.note.index, n]));

        const noteSegments: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const isTonic = node.scaleNote.note.index === model.state.index;
            const cls =
                "note-segment" +
                (node.scaleNote.isScaleNote ? (isTonic ? " note-segment-tonic" : " note-segment-scale") : "");
            return {
                type: "path",
                d: arcPath(degreeRadius, noteRadius, seg.startAngle, seg.endAngle),
                class: cls,
                onClick: () =>
                    raise({
                        id: "TonicChanged",
                        noteSpec: replaceDoubleSharpsAndFlatsWithEquivalentNote(node.scaleNote.note),
                    }),
            };
        });

        const noteTexts: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const [x, y] = arcCentroid(degreeRadius, noteRadius, seg.startAngle, seg.endAngle);
            return {
                type: "text",
                x,
                y: y + 11,
                class: "note-segment-text",
                content: node.scaleNote.note.label,
            };
        });

        const intervalSegments: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            return {
                type: "path",
                d: arcPath(innerRadius, degreeRadius, seg.startAngle, seg.endAngle),
                class: node.scaleNote.isScaleNote ? "degree-segment-selected" : "interval-segment",
                onClick: () =>
                    raise({
                        id: "Toggle",
                        index: node.scaleNote.note.index,
                    }),
            };
        });

        const intervalNotes: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const [cx2, cy2] = arcCentroid(innerRadius, degreeRadius, seg.startAngle, seg.endAngle);
            const fill = node.toggle ? `#${node.chordInterval.colour.toString(16).padStart(6, "0")}` : "none";
            const stroke = node.midiToggle ? "OrangeRed" : node.toggle ? "black" : "none";
            const strokeWidth = node.midiToggle ? 20 : 2;
            return {
                type: "circle",
                cx: cx2,
                cy: cy2,
                r: 25,
                class: node.toggle ? "interval-note-selected" : "interval-note",
                fill,
                stroke,
                strokeWidth,
                pointerEvents: "none",
            };
        });

        const intervalTexts: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const [x, y] = arcCentroid(innerRadius, degreeRadius, seg.startAngle, seg.endAngle);
            return {
                type: "text",
                x,
                y: y + 8,
                class: "degree-segment-text",
                content: node.intervalName,
            };
        });

        const chordSegments: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const cls = node.scaleNote.isScaleNote ? getChordSegmentClass(node.scaleNote.chord!) : "chord-segment";
            return {
                type: "path",
                d: arcPath(noteRadius, chordRadius, seg.startAngle, seg.endAngle),
                class: cls,
                onClick: () =>
                    raise({
                        id: "ChordChanged",
                        chordIndex: node.scaleNote.note.index,
                    }),
            };
        });

        const chordNotes: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const [cx2, cy2] = arcCentroid(noteRadius, chordRadius, seg.startAngle, seg.endAngle);
            const cls = node.isChordRoot ? getChordSegmentClass(node.scaleNote.chord!) : "chord-segment-note";
            return {
                type: "circle",
                cx: cx2,
                cy: cy2,
                r: 28,
                class: cls,
                pointerEvents: "none",
            };
        });

        const chordTexts: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const [x, y] = arcCentroid(noteRadius, chordRadius, seg.startAngle, seg.endAngle);
            return {
                type: "text",
                x,
                y: y + 8,
                class: "degree-segment-text",
                content: node.scaleNote.chord?.romanNumeral ?? "",
            };
        });

        return [
            ...settingsIconNodes(svgWidth, () => raise({ id: "ModalStateChange", modalState: "circle-settings" })),
            {
                type: "g",
                transform: `translate(${cx}, ${cy})`,
                children: [
                    { type: "text", x: 0, y: 0, textAnchor: "middle", content: label },
                    { type: "g", children: noteSegments },
                    { type: "g", children: noteTexts },
                    { type: "g", children: intervalSegments },
                    { type: "g", children: intervalNotes },
                    { type: "g", children: intervalTexts },
                    { type: "g", children: chordSegments },
                    { type: "g", children: chordNotes },
                    { type: "g", children: chordTexts },
                ],
            },
        ];
    };
};

function getChordSegmentClass(chord: music.Chord): string {
    if (chord.type === "Diminished") {
        return "chord-segment-dim";
    }
    if (chord.type === "Augmented") {
        return "chord-segment-aug";
    }
    if (chord.type === "Minor") {
        return "chord-segment-minor";
    }
    if (chord.type === "Major") {
        return "chord-segment-major";
    }
    throw new Error("Unexpected ChordType");
}

function generateSegments(fifths: number[]): Segment[] {
    const count = fifths.length;
    const angle = Math.PI * (2 / count);
    return fifths.map((index, i) => {
        const itemAngle = angle * i - angle / 2;
        return { startAngle: itemAngle, endAngle: itemAngle + angle, index };
    });
}

function replaceDoubleSharpsAndFlatsWithEquivalentNote(noteSpec: music.NoteSpec): music.NoteSpec {
    if (Math.abs(noteSpec.offset) > 1) {
        const naturalId = noteSpec.natural.id;
        const newNaturalId = noteSpec.offset > 0 ? (naturalId + 1) % 7 : naturalId === 0 ? 6 : naturalId - 1;
        const newNatural = music.naturals.filter((x) => x.id === newNaturalId)[0];
        return music.createNoteSpec(newNatural.index, noteSpec.index);
    }
    return noteSpec;
}

function rotate(array: number[], offset: number): number[] {
    return array.map((item) => (item + offset) % 12);
}
