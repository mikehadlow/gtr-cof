///<reference path="node_modules/@types/d3/index.d.ts" />

namespace music2 {
    
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
    
    export type Triad = [number, number, number];
    
    export interface ScaleNote {
        readonly index: number;
        readonly noteName: string;
        readonly chord: string;
        readonly triad: Triad;
    };
    
    export function generateScale(noteBase: NoteBase, index: number, mode: Mode): Array<ScaleNote> {
        let scale: Array<ScaleNote> = [];
        
        let currentIndex = index;
        let currentNoteBase = noteBase;
        for (let i = 0; i < 7; i++) {
            
            let offset = currentIndex - currentNoteBase.index;
            if(Math.abs(offset) > 2)
            {
                offset = (currentIndex < currentNoteBase.index)
                    ? (currentIndex + 12) - currentNoteBase.index
                    : currentIndex - (currentNoteBase.index + 12);
            }
            // lookup noteLabel with offset
            let noteLabel: NoteLabel = noteLabels.filter(function(n:NoteLabel) { return n.offset == offset; })[0];
            // add new ScaleNote to scale
            scale.push({
                index: currentIndex,
                noteName: currentNoteBase.name + noteLabel.label,
                chord: 'tba',
                triad: [0,0,0]
            })
            
            let interval = scaleTones[(mode.index + i) % 7];
            currentIndex = (currentIndex + interval) % 12;
            currentNoteBase = noteBases[(currentNoteBase.id + 1) % 7]
        }

        return scale;
    }
    
    export function fifths(): Array<number> {
        let indexes: Array<number> = [];
        let current: number = 0;
        for(let i: number = 0; i < 12; i++) {
            indexes.push(current);
            current = (current + 7) % 12;
        }
        return indexes;
    }
}

namespace music {

    export let notes: Array<Note> = [
        { name: 'C', flat: 'C', index: 0 },
        { name: 'C♯', flat: 'D♭', index: 1 },
        { name: 'D', flat: 'D', index: 2 },
        { name: 'D♯', flat: 'E♭', index: 3 },
        { name: 'E', flat: 'E', index: 4 },
        { name: 'F', flat: 'F', index: 5 },
        { name: 'F♯', flat: 'G♭', index: 6 },
        { name: 'G', flat: 'G', index: 7 },
        { name: 'G♯', flat: 'A♭', index: 8 },
        { name: 'A', flat: 'A', index: 9 },
        { name: 'A♯', flat: 'B♭', index: 10 },
        { name: 'B', flat: 'B', index: 11 },
    ];

    export let quality: Array<Quality> = [
        { name: "I", isFlat: false },
        { name: "ii", isFlat: true },
        { name: "II", isFlat: false },
        { name: "iii", isFlat: true },
        { name: "III", isFlat: false },
        { name: "IV", isFlat: false },
        { name: "V°", isFlat: true },
        { name: "V", isFlat: false },
        { name: "vi", isFlat: true },
        { name: "VI", isFlat: false },
        { name: "vii", isFlat: true },
        { name: "VII", isFlat: false },
    ];

    export let modes: Array<Mode> = [
        { name: 'Lydian', index: 3 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 4 },
        { name: 'Dorian', index: 1 },
        { name: 'N Minor / Aeolian', index: 5 },
        { name: 'Phrygian', index: 2 },
        { name: 'Locrian', index: 6 },
    ];

    export let tuning: Array<Note> = [
        notes[4], // E
        notes[9], // A
        notes[2], // D
        notes[7], // G
        notes[11],// B
        notes[4], // E
    ];

    let scaleTones: Array<number> = [2, 2, 1, 2, 2, 2, 1];

    let romanNumeral: Array<string> = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

    export interface Note {
        readonly name: string;
        readonly flat: string;
        readonly index: number;
    }

    export type Triad = [Note, Note, Note];

    export interface ScaleNote extends Note {
        readonly degree: number;
        readonly triad: Triad;
        readonly chordType: ChordType;
        chordNote?: number;
        readonly quality: Quality;
    }

    export interface Quality {
        readonly name: string;
        readonly isFlat: boolean;
    }

    export interface Mode {
        readonly name: string;
        readonly index: number;
    }

    export enum ChordType { Major, Minor, Diminished };

    export function fifths(): Array<Note> {
        let items: Array<Note> = [];
        let current: Note = notes[0];

        for (let i: number = 0; i < 12; i++) {
            items.push(current);
            current = notes[(current.index + 7) % 12];
        }

        return items;
    }

    export function scale(tonic: Note, mode: Mode): Array<ScaleNote> {
        let notesOfScale: Array<Note> = [];
        let scale: Array<ScaleNote> = [];
        let noteIndex = tonic.index;

        for (let i = 0; i < 7; i++) {
            notesOfScale.push(notes[noteIndex]);
            noteIndex = (noteIndex + scaleTones[((i + mode.index) % 7)]) % 12
        }

        for (let i = 0; i < 7; i++) {
            let note = notesOfScale[i];
            let triad: Triad = [
                notesOfScale[i],
                notesOfScale[(i + 2) % 7],
                notesOfScale[(i + 4) % 7]
            ];

            scale.push({
                name: note.name,
                flat: note.flat,
                index: note.index,
                degree: i,
                triad: triad,
                chordType: getChordType(triad),
                quality: quality[interval(tonic, note)]
            });
        }
        return scale;
    }

    export function appendTriad(scale: Array<ScaleNote>, triad: Triad): Array<ScaleNote> {
        for (let note of scale) {
            for (let i = 0; i < 3; i++) {
                if (note.name === triad[i].name) {
                    note.chordNote = i;
                }
            }
        }
        return scale;
    }

    function getChordType(triad: Triad): ChordType {
        // check for diminished
        if (interval(triad[0], triad[2]) === 6) return ChordType.Diminished;
        // check for minor
        if (interval(triad[0], triad[1]) === 3) return ChordType.Minor;
        // must be Major
        return ChordType.Major;
    }

    function interval(a: Note, b: Note): number {
        return (a.index <= b.index) ? b.index - a.index : (b.index + 12) - a.index;
    }

}

namespace state {

    let listeners: Array<(n: StateChange) => void> = [];
    let currentTonic: music.Note = music.notes[0];
    let currentMode: music.Mode = music.modes[1];
    
    let currentNoteBase: music2.NoteBase = music2.noteBases[0];
    let currentIndex: number = 0;

    export function addListener(listener: (n: StateChange) => void): void {
        listeners.push(listener);
    }

    export function changeTonic(newTonic: music.Note): void {
        currentTonic = newTonic;
        updateListeners();
    }
    
    export function changeTonic2(newNoteBase: music2.NoteBase, index: number): void {
        currentNoteBase = newNoteBase;
        currentIndex = index;
        updateListeners();
    }

    export function changeMode(newMode: music.Mode): void {
        currentMode = newMode;
        updateListeners();
    }

    export function changeChord(triad: music.Triad): void {
        updateListeners(triad);
    }

    function updateListeners(triad?: music.Triad): void {
        let scale = music.scale(currentTonic, currentMode);

        if (triad) {
            scale = music.appendTriad(scale, triad);
        }

        let stateChange: StateChange = {
            tonic: currentTonic,
            mode: currentMode,
            scale: scale,
            
            noteBase: currentNoteBase,
            index: currentIndex,
            scale2: music2.generateScale(currentNoteBase, currentIndex, currentMode)
        };
        for (let listener of listeners) {
            listener(stateChange);
        }
    }

    export interface StateChange {
        readonly tonic: music.Note;
        readonly mode: music.Mode;
        readonly scale: Array<music.Note>;
        
        readonly noteBase: music2.NoteBase;
        readonly index: number;
        readonly scale2: Array<music2.ScaleNote>;
    }
}

namespace cof {

    let noteSegments: d3.Selection<Segment> = null;
    let noteText: d3.Selection<Segment> = null;
    let degreeSegments: d3.Selection<Segment> = null;
    let degreeText: d3.Selection<Segment> = null;
    let chordSegments: d3.Selection<Segment> = null;
    let chordNotes: d3.Selection<Segment> = null;
    let indexer: (x: Segment) => string = (x) => x.index + "";

    export function init(): void {
        let pad = 30;

        let svg = d3.select("#cof");
        let chordRadius = 220;
        let noteRadius = 200;
        let degreeRadius = 135;
        let innerRadius = 90;

        let cof = svg
            .append("g")
            .attr("transform", "translate(" + (noteRadius + pad) + ", " + (noteRadius + pad) + ")");

        let segments = generateSegments(12);

        let noteArc = d3.svg.arc<Segment>()
            .innerRadius(degreeRadius)
            .outerRadius(noteRadius);

        let degreeArc = d3.svg.arc<Segment>()
            .innerRadius(innerRadius)
            .outerRadius(degreeRadius);

        let chordArc = d3.svg.arc<Segment>()
            .innerRadius(noteRadius)
            .outerRadius(chordRadius);

        noteSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", noteArc)
            .attr("class", "note-segment")
            .on("click", handleNoteClick);

        noteText = cof.append("g").selectAll("text")
            .data(segments)
            .enter()
            .append("text")
            .attr("x", function (x) { return noteArc.centroid(x)[0]; })
            .attr("y", function (x) { return noteArc.centroid(x)[1] + 11; })
            .text("")
            .attr("class", "note-segment-text");

        degreeSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", degreeArc)
            .attr("class", "degree-segment")

        degreeText = cof.append("g").selectAll("text")
            .data(segments, indexer)
            .enter()
            .append("text")
            .attr("x", function (x) { return degreeArc.centroid(x)[0]; })
            .attr("y", function (x) { return degreeArc.centroid(x)[1] + 8; })
            .text("")
            .attr("class", "degree-segment-text");

        chordSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", chordArc)
            .attr("class", "chord-segment")
            .on("click", handleChordClick);

        chordNotes = cof.append("g").selectAll("circle")
            .data(segments, indexer)
            .enter()
            .append("circle")
            .style("pointer-events", "none")
            .attr("r", 15)
            .attr("cx", function (x) { return chordArc.centroid(x)[0]; })
            .attr("cy", function (x) { return chordArc.centroid(x)[1]; })
            .attr("class", "chord-segment-note");

        state.addListener(update);
    }

    export function update(stateChange: state.StateChange): void {

        let data: Array<Segment> = [];
        for (let n of stateChange.scale2) {
            data.push({
                note: null,
                startAngle: 0,
                endAngle: 0,
                scaleNote: n,
                index: n.index
            });
        }

        noteSegments
            .data(data, indexer)
            .attr("class", function (d, i) { return "note-segment " + ((i === 0) ? "note-segment-tonic" : "note-segment-scale"); })
            .exit()
            .attr("class", "note-segment");

        noteText
            .data(data, indexer)
            .text(function(d) { return d.scaleNote.noteName; })
            .exit()
            .text("");

        degreeSegments
            .data(data, indexer)
            .attr("class", "degree-segment-selected")
            .exit()
            .attr("class", "degree-segment")

        degreeText
            .data(data, indexer)
            .text(function (d, i) { return d.scaleNote.chord; })
            .exit()
            .text("");

        // chordSegments
        //     .data(data, indexer)
        //     .attr("class", function (d, i) { return getChordSegmentClass(<music.ScaleNote>d.note); })
        //     .exit()
        //     .attr("class", "chord-segment");

        // chordNotes
        //     .data(data, indexer)
        //     .attr("class", function (d, i) { return getChordNoteClass(<music.ScaleNote>d.note); })
        //     .exit()
        //     .attr("class", "chord-segment-note");
    }

    function getChordSegmentClass(note: music.ScaleNote): string {
        if (note.chordType === music.ChordType.Diminished) return "chord-segment-dim";
        if (note.chordType === music.ChordType.Minor) return "chord-segment-minor";
        if (note.chordType === music.ChordType.Major) return "chord-segment-major";
        throw "Unexpected ChordType";
    }

    function getChordNoteClass(note: music.ScaleNote): string {
        if (note.chordNote === undefined) return "chord-segment-note";
        if (note.chordNote === 0) return "chord-segment-note-root";
        if (note.chordNote === 1) return "chord-segment-note-third";
        return "chord-segment-note-fifth";
    }

    function getNoteLabel(note: music.ScaleNote): string {
        return note.quality.isFlat ? note.flat : note.name;
    }

    function generateSegments(count: number): Segment[] {
        let fifths = music2.fifths();
        let items: Array<Segment> = [];
        let angle = (Math.PI * (2 / count));
        for (let i: number = 0; i < count; i++) {
            let itemAngle = (angle * i) - (angle / 2);
            items.push({
                note: null,
                startAngle: itemAngle,
                endAngle: itemAngle + angle,
                scaleNote: null,
                index: fifths[i]
            });
        }
        return items;
    }

    function handleNoteClick(segment: Segment, i: number): void {
        //state.changeTonic(segment.note);
    }

    function handleChordClick(segment: Segment, i: number): void {
        let note = <music.ScaleNote>segment.note;
        //state.changeChord(note.triad);
    }

    interface Segment {
        readonly note: music.Note;
        readonly startAngle: number;
        readonly endAngle: number;
        //
        readonly scaleNote: music2.ScaleNote;
        readonly index: number;
    }
}

namespace tonics {

    let buttons: d3.Selection<ButtonData> = null;
    
    interface ButtonData {
        readonly noteBase: music2.NoteBase;
        readonly label: string;
        readonly index: number;
    };

    export function init(): void {
        let pad = 5;
        let buttonHeight = 25;
        let svg = d3.select("#modes");

        let tonics = svg.append("g");
        
        let bg = function(noteBase: music2.NoteBase): Array<ButtonData> {
            return [
                { noteBase: noteBase, label: noteBase.name + "♭", index: noteBase.index == 0 ? 11 : noteBase.index - 1},
                { noteBase: noteBase, label: noteBase.name + "", index: noteBase.index},
                { noteBase: noteBase, label: noteBase.name + "♯", index: (noteBase.index + 1) % 12}
            ];
        }
        
        let gs = tonics.selectAll("g")
            .data(music2.noteBases)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; })
            .selectAll("g")
            .data(function(d) { return bg(d); }, indexer)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(" + (i * 55) + ", 0)"; });

        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("class", "tonic-button")
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
        console.log("note click: " + d.noteBase.name + " " + d.index + ".");
        state.changeTonic2(d.noteBase, d.index);
        update(d);
    }

    function update(d: ButtonData): void {
        let ds: Array<ButtonData> = [d];
        buttons
            .data(ds, indexer)
            .attr("class", "tonic-button tonic-button-selected")
            .exit()
            .attr("class", "tonic-button");
    }
    
    function listener(state: state.StateChange): void {
        console.log("note state change: index: " + state.index);
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
        let pad = 50;

        let fretData: Array<number> = getFretData(numberOfFrets);
        let dots: Array<[number, number]> = [
            [3, 3], // [fret, position]
            [5, 3],
            [7, 3],
            [9, 3],
            [12, 2],
            [12, 4],
            [15, 3]
        ];

        let svg = d3.select("#gtr");
        let gtr = svg.append("g");

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
            .attr("r", noteRadius)
            .attr("cx", function (d) { return d[0] * fretGap + pad + (fretGap / 2); })
            .attr("cy", function (d) { return (d[1] + 1) * stringGap + 12; })
            .attr("fill", "lightgrey")
            .attr("stroke", "none");

        let strings = gtr.append("g").selectAll("g")
            .data(music2.tuning.reverse(), function (n) { return n + ""; })
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

        notes
            .data(repeatTo(stateChange.scale2, numberOfFrets), indexer)
            .attr("fill", fill)
            .attr("stroke", "grey")
            .attr("stroke-width", 2)
            .exit()
            .attr("fill", "none")
            .attr("stroke", "none");
    }

    function allNotesFrom(index: number, numberOfNotes: number): Array<StringNote> {
        let items: Array<StringNote> = [];

        for (let i = 0; i < numberOfNotes; i++) {
            items.push({
                octave: Math.floor((i + 1) / 12),
                index: (i + index) % 12
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

    function repeatTo(scale: Array<music2.ScaleNote>, count: number): Array<StringNote> {
        let result: Array<StringNote> = [];

        for (let i = 0; i < count; i++) {
            result.push({
                octave: Math.floor((i + 1) / 8),
                index: scale[i % scale.length].index
            });
        }

        return result;
    }

    interface StringNote {
        octave: number;
        index: number;
    }
}

cof.init();
modes.init();
tonics.init();
gtr.init();
state.changeTonic(music.notes[0]);