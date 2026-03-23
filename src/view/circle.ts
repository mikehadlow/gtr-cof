import d3 from "d3";
import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { Svg, View, ViewContext } from "../types";
import { appendSettingsIcon } from "../ui";

type Segment = {
    readonly startAngle: number;
    readonly endAngle: number;
    readonly index: number;
    readonly node: music.Node;
};
type NoteCircleState = {
    noteSegments: d3.Selection<Segment>;
    noteText: d3.Selection<Segment>;
    intervalSegments: d3.Selection<Segment>;
    intervalText: d3.Selection<Segment>;
    intervalNotes: d3.Selection<Segment>;
    chordText: d3.Selection<Segment>;
    chordSegments: d3.Selection<Segment>;
    chordNotes: d3.Selection<Segment>;
};

export const create = (svgId: string, noteIndexes: number[], label: string): View<Model, Msg, Svg> => {
    const svg = d3.select(svgId);
    let state: NoteCircleState;
    let isCNoon: boolean = true;

    // return view
    return (model: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
        // only redraw on init, or if the noon note has changed
        if (ctx.init || isCNoon !== model.state.circleIsCNoon) {
            const offset = model.state.circleIsCNoon ? 3 : 0;
            state = draw(svg, rotate(noteIndexes, offset), label, raise);
            isCNoon = model.state.circleIsCNoon;
        }
        update(model.music, state);
    };
};

const indexer: (x: Segment) => string = (x) => x.index.toString();

function draw(
    svg: d3.Selection<any>,
    noteIndexes: number[],
    label: string,
    raise: (msg: Msg) => void,
): NoteCircleState {
    const pad = 50;

    const chordRadius = 240;
    const noteRadius = 200;
    const degreeRadius = 135;
    const innerRadius = 90;

    const handleNoteClick = (segment: Segment, _i: number): void => {
        raise({
            id: "TonicChanged",
            noteSpec: replaceDoubleSharpsAndFlatsWithEquivalentNote(segment.node.scaleNote.note),
        });
    };

    const handleChordClick = (segment: Segment, _i: number): void => {
        raise({
            id: "ChordChanged",
            chordIndex: segment.node.scaleNote.note.index,
        });
    };

    const handleIntervalClick = (segment: Segment, _i: number): void => {
        raise({
            id: "Toggle",
            index: segment.node.scaleNote.note.index,
        });
    };

    svg.selectAll("*").remove();

    appendSettingsIcon(svg, () => raise({ id: "ModalStateChange", modalState: "circle-settings" }));

    const cof = svg.append("g").attr("transform", `translate(${noteRadius + pad}, ${noteRadius + pad})`);

    cof.append("text").attr("text-anchor", "middle").attr("x", 0).attr("y", 0).text(label);

    const segments = generateSegments(noteIndexes);

    const noteArc = d3.svg.arc<Segment>().innerRadius(degreeRadius).outerRadius(noteRadius);

    const degreeArc = d3.svg.arc<Segment>().innerRadius(innerRadius).outerRadius(degreeRadius);

    const chordArc = d3.svg.arc<Segment>().innerRadius(noteRadius).outerRadius(chordRadius);

    const noteSegments = cof
        .append("g")
        .selectAll("path")
        .data(segments, indexer)
        .enter()
        .append("path")
        .attr("d", noteArc)
        .attr("class", "note-segment")
        .on("click", handleNoteClick);

    const noteText = cof
        .append("g")
        .selectAll("text")
        .data(segments)
        .enter()
        .append("text")
        .attr("x", (x) => noteArc.centroid(x)[0])
        .attr("y", (x) => noteArc.centroid(x)[1] + 11)
        .text("")
        .attr("class", "note-segment-text");

    const intervalSegments = cof
        .append("g")
        .selectAll("path")
        .data(segments, indexer)
        .enter()
        .append("path")
        .attr("d", degreeArc)
        .attr("class", "interval-segment")
        .on("click", handleIntervalClick);

    const intervalNotes = cof
        .append("g")
        .selectAll("circle")
        .data(segments, indexer)
        .enter()
        .append("circle")
        .style("pointer-events", "none")
        .attr("r", 25)
        .attr("cx", (x) => degreeArc.centroid(x)[0])
        .attr("cy", (x) => degreeArc.centroid(x)[1])
        .attr("class", "interval-note");

    const intervalText = cof
        .append("g")
        .selectAll("text")
        .data(segments, indexer)
        .enter()
        .append("text")
        .attr("x", (x) => degreeArc.centroid(x)[0])
        .attr("y", (x) => degreeArc.centroid(x)[1] + 8)
        .text("")
        .attr("class", "degree-segment-text");

    const chordSegments = cof
        .append("g")
        .selectAll("path")
        .data(segments, indexer)
        .enter()
        .append("path")
        .attr("d", chordArc)
        .attr("class", "chord-segment")
        .on("click", handleChordClick);

    const chordNotes = cof
        .append("g")
        .selectAll("circle")
        .data(segments, indexer)
        .enter()
        .append("circle")
        .style("pointer-events", "none")
        .attr("r", 28)
        .attr("cx", (x) => chordArc.centroid(x)[0])
        .attr("cy", (x) => chordArc.centroid(x)[1])
        .attr("class", "chord-segment-note");

    const chordText = cof
        .append("g")
        .selectAll("text")
        .data(segments, indexer)
        .enter()
        .append("text")
        .attr("x", (x) => chordArc.centroid(x)[0])
        .attr("y", (x) => chordArc.centroid(x)[1] + 8)
        .text("")
        .attr("class", "degree-segment-text");

    return {
        noteSegments: noteSegments,
        noteText: noteText,
        intervalSegments: intervalSegments,
        intervalNotes: intervalNotes,
        intervalText: intervalText,
        chordSegments: chordSegments,
        chordNotes: chordNotes,
        chordText: chordText,
    };
}

function update(scaleChanged: Model["music"], state: NoteCircleState): void {
    const data: Segment[] = scaleChanged.nodes.map(
        (node) =>
            <Segment>{
                startAngle: 0,
                endAngle: 0,
                scaleNote: {},
                index: node.scaleNote.note.index,
                node: node,
            },
    );

    state.noteSegments
        .data(data, indexer)
        .attr(
            "class",
            (d, i) =>
                "note-segment " +
                (d.node.scaleNote.isScaleNote ? (i === 0 ? "note-segment-tonic" : "note-segment-scale") : ""),
        );

    state.noteText.data(data, indexer).text((d) => d.node.scaleNote.note.label);

    state.intervalSegments
        .data(data, indexer)
        .attr("class", (d) => (d.node.scaleNote.isScaleNote ? "degree-segment-selected" : "interval-segment"));

    state.intervalText.data(data, indexer).text((d) => d.node.intervalName);

    state.intervalNotes
        .data(data, indexer)
        .attr("class", (d) => (d.node.toggle ? "interval-note-selected" : "interval-note"))
        .style("fill", (d) =>
            d.node.toggle ? `#${d.node.chordInterval.colour.toString(16).padStart(6, "0")}` : "none",
        )
        .style("stroke-width", (d) => (d.node.midiToggle ? "20px" : "2px"))
        .style("stroke", (d) => (d.node.midiToggle ? "OrangeRed" : d.node.toggle ? "black" : "none"));

    state.chordText.data(data, indexer).text((d) => `${d.node.scaleNote.chord!.romanNumeral}`);

    state.chordSegments
        .data(data, indexer)
        .attr("class", (d) =>
            d.node.scaleNote.isScaleNote ? getChordSegmentClass(d.node.scaleNote.chord!) : "chord-segment",
        );

    state.chordNotes
        .data(data, indexer)
        .attr("class", (d) =>
            d.node.isChordRoot ? getChordSegmentClass(d.node.scaleNote.chord!) : "chord-segment-note",
        );
}

function getChordSegmentClass(chord: music.Chord): string {
    if (chord.type === "Diminished") return "chord-segment-dim";
    if (chord.type === "Augmented") return "chord-segment-aug";
    if (chord.type === "Minor") return "chord-segment-minor";
    if (chord.type === "Major") return "chord-segment-major";
    throw new Error("Unexpected ChordType");
}

function generateSegments(fifths: number[]): Segment[] {
    const count = fifths.length;
    const items: Array<Segment> = [];
    const angle = Math.PI * (2 / count);
    for (let i: number = 0; i < count; i++) {
        const itemAngle = angle * i - angle / 2;
        items.push({
            startAngle: itemAngle,
            endAngle: itemAngle + angle,
            index: fifths[i],
            node: music.nullNode,
        });
    }
    return items;
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
    const newArray: number[] = [];
    for (const item of array) {
        newArray.push((item + offset) % 12);
    }
    return newArray;
}
