import * as d3 from 'd3';
import * as events from './events';
import * as music from './music';
import * as tuning from './tuning';
import type { FretboardLabelType } from './types';

let currentTuning: tuning.Tuning;
let currentState: events.ScaleChangedEvent;
let notes: d3.Selection<StringNote>;
let noteLabels: d3.Selection<StringNote>;
const numberOfFrets = 16;
let fretboardElement: SVGGElement;
let isLeftHanded: boolean = false;
let isNutFlipped: boolean = false;
let fretboardLabelType: FretboardLabelType = "NoteName";

const stringGap = 40;
const fretGap = 70;
const fretWidth = 5;
const noteRadius = 15;
const pad = 20;

function indexer(stringNote: StringNote): string {
    return stringNote.index + "_" + stringNote.octave;
}

export function init() {
    events.tuningChange.subscribe(handleTuningChange);
    events.scaleChange.subscribe(update);
    events.leftHandedChange.subscribe(handleLeftHandedChanged);
    events.flipNutChange.subscribe(handleFlipNutChanged);
    events.fretboardLabelChange.subscribe(handleLabelChange);
}

function handleTuningChange(tuningChangedEvent: events.TuningChangedEvent): void {
    const newTuning = tuning.tunings.find(x => x.index == tuningChangedEvent.index);
    updateFretboard(newTuning!);
}

function handleLeftHandedChanged(lhEvent: events.LeftHandedFretboardEvent) {
    isLeftHanded = lhEvent.isLeftHanded;
    if (currentTuning != null) {
        updateFretboard(currentTuning);
    }
}

function setHandedness() {
    if (isLeftHanded) {
        fretboardElement.transform.baseVal.getItem(0).setTranslate(1200, 0);
        fretboardElement.transform.baseVal.getItem(1).setScale(-1, 1);
        noteLabels
            .attr("transform", (d, i) => "translate(0, 0) scale(-1, 1)")
            .attr("x", (d, i) => -(i * fretGap + pad + 30))
    } else {
        fretboardElement.transform.baseVal.getItem(0).setTranslate(0, 0);
        fretboardElement.transform.baseVal.getItem(1).setScale(1, 1);
        noteLabels
            .attr("transform", (d, i) => "translate(0, 0) scale(1, 1)")
            .attr("x", (d, i) => (i * fretGap + pad + 30))
    }
}

function handleFlipNutChanged(fnEvent: events.FlipNutEvent) {
    isNutFlipped = fnEvent.isNutFlipped;
    if (currentTuning != null) {
        updateFretboard(currentTuning);
    }
}

function handleLabelChange(lcEvent: events.FretboardLabelChangeEvent) {
    fretboardLabelType = lcEvent.labelType;
    setLabels();
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
            noteLabels.text(setNoteName)
            break;
        case "Interval":
            noteLabels.text(setInterval);
            break;
        default:
            throw new Error(`Unexpected label type: ${fretboardLabelType}`)
    }
}

function updateFretboard(tuningInfo: tuning.Tuning): void {

    currentTuning = tuningInfo;
    const fretData: Array<number> = getFretData(numberOfFrets);
    const dots: Array<[number, number]> = tuningInfo.dots;

    d3.selectAll("#gtr > *").remove();
    const svg = d3.select("#gtr");
    svg.append("text")
        .attr("class", "mode-text")
        .attr("x", 30)
        .attr("y", 11)
        .text(tuningInfo.tuning + " "
            + tuningInfo.description
            + (isLeftHanded ? ", Left Handed" : "")
            + (isNutFlipped ? ", Nut Flipped" : ""));
    const gtr = svg.append("g").attr("transform", "translate(0, 0) scale(1, 1)");
    fretboardElement = <SVGGElement>gtr.node();

    // frets
    gtr.append("g").selectAll("rect")
        .data(fretData)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { return (i + 1) * fretGap + pad - fretWidth; })
        .attr("y", pad + stringGap / 2 - fretWidth)
        .attr("width", fretWidth)
        .attr("height", stringGap * (tuningInfo.notes.length - 1) + (fretWidth * 2))
        .attr("fill", function (d, i) { return i === 0 ? "black" : "none"; })
        .attr("stroke", "grey")
        .attr("stroke-width", 1);

    // dots
    gtr.append("g").selectAll("circle")
        .data(dots)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cx", function (d) { return d[0] * fretGap + pad + 30 + (d[1] * 10); })
        .attr("cy", function (d) { return (tuningInfo.notes.length) * stringGap + pad + 15; })
        .attr("fill", "lightgrey")
        .attr("stroke", "none");

    const strings = gtr.append("g").selectAll("g")
        .data(isNutFlipped ? tuningInfo.notes.slice() : tuningInfo.notes.slice().reverse(), (_, i) => i + "")
        .enter()
        .append("g")
        .attr("transform", function (d, i) { return "translate(0, " + ((i * stringGap) + pad) + ")"; });

    // string lines
    strings
        .append("line")
        .attr("x1", pad + fretGap)
        .attr("y1", stringGap / 2)
        .attr("x2", pad + (fretGap * numberOfFrets) + 20)
        .attr("y2", stringGap / 2)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    notes = strings
        .selectAll("circle")
        .data(function (d) { return allNotesFrom(d, numberOfFrets); }, indexer)
        .enter()
        .append("circle")
        .attr("r", noteRadius)
        .attr("cy", stringGap / 2)
        .attr("cx", function (d, i) { return i * fretGap + pad + 30 })
        .on("click", d => events.toggle.publish({ index: d.index }));

    noteLabels = strings
        .selectAll("text")
        .data(function (d) { return allNotesFrom(d, numberOfFrets); }, indexer)
        .enter()
        .append("text")
        .attr("transform", "translate(0, 0) scale(1, 1)")
        .attr("text-anchor", "middle")
        .attr("x", (d, i) => i * fretGap + pad + 30)
        .attr("y", (stringGap / 2) + 5)
        .text("");

    setHandedness();

    if (currentState != null) {
        update(currentState);
    }
}

function update(stateChange: events.ScaleChangedEvent): void {

    const hasToggledNotes = stateChange.nodes.some(x => x.toggle);

    const fill = function (d: StringNote): string {
        return d.node.toggle
            ? "white"
            : d.node.scaleNote.isScaleNote
                ? d.node.scaleNote.noteNumber === 0
                    ? hasToggledNotes ? "white" : "yellow"
                    : "white"
                : "rgba(255, 255, 255, 0.01)";
    };

    const stroke = function (d: StringNote): string {
        return d.node.midiToggle ? "OrangeRed"
            : d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16)
                : hasToggledNotes ? "none"
                    : d.node.scaleNote.isScaleNote ? "grey" : "none";
    };

    const strokeWidth = function (d: StringNote): number {
        return d.node.midiToggle ? 10
            : d.node.toggle ? 4
                : d.node.scaleNote.isScaleNote ? 2
                    : 0;
    };

    const data = repeatTo(stateChange.nodes, numberOfFrets);

    notes
        .data(data, indexer)
        .attr("fill", fill)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth);

    noteLabels.data(data, indexer)
    setLabels();
    currentState = stateChange;
}

function allNotesFrom(index: number, numberOfNotes: number): Array<StringNote> {
    const items: Array<StringNote> = [];

    for (let i = 0; i < numberOfNotes; i++) {
        items.push({
            octave: Math.floor((i + 1) / 12),
            index: (i + index) % 12,
            node: music.nullNode
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
        stringNotes = stringNotes.concat(nodes.map(x => <StringNote>{
            octave: i,
            index: x.scaleNote.note.index,
            node: x
        }));
    }
    return stringNotes;
}

type StringNote = {
    readonly octave: number;
    readonly index: number;
    readonly node: music.Node;
}
