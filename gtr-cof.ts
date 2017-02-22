///<reference path="node_modules/@types/d3/index.d.ts" />

namespace music {

    export interface NoteBase {
        readonly id: number;
        readonly index: number;
        readonly name: string;
    }

    export let noteBases: Array<NoteBase> = [
        { id: 0, index: 0, name: 'C' },
        { id: 1, index: 2, name: 'D' },
        { id: 2, index: 4, name: 'E' },
        { id: 3, index: 5, name: 'F' },
        { id: 4, index: 7, name: 'G' },
        { id: 5, index: 9, name: 'A' },
        { id: 6, index: 11, name: 'B' }
    ];

    interface NoteLabel {
        readonly offset: number;
        readonly label: string;
    }

    let noteLabels: Array<NoteLabel> = [
        { offset: 0, label: '' },
        { offset: 1, label: '♯' },
        { offset: 2, label: '♯♯' },
        { offset: -1, label: '♭' },
        { offset: -2, label: '♭♭' },
    ];

    export interface Mode {
        readonly name: string;
        readonly index: number;
    }

    export let modes: Array<Mode> = [
        { name: 'Lydian', index: 3 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 4 },
        { name: 'Dorian', index: 1 },
        { name: 'N Minor / Aeolian', index: 5 },
        { name: 'Phrygian', index: 2 },
        { name: 'Locrian', index: 6 },
    ];

    let scaleTones: Array<number> = [2, 2, 1, 2, 2, 2, 1];

    export let tuning: Array<number> = [
        4, // E
        9, // A
        2, // D
        7, // G
        11,// B
        4, // E
    ];

    let romanNumeral: Array<string> = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

    export type Triad = [number, number, number];

    export enum ChordType { Major, Minor, Diminished };

    export interface ScaleNote {
        readonly index: number;
        readonly degree: number;
        readonly noteName: string;
        readonly chord: Chord;
        readonly noteBase: NoteBase;
        readonly canSelect: boolean;
        chordNote?: number;
    };

    export interface Chord {
        readonly romanNumeral: string;
        readonly triad: Triad;
        readonly type: ChordType;
    }

    export function generateScale(noteBase: NoteBase, index: number, mode: Mode): Array<ScaleNote> {
        let scale: Array<ScaleNote> = [];

        let currentIndex = index;
        let currentNoteBase = noteBase;
        for (let i = 0; i < 7; i++) {

            let offset = currentIndex - currentNoteBase.index;
            if (Math.abs(offset) > 2) {
                offset = (currentIndex < currentNoteBase.index)
                    ? (currentIndex + 12) - currentNoteBase.index
                    : currentIndex - (currentNoteBase.index + 12);
            }
            // lookup noteLabel with offset
            let noteLabel: NoteLabel = noteLabels.filter(function (n: NoteLabel) { return n.offset == offset; })[0];
            // add new ScaleNote to scale
            scale.push({
                index: currentIndex,
                degree: i,
                noteName: currentNoteBase.name + noteLabel.label,
                noteBase: currentNoteBase,
                canSelect: Math.abs(offset) < 2,
                chord: null
            })

            let interval = scaleTones[(mode.index + i) % 7];
            currentIndex = (currentIndex + interval) % 12;
            currentNoteBase = noteBases[(currentNoteBase.id + 1) % 7]
        }

        let scalePlusChord: Array<ScaleNote> = [];

        for (let note of scale) {
            scalePlusChord.push({
                index: note.index,
                degree: note.degree,
                noteName: note.noteName,
                noteBase: note.noteBase,
                canSelect: note.canSelect,
                chord: generateChord(scale, note)
            });
        }

        return scalePlusChord;
    }

    function generateChord(scale: Array<ScaleNote>, root: ScaleNote): Chord {
        let triad: Triad = [
            root.index,
            scale[(root.degree + 2) % 7].index,
            scale[(root.degree + 4) % 7].index
        ];
        let chordType = getChordType(triad);
        let roman = romanNumeral[root.degree];
        if (chordType === ChordType.Major) {
            roman = roman.toLocaleUpperCase();
        }
        if (chordType === ChordType.Diminished) {
            roman = roman + "°";
        }

        return {
            romanNumeral: roman,
            triad: triad,
            type: chordType
        };
    }

    export function appendTriad(scale: Array<ScaleNote>, chordIndex: number): Array<ScaleNote> {
        let chord = scale.filter((x) => x.index == chordIndex)[0].chord;
        for (let note of scale) {
            for (let i = 0; i < 3; i++) {
                if (note.index === chord.triad[i]) {
                    note.chordNote = i;
                }
            }
        }
        return scale;
    }

    export function fifths(): Array<number> {
        let indexes: Array<number> = [];
        let current: number = 0;
        for (let i: number = 0; i < 12; i++) {
            indexes.push(current);
            current = (current + 7) % 12;
        }
        return indexes;
    }

    export function chromatic(): Array<number> {
        let indexes: Array<number> = [];
        for (let i: number = 0; i < 12; i++) {
            indexes.push(i);
        }
        return indexes;
    }

    function getChordType(triad: Triad): ChordType {
        // check for diminished
        if (interval(triad[0], triad[2]) === 6) return ChordType.Diminished;
        // check for minor
        if (interval(triad[0], triad[1]) === 3) return ChordType.Minor;
        // must be Major
        return ChordType.Major;
    }

    function interval(a: number, b: number): number {
        return (a <= b) ? b - a : (b + 12) - a;
    }

    export function indexIsNatural(index: number): boolean {
        return noteBases.filter(function (noteBase, i, a) {
            return noteBase.index == index;
        }).length != 0;
    }
}

namespace state {

    let listeners: Array<(n: StateChange) => void> = [];
    let currentMode: music.Mode = music.modes[1];

    let currentNoteBase: music.NoteBase = music.noteBases[0];
    let currentIndex: number = 0;
    let currentChordIndex: number = -1

    export function init() {
        let cookieData = readCookie();

        if(cookieData.hasCookie) {
            currentIndex = cookieData.index;
            currentNoteBase = music.noteBases[cookieData.noteBaseIndex];
            currentMode = music.modes.filter((x) => x.index == cookieData.modeIndex)[0];
            currentChordIndex = cookieData.chordIndex;
        }

        updateListeners();
    }

    export function addListener(listener: (n: StateChange) => void): void {
        listeners.push(listener);
    }

    export function changeTonic(newNoteBase: music.NoteBase, index: number): void {
        currentNoteBase = newNoteBase;
        currentIndex = index;
        currentChordIndex = -1;
        updateListeners();
    }

    export function changeMode(newMode: music.Mode): void {
        currentMode = newMode;
        currentChordIndex = -1;
        updateListeners();
    }

    export function changeChord(chordIndex: number): void {
        if(chordIndex == currentChordIndex) {
            currentChordIndex = -1
        }
        else {
            currentChordIndex = chordIndex;
        }
        updateListeners();
    }

    function updateListeners(): void {
        let scale = music.generateScale(currentNoteBase, currentIndex, currentMode);

        if (currentChordIndex != -1) {
            scale = music.appendTriad(scale, currentChordIndex);
        }

        let stateChange: StateChange = {
            mode: currentMode,
            noteBase: currentNoteBase,
            index: currentIndex,
            scale2: scale
        };
        for (let listener of listeners) {
            listener(stateChange);
        }
        bakeCookie();
    }

    function bakeCookie() {
        let cookieExpiryDays = 30;
        let expiryDate = new Date(Date.now() + (cookieExpiryDays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + expiryDate.toUTCString();
        document.cookie = "gtr-cof-state=" + currentIndex + "|" + currentNoteBase.id + "|" + currentMode.index + "|" + currentChordIndex
            + ";" + expires;
    }

    function readCookie(): CookieData {
        let result = document.cookie.match(new RegExp("gtr-cof-state" + '=([^;]+)'));
        if(result != null)
        {
            let items = result[1].split("|");
            if(items.length == 4) {
                return {
                    hasCookie: true,
                    index: Number(items[0]),
                    noteBaseIndex: Number(items[1]),
                    modeIndex: Number(items[2]),
                    chordIndex: Number(items[3])
                };
            }
        }
        return {
            hasCookie: false,
            index: 0,
            noteBaseIndex: 0,
            modeIndex: 0,
            chordIndex: -1
        };
    }

    export interface CookieData {
        readonly hasCookie: boolean;
        readonly index: number;
        readonly noteBaseIndex: number;
        readonly modeIndex: number;
        readonly chordIndex: number;
    }

    export interface StateChange {
        readonly mode: music.Mode;
        readonly noteBase: music.NoteBase;
        readonly index: number;
        readonly scale2: Array<music.ScaleNote>;
    }
}

namespace cof {

    export class NoteCircle {
        noteSegments: d3.Selection<Segment> = null;
        noteText: d3.Selection<Segment> = null;
        degreeSegments: d3.Selection<Segment> = null;
        degreeText: d3.Selection<Segment> = null;
        chordSegments: d3.Selection<Segment> = null;
        chordNotes: d3.Selection<Segment> = null;
        indexer: (x: Segment) => string = (x) => x.index + "";

        constructor(svg: d3.Selection<any>, noteIndexes: number[], label: string) {
            let pad = 50;

            let chordRadius = 220;
            let noteRadius = 200;
            let degreeRadius = 135;
            let innerRadius = 90;

            let cof = svg
                .append("g")
                .attr("transform", "translate(" + (noteRadius + pad) + ", " + (noteRadius + pad) + ")");

            cof.append("text")
                .attr("text-anchor", "middle")
                .attr("x", 0)
                .attr("y", 0)
                .text(label)

            let segments = generateSegments(noteIndexes);

            let noteArc = d3.svg.arc<Segment>()
                .innerRadius(degreeRadius)
                .outerRadius(noteRadius);

            let degreeArc = d3.svg.arc<Segment>()
                .innerRadius(innerRadius)
                .outerRadius(degreeRadius);

            let chordArc = d3.svg.arc<Segment>()
                .innerRadius(noteRadius)
                .outerRadius(chordRadius);

            this.noteSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", noteArc)
                .attr("class", "note-segment")
                .on("click", handleNoteClick);

            this.noteText = cof.append("g").selectAll("text")
                .data(segments)
                .enter()
                .append("text")
                .attr("x", function (x) { return noteArc.centroid(x)[0]; })
                .attr("y", function (x) { return noteArc.centroid(x)[1] + 11; })
                .text("")
                .attr("class", "note-segment-text");

            this.degreeSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", degreeArc)
                .attr("class", "degree-segment")

            this.degreeText = cof.append("g").selectAll("text")
                .data(segments, this.indexer)
                .enter()
                .append("text")
                .attr("x", function (x) { return degreeArc.centroid(x)[0]; })
                .attr("y", function (x) { return degreeArc.centroid(x)[1] + 8; })
                .text("")
                .attr("class", "degree-segment-text");

            this.chordSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", chordArc)
                .attr("class", "chord-segment")
                .on("click", handleChordClick);

            this.chordNotes = cof.append("g").selectAll("circle")
                .data(segments, this.indexer)
                .enter()
                .append("circle")
                .style("pointer-events", "none")
                .attr("r", 15)
                .attr("cx", function (x) { return chordArc.centroid(x)[0]; })
                .attr("cy", function (x) { return chordArc.centroid(x)[1]; })
                .attr("class", "chord-segment-note");

            let instance = this;
            state.addListener(function (stateChange: state.StateChange) {
                instance.update(stateChange);
            });
        }

        update(stateChange: state.StateChange): void {

            let data: Array<Segment> = [];
            for (let n of stateChange.scale2) {
                data.push({
                    startAngle: 0,
                    endAngle: 0,
                    scaleNote: n,
                    index: n.index
                });
            }

            this.noteSegments
                .data(data, this.indexer)
                .attr("class", function (d, i) { return "note-segment " + ((i === 0) ? "note-segment-tonic" : "note-segment-scale"); })
                .exit()
                .attr("class", "note-segment");

            this.noteText
                .data(data, this.indexer)
                .text(function (d) { return d.scaleNote.noteName; })
                .exit()
                .text("");

            this.degreeSegments
                .data(data, this.indexer)
                .attr("class", "degree-segment-selected")
                .exit()
                .attr("class", "degree-segment")

            this.degreeText
                .data(data, this.indexer)
                .text(function (d, i) { return d.scaleNote.chord.romanNumeral; })
                .exit()
                .text("");

            this.chordSegments
                .data(data, this.indexer)
                .attr("class", function (d, i) { return getChordSegmentClass(d.scaleNote); })
                .exit()
                .attr("class", "chord-segment");

            this.chordNotes
                .data(data, this.indexer)
                .attr("class", function (d, i) { return getChordNoteClass(d.scaleNote); })
                .exit()
                .attr("class", "chord-segment-note");
        }
    }

    function getChordSegmentClass(note: music.ScaleNote): string {
        if (note.chord.type === music.ChordType.Diminished) return "chord-segment-dim";
        if (note.chord.type === music.ChordType.Minor) return "chord-segment-minor";
        if (note.chord.type === music.ChordType.Major) return "chord-segment-major";
        throw "Unexpected ChordType";
    }

    function getChordNoteClass(note: music.ScaleNote): string {
        if (note.chordNote === undefined) return "chord-segment-note";
        if (note.chordNote === 0) return "chord-segment-note-root";
        if (note.chordNote === 1) return "chord-segment-note-third";
        return "chord-segment-note-fifth";
    }

    function generateSegments(fifths: number[]): Segment[] {
        let count = fifths.length;
        let items: Array<Segment> = [];
        let angle = (Math.PI * (2 / count));
        for (let i: number = 0; i < count; i++) {
            let itemAngle = (angle * i) - (angle / 2);
            items.push({
                startAngle: itemAngle,
                endAngle: itemAngle + angle,
                scaleNote: null,
                index: fifths[i]
            });
        }
        return items;
    }

    function handleNoteClick(segment: Segment, i: number): void {
        if (segment.scaleNote.canSelect) {
            state.changeTonic(segment.scaleNote.noteBase, segment.scaleNote.index);
        }
    }

    function handleChordClick(segment: Segment, i: number): void {
        state.changeChord(segment.scaleNote.index);
    }

    interface Segment {
        readonly startAngle: number;
        readonly endAngle: number;
        readonly scaleNote: music.ScaleNote;
        readonly index: number;
    }
}

namespace tonics {

    let buttons: d3.Selection<ButtonData> = null;

    interface ButtonData {
        readonly noteBase: music.NoteBase;
        readonly label: string;
        readonly index: number;
        readonly greyOut: boolean;
    };

    function bg(noteBase: music.NoteBase): Array<ButtonData> {

        let flatIndex = noteBase.index == 0 ? 11 : noteBase.index - 1;
        let sharpIndex = (noteBase.index + 1) % 12;
        return [
            { noteBase: noteBase, label: noteBase.name + "♭", index: flatIndex, greyOut: music.indexIsNatural(flatIndex) },
            { noteBase: noteBase, label: noteBase.name + "", index: noteBase.index, greyOut: false },
            { noteBase: noteBase, label: noteBase.name + "♯", index: sharpIndex, greyOut: music.indexIsNatural(sharpIndex) }
        ];
    }

    export function init(): void {
        let pad = 5;
        let buttonHeight = 25;
        let svg = d3.select("#modes");

        let tonics = svg.append("g");

        let gs = tonics.selectAll("g")
            .data(music.noteBases)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; })
            .selectAll("g")
            .data(function (d) { return bg(d); }, indexer)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(" + (i * 55) + ", 0)"; });

        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("strokeWidth", 2)
            .attr("width", 40)
            .attr("height", 25)
            .attr("class", function (d) { return d.greyOut ? "tonic-button tonic-button-grey" : "tonic-button"; })
            .on("click", handleButtonClick);

        gs
            .append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text(function (x) { return x.label; })
            .attr("class", "tonic-text");

        state.addListener(listener);
    }

    function handleButtonClick(d: ButtonData, i: number): void {
        state.changeTonic(d.noteBase, d.index);
    }

    function listener(state: state.StateChange): void {
        let tonic = state.scale2[0];
        let ds: Array<ButtonData> = [{
            noteBase: state.noteBase,
            label: tonic.noteName,
            index: tonic.index,
            greyOut: (state.noteBase.index != tonic.index) && music.indexIsNatural(tonic.index)
        }];
        buttons
            .data(ds, indexer)
            .attr("class", "tonic-button tonic-button-selected")
            .exit()
            .attr("class", function (d) { return d.greyOut ? "tonic-button tonic-button-grey" : "tonic-button"; });
    }

    function indexer(d: ButtonData): string {
        return d.label;
    }
}

namespace modes {

    let buttons: d3.Selection<music.Mode> = null;

    export function init(): void {
        let pad = 5;
        let buttonHeight = 25;
        let svg = d3.select("#modes");
        let modes = svg
            .append("g")
            .attr("transform", "translate(0, 250)");

        let gs = modes.selectAll("g")
            .data(music.modes, function (m) { return m.index.toString(); })
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; });

        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("strokeWidth", 2)
            .attr("width", 150)
            .attr("height", 25)
            .attr("class", "mode-button")
            .on("click", handleButtonClick);

        gs
            .append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text(function (x) { return x.name; })
            .attr("class", "mode-text");

        state.addListener(update);
    }

    function handleButtonClick(mode: music.Mode, i: number): void {
        state.changeMode(mode);
    }

    function update(stateChange: state.StateChange): void {
        let modes: Array<music.Mode> = [stateChange.mode];
        buttons
            .data(modes, function (m) { return m.index.toString(); })
            .attr("class", "mode-button mode-button-selected")
            .exit()
            .attr("class", "mode-button")
    }
}

namespace gtr {

    let notes: d3.Selection<StringNote> = null;
    let numberOfFrets = 16;

    let noteColours: Array<string> = [
        "yellow",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white"
    ];

    function indexer(stringNote: StringNote): string {
        return stringNote.index + "_" + stringNote.octave;
    }

    export function init(): void {
        let stringGap = 40;
        let fretGap = 70;
        let fretWidth = 5;
        let noteRadius = 15;
        let pad = 20;

        let fretData: Array<number> = getFretData(numberOfFrets);
        let dots: Array<[number, number]> = [
            [3, 0], // [fret, position]
            [5, 0],
            [7, 0],
            [9, 0],
            [12, -1],
            [12, 1],
            [15, 0]
        ];

        let svg = d3.select("#gtr");
        let gtr = svg.append("g");
        let tuning = music.tuning.reverse();

        // frets
        gtr.append("g").selectAll("rect")
            .data(fretData)
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return (i + 1) * fretGap + pad - fretWidth; })
            .attr("y", pad + stringGap / 2 - fretWidth)
            .attr("width", fretWidth)
            .attr("height", stringGap * 5 + (fretWidth * 2))
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
            .attr("cy", function (d) { return (tuning.length) * stringGap + pad + 15; })
            .attr("fill", "lightgrey")
            .attr("stroke", "none");

        let strings = gtr.append("g").selectAll("g")
            .data(tuning, function (n) { return n + ""; })
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
            .attr("fill", "none")
            .attr("stroke", "none");

        state.addListener(update);
    }

    function update(stateChange: state.StateChange): void {

        let fill = function (d: StringNote, i: number): string {
            return noteColours[i % 7];
        };

        let stroke = function (d: StringNote, i: number): string {
            let note = d.scaleNote;
            if (note.chordNote === undefined) {
                return "grey";
            }
            if (note.chordNote === 0) {
                return "red";
            }
            if (note.chordNote === 1) {
                return "green";
            }
            return "blue";
        };

        let strokeWidth = function (d: StringNote, i: number): number {
            let note = d.scaleNote;
            if (note.chordNote === undefined) {
                return 2;
            }
            return 5
        };

        notes
            .data(repeatTo(stateChange.scale2, numberOfFrets), indexer)
            .attr("fill", fill)
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth)
            .exit()
            .attr("fill", "none")
            .attr("stroke", "none");
    }

    function allNotesFrom(index: number, numberOfNotes: number): Array<StringNote> {
        let items: Array<StringNote> = [];

        for (let i = 0; i < numberOfNotes; i++) {
            items.push({
                octave: Math.floor((i + 1) / 12),
                index: (i + index) % 12,
                scaleNote: null
            });
        }

        return items;
    }

    function getFretData(numberOfFrets: number): Array<number> {
        let data: Array<number> = [];
        for (let i = 0; i < numberOfFrets; i++) {
            data.push(i);
        }
        return data;
    }

    function repeatTo(scale: Array<music.ScaleNote>, count: number): Array<StringNote> {
        let result: Array<StringNote> = [];

        for (let i = 0; i < count; i++) {
            let note = scale[i % scale.length];
            result.push({
                octave: Math.floor((i + 1) / 8),
                index: note.index,
                scaleNote: note
            });
        }

        return result;
    }

    interface StringNote {
        readonly octave: number;
        readonly index: number;
        readonly scaleNote: music.ScaleNote;
    }
}

tonics.init();
modes.init();
let chromatic = new cof.NoteCircle(d3.select("#chromatic"), music.chromatic(), "Chromatic");
let circleOfFifths = new cof.NoteCircle(d3.select("#cof"), music.fifths(), "Circle of Fifths");
gtr.init();
state.init();