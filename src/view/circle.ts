import type { Msg } from "../message";
import { next, previous } from "../mod";
import type { Model } from "../model";
import * as music from "../music";
import type { View } from "../types";
import type { RenderNode } from "../ui";
import { settingsIconNodes } from "../ui";

type Segment = {
    readonly startAngle: number;
    readonly endAngle: number;
    readonly index: number;
    readonly start: boolean;
    readonly end: boolean;
};

export const circleNodes = (noteIndexes: number[], label: string, svgWidth: number): View<Model, Msg, RenderNode> => {
    return (model: Model, raise: (msg: Msg) => void): RenderNode[] => {
        const offset = model.state.circleIsCNoon ? 3 : 0;
        const nodeByIndex = new Map(model.music.nodes.map((n) => [n.scaleNote.note.index, n]));
        const segments = generateSegments(rotate(noteIndexes, offset), nodeByIndex);

        const cx = 250;
        const cy = 250;

        const chordRadiusX = { inner: 202, outer: 242 };
        const tonicRadius = { inner: 135, outer: 198 };
        const intervalRadius = { inner: 90, outer: 135 };

        const noteSegments: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const cls =
                "note-segment" +
                (node.scaleNote.isScaleNote
                    ? node.scaleNote.isTonic
                        ? " note-segment-tonic"
                        : " note-segment-scale"
                    : "");
            return {
                type: "segment",
                class: cls,
                label: node.scaleNote.note.label,
                labelClass: "note-segment-text",
                radius: tonicRadius,
                angle: { start: seg.startAngle, end: seg.endAngle },
                rouding: {
                    outerStart: seg.start,
                    outerEnd: seg.end,
                    innerEnd: false,
                    innerStart: false,
                },
                onClick: () =>
                    raise({
                        id: "TonicChanged",
                        noteSpec: replaceDoubleSharpsAndFlatsWithEquivalentNote(node.scaleNote.note),
                    }),
            };
        });

        const intervalSegments: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const selection: { selection?: { class: string } } = node.toggle
                ? {
                      selection: {
                          class: `interval-note-selected ${node.chordInterval.colour.replace("color", "fill")}`,
                      },
                  }
                : {};
            return {
                type: "segment",
                class: node.scaleNote.isScaleNote ? "degree-segment-selected" : "interval-segment",
                label: node.intervalName,
                labelClass: "degree-segment-text",
                radius: intervalRadius,
                angle: { start: seg.startAngle, end: seg.endAngle },
                rouding: {
                    outerStart: false,
                    outerEnd: false,
                    innerEnd: seg.end,
                    innerStart: seg.start,
                },
                onClick: () =>
                    raise({
                        id: "Toggle",
                        index: node.scaleNote.note.index,
                    }),
                ...selection,
            };
        });

        const chordSegments: RenderNode[] = segments.map((seg) => {
            const node = nodeByIndex.get(seg.index) ?? music.nullNode;
            const cls = node.scaleNote.isScaleNote ? getChordSegmentClass(node.scaleNote.chord!) : "chord-segment";
            const selection: { selection?: { class: string; fill?: string } } = node.isChordRoot
                ? {
                      selection: {
                          class: getChordSegmentClass(node.scaleNote.chord!),
                      },
                  }
                : {};
            return {
                type: "segment",
                class: cls,
                label: node.scaleNote.chord?.romanNumeral ?? "",
                labelClass: "degree-segment-text",
                radius: chordRadiusX,
                angle: { start: seg.startAngle, end: seg.endAngle },
                rouding: {
                    outerStart: seg.start,
                    outerEnd: seg.end,
                    innerEnd: seg.end,
                    innerStart: seg.start,
                },
                onClick: () =>
                    raise({
                        id: "ChordChanged",
                        chordIndex: node.scaleNote.note.index,
                    }),
                ...selection,
            };
        });

        return [
            ...settingsIconNodes(svgWidth, () => raise({ id: "ModalStateChange", modalState: "circle-settings" })),
            {
                type: "g",
                transform: `translate(${cx}, ${cy})`,
                children: [
                    { type: "text", x: 0, y: 0, class: "svg-text", textAnchor: "middle", content: label },
                    { type: "g", children: noteSegments },
                    { type: "g", children: intervalSegments },
                    { type: "g", children: chordSegments },
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

function generateSegments(fifths: number[], nodes: Map<number, music.Node>): Segment[] {
    const count = fifths.length;
    const angle = Math.PI * (2 / count);
    return fifths.map((index, i) => {
        const [isStart, isEnd] = isStartOrEnd(fifths, nodes, i);
        const itemAngle = angle * i - angle / 2;
        return {
            startAngle: itemAngle,
            endAngle: itemAngle + angle,
            index,
            start: isStart,
            end: isEnd,
        };
    });
}

function isStartOrEnd(fifths: number[], nodes: Map<number, music.Node>, i: number): [boolean, boolean] {
    const currentNode = nodes.get(fifths[i]);
    const previousNode = nodes.get(previous(fifths, i));
    const nextNode = nodes.get(next(fifths, i));
    if (currentNode?.scaleNote.isScaleNote) {
        return [!previousNode?.scaleNote.isScaleNote, !nextNode?.scaleNote.isScaleNote];
    }
    return [false, false];
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
