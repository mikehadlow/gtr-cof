import d3 from "d3";
import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { FretboardLabelType, Svg, SvgView, View, ViewContext } from "../types";
import type { RenderNode } from "../ui";
import { appendSettingsIcon, settingsIconNodes } from "../ui";
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

const indexer = (stringNote: StringNote): string => `${stringNote.index}_${stringNote.octave}`;

const svgWidth = 1160;

function noteX(i: number): number {
    return i * fretGap + pad + 30;
}

function noteFill(sn: StringNote, hasToggledNotes: boolean): string {
    if (sn.node.toggle) return "white";
    if (sn.node.scaleNote.isScaleNote) {
        if (sn.node.scaleNote.noteNumber === 0) {
            return hasToggledNotes ? "white" : "yellow";
        }
        return "white";
    }
    return "rgba(255, 255, 255, 0.01)";
}

function noteStroke(sn: StringNote, hasToggledNotes: boolean): string {
    if (sn.node.midiToggle) return "OrangeRed";
    if (sn.node.toggle) return `#${sn.node.chordInterval.colour.toString(16).padStart(6, "0")}`;
    if (hasToggledNotes) return "none";
    if (sn.node.scaleNote.isScaleNote) return "grey";
    return "none";
}

function noteStrokeWidth(sn: StringNote): number {
    if (sn.node.midiToggle) return 10;
    if (sn.node.toggle) return 4;
    if (sn.node.scaleNote.isScaleNote) return 2;
    return 0;
}

function labelText(sn: StringNote, labelType: FretboardLabelType): string {
    const visible = sn.node.scaleNote.isScaleNote || sn.node.toggle;
    if (!visible) return "";
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

export const guitarNodes: SvgView<Model, Msg> = (model: Model, raise: (msg: Msg) => void): RenderNode[] => {
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
        y: 11,
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

export const create = (): View<Model, Msg, Svg> => {
    // fretboard state
    let tuningIndex = 0;
    let isLeftHanded: boolean = false;
    let isNutFlipped: boolean = false;
    let fretboardLabelType: FretboardLabelType = "NoteName";

    let notes: d3.Selection<StringNote>;
    let noteLabels: d3.Selection<StringNote>;
    let fretboardElement: SVGGElement;

    const fretboardStateHasChanged = (model: Model): boolean =>
        tuningIndex !== model.state.tuningIndex ||
        isLeftHanded !== model.state.isLeftHanded ||
        isNutFlipped !== model.state.isNutFlipped ||
        fretboardLabelType !== model.state.fretboardLabelType;

    const setFretboardState = (model: Model): void => {
        tuningIndex = model.state.tuningIndex;
        isLeftHanded = model.state.isLeftHanded;
        isNutFlipped = model.state.isNutFlipped;
        fretboardLabelType = model.state.fretboardLabelType;
    };

    let _currentState: Model["state"];

    // return view function
    return (model: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
        _currentState = model.state;
        if (ctx.init || fretboardStateHasChanged(model)) {
            setFretboardState(model);
            drawFretboard(tuning.tunings[model.state.tuningIndex], raise);
        }
        update(model.music);
    };

    function drawFretboard(tuningInfo: tuning.Tuning, raise: (msg: Msg) => void): void {
        const fretData: Array<number> = getFretData(numberOfFrets);
        const dots: Array<[number, number]> = tuningInfo.dots;

        d3.selectAll("#gtr > *").remove();
        const svg = d3.select("#gtr");

        svg.append("text")
            .attr("class", "mode-text")
            .attr("x", 30)
            .attr("y", 11)
            .text(
                tuningInfo.tuning +
                    " " +
                    tuningInfo.description +
                    (isLeftHanded ? ", Left Handed" : "") +
                    (isNutFlipped ? ", Nut Flipped" : ""),
            );
        const gtr = svg.append("g").attr("transform", "translate(0, 0) scale(1, 1)");
        fretboardElement = <SVGGElement>gtr.node();

        appendSettingsIcon(svg, () => raise({ id: "ModalStateChange", modalState: "guitar-settings" }));

        // frets
        gtr.append("g")
            .selectAll("rect")
            .data(fretData)
            .enter()
            .append("rect")
            .attr("x", (_d, i) => (i + 1) * fretGap + pad - fretWidth)
            .attr("y", pad + stringGap / 2 - fretWidth)
            .attr("width", fretWidth)
            .attr("height", stringGap * (tuningInfo.notes.length - 1) + fretWidth * 2)
            .attr("fill", (_d, i) => (i === 0 ? "black" : "none"))
            .attr("stroke", "grey")
            .attr("stroke-width", 1);

        // dots
        gtr.append("g")
            .selectAll("circle")
            .data(dots)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr("cx", (d) => d[0] * fretGap + pad + 30 + d[1] * 10)
            .attr("cy", (_d) => tuningInfo.notes.length * stringGap + pad + 15)
            .attr("fill", "lightgrey")
            .attr("stroke", "none");

        const strings = gtr
            .append("g")
            .selectAll("g")
            .data(isNutFlipped ? tuningInfo.notes.slice() : tuningInfo.notes.slice().reverse(), (_, i) => `${i}`)
            .enter()
            .append("g")
            .attr("transform", (_d, i) => `translate(0, ${i * stringGap + pad})`);

        // string lines
        strings
            .append("line")
            .attr("x1", pad + fretGap)
            .attr("y1", stringGap / 2)
            .attr("x2", pad + fretGap * numberOfFrets + 20)
            .attr("y2", stringGap / 2)
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        notes = strings
            .selectAll("circle")
            .data((d) => allNotesFrom(d, numberOfFrets), indexer)
            .enter()
            .append("circle")
            .attr("r", noteRadius)
            .attr("cy", stringGap / 2)
            .attr("cx", (_d, i) => i * fretGap + pad + 30)
            .on("click", (d) => raise({ id: "Toggle", index: d.index }));

        noteLabels = strings
            .selectAll("text")
            .data((d) => allNotesFrom(d, numberOfFrets), indexer)
            .enter()
            .append("text")
            .attr("transform", "translate(0, 0) scale(1, 1)")
            .attr("text-anchor", "middle")
            .attr("x", (_d, i) => i * fretGap + pad + 30)
            .attr("y", stringGap / 2 + 5)
            .text("");

        setHandedness();
    }

    function update(music: Model["music"]): void {
        const hasToggledNotes = music.nodes.some((x) => x.toggle);

        const fill = (d: StringNote): string =>
            d.node.toggle
                ? "white"
                : d.node.scaleNote.isScaleNote
                  ? d.node.scaleNote.noteNumber === 0
                      ? hasToggledNotes
                          ? "white"
                          : "yellow"
                      : "white"
                  : "rgba(255, 255, 255, 0.01)";

        const stroke = (d: StringNote): string =>
            d.node.midiToggle
                ? "OrangeRed"
                : d.node.toggle
                  ? `#${d.node.chordInterval.colour.toString(16)}`
                  : hasToggledNotes
                    ? "none"
                    : d.node.scaleNote.isScaleNote
                      ? "grey"
                      : "none";

        const strokeWidth = (d: StringNote): number =>
            d.node.midiToggle ? 10 : d.node.toggle ? 4 : d.node.scaleNote.isScaleNote ? 2 : 0;

        const data = repeatTo(music.nodes, numberOfFrets);

        notes.data(data, indexer).attr("fill", fill).attr("stroke", stroke).attr("stroke-width", strokeWidth);

        noteLabels.data(data, indexer);
        setLabels();
    }

    function allNotesFrom(index: number, numberOfNotes: number): Array<StringNote> {
        const items: Array<StringNote> = [];

        for (let i = 0; i < numberOfNotes; i++) {
            items.push({
                octave: Math.floor((i + 1) / 12),
                index: (i + index) % 12,
                node: music.nullNode,
            });
        }

        return items;
    }

    function getFretData(numberOfFrets: number): Array<number> {
        const data: Array<number> = [];
        for (let i = 0; i < numberOfFrets; i++) {
            data.push(i);
        }
        return data;
    }

    function repeatTo(nodes: music.Node[], count: number): StringNote[] {
        let stringNotes: StringNote[] = [];
        for (let i = 0; i <= Math.floor(count / 12); i++) {
            stringNotes = stringNotes.concat(
                nodes.map(
                    (x) =>
                        <StringNote>{
                            octave: i,
                            index: x.scaleNote.note.index,
                            node: x,
                        },
                ),
            );
        }
        return stringNotes;
    }

    function setHandedness() {
        if (isLeftHanded) {
            fretboardElement.transform.baseVal.getItem(0).setTranslate(1200, 0);
            fretboardElement.transform.baseVal.getItem(1).setScale(-1, 1);
            noteLabels
                .attr("transform", (_d, _i) => "translate(0, 0) scale(-1, 1)")
                .attr("x", (_d, i) => -(i * fretGap + pad + 30));
        } else {
            fretboardElement.transform.baseVal.getItem(0).setTranslate(0, 0);
            fretboardElement.transform.baseVal.getItem(1).setScale(1, 1);
            noteLabels
                .attr("transform", (_d, _i) => "translate(0, 0) scale(1, 1)")
                .attr("x", (_d, i) => i * fretGap + pad + 30);
        }
    }

    function setLabels() {
        function setNoteName(note: StringNote): string {
            return note.node.scaleNote.isScaleNote || note.node.toggle ? note.node.scaleNote.note.label : "";
        }

        function setInterval(note: StringNote): string {
            return note.node.scaleNote.isScaleNote || note.node.toggle ? note.node.intervalName : "";
        }

        switch (fretboardLabelType) {
            case "None":
                noteLabels.text("");
                break;
            case "NoteName":
                noteLabels.text(setNoteName);
                break;
            case "Interval":
                noteLabels.text(setInterval);
                break;
            default:
                throw new Error(`Unexpected label type: ${fretboardLabelType}`);
        }
    }
};
