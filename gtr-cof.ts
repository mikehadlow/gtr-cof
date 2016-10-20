///<reference path="node_modules/@types/d3/index.d.ts" />

namespace music {

    export let notes: Array<Note> = [
        { name: 'C', index: 0 },
        { name: 'C#', index: 1 },
        { name: 'D', index: 2 },
        { name: 'D#', index: 3 },
        { name: 'E', index: 4 },
        { name: 'F', index: 5 },
        { name: 'F#', index: 6 },
        { name: 'G', index: 7 },
        { name: 'G#', index: 8 },
        { name: 'A', index: 9 },
        { name: 'A#', index: 10 },
        { name: 'B', index: 11 },
    ];

    export let modes: Array<Mode> = [
        { name: 'Lydian', index: 3 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 4 },
        { name: 'Dorian', index: 1 },
        { name: 'N Minor / Aolian', index: 5 },
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
        readonly index: number;
    }

    export type Triad = [Note, Note, Note];

    export interface ScaleNote extends Note {
        readonly degree: number;
        readonly degreeName: string;
        readonly triad: Triad;
        readonly chordType: ChordType;
        chordNote?: number;
    }

    export interface Mode {
        readonly name: string;
        readonly index: number;
    }
    
    export enum ChordType {Major, Minor, Diminished};

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
                index: note.index,
                degree: i,
                degreeName: romanNumeral[i],
                triad: triad,
                chordType: getChordType(triad)
            });
        }
        return scale;
    }
    
    export function appendTriad(scale: Array<ScaleNote>, triad: Triad): Array<ScaleNote> {
        for(let note of scale) {
            for(let i=0; i<3; i++) {
                if(note.name === triad[i].name) {
                    note.chordNote = i;
                }
            }
        }
        return scale;
    }
    
    function getChordType(triad: Triad): ChordType {
        // check for diminished
        if(interval(triad[0], triad[2]) === 6) return ChordType.Diminished;
        // check for minor
        if(interval(triad[0], triad[1]) === 3) return ChordType.Minor;
        // must be Major
        return ChordType.Major;
    }
    
    function interval(a: Note, b: Note): number {
        return (a.index <= b.index) ?  b.index - a.index : (b.index + 12) - a.index;
    }

    export function allNotesFrom(note: Note): Array<Note> {
        let items: Array<Note> = [];

        for (let i = 0; i < 12; i++) {
            items.push(notes[(i + note.index) % 12]);
        }

        return items;
    }
}

namespace state {

    let listeners: Array<(n: StateChange) => void> = [];
    let currentTonic: music.Note = music.notes[0];
    let currentMode: music.Mode = music.modes[1];

    export function addListener(listener: (n: StateChange) => void): void {
        listeners.push(listener);
    }

    export function changeTonic(newTonic: music.Note): void {
        currentTonic = newTonic;
        updateListeners();
    }

    export function changeMode(newMode: music.Mode): void {
        currentMode = newMode;
        updateListeners();
    }

    export function changeChord(triad: music.Triad): void {
        updateListeners(triad);
        console.log("chord " + triad[0].name + ", " + triad[1].name + ", " + triad[2].name);
    }

    function updateListeners(triad?: music.Triad): void {
        let scale = music.scale(currentTonic, currentMode);
        
        if(triad) {
            scale = music.appendTriad(scale, triad);
        }

        let stateChange: StateChange = {
            tonic: currentTonic,
            mode: currentMode,
            scale: scale
        };
        for (let listener of listeners) {
            listener(stateChange);
        }
    }

    export interface StateChange {
        readonly tonic: music.Note;
        readonly mode: music.Mode;
        readonly scale: Array<music.Note>;
    }
}

namespace cof {

    let noteSegments: d3.Selection<Segment> = null;
    let degreeSegments: d3.Selection<Segment> = null;
    let degreeText: d3.Selection<Segment> = null;
    let chordSegments: d3.Selection<Segment> = null;
    let indexer: (x: Segment) => string = (x) => x.note.name;

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
            .attr("fill", "lightgrey")
            .attr("stroke", "black")
            .attr("stroke-width", "3")
            .attr("class", "note-segment")
            .on("click", handleNoteClick);

        cof.append("g").selectAll("text")
            .data(segments)
            .enter()
            .append("text")
            .attr("x", function (x) { return noteArc.centroid(x)[0]; })
            .attr("y", function (x) { return noteArc.centroid(x)[1] + 18; })
            .text(function (x) { return x.note.name; })
            .attr("font-size", "50px")
            .attr("text-anchor", "middle")
            .attr("fill", "black");

        degreeSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", degreeArc)
            .attr("fill", "none")
            .attr("stroke", "none")

        degreeText = cof.append("g").selectAll("text")
            .data(segments, indexer)
            .enter()
            .append("text")
            .attr("x", function (x) { return degreeArc.centroid(x)[0]; })
            .attr("y", function (x) { return degreeArc.centroid(x)[1] + 8; })
            .text("")
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("fill", "black");

        chordSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", chordArc)
            .attr("fill", "none")
            .attr("stroke", "none")
            .on("click", handleChordClick);

        state.addListener(update);
    }

    export function update(stateChange: state.StateChange): void {

        let data: Array<Segment> = [];
        for (let n of stateChange.scale) {
            data.push({
                note: n,
                startAngle: 0,
                endAngle: 0
            });
        }

        noteSegments
            .data(data, indexer)
            .attr("fill", function (d, i) { return (i === 0) ? "yellow" : "white"; })
            .exit()
            .attr("fill", "lightgrey");

        degreeSegments
            .data(data, indexer)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .exit()
            .attr("fill", "none")
            .attr("stroke", "none");

        degreeText
            .data(data, indexer)
            .text(function (d, i) { return (<music.ScaleNote>d.note).degreeName; })
            .exit()
            .text("");

        chordSegments
            .data(data, indexer)
            .attr("fill", function(d, i) { return getChordTypeColour(<music.ScaleNote>d.note); })
            .attr("stroke", "black")
            .attr("stroke-width", "1")
            .exit()
            .attr("fill", "none")
            .attr("stroke", "none");
    }
    
    function getChordTypeText(note: music.ScaleNote): string {
        if(note.chordType === music.ChordType.Diminished) return "O";
        if(note.chordType === music.ChordType.Minor) return "-";
        if(note.chordType === music.ChordType.Major) return "+";
        throw "Unexpected ChordType";
    }
    
    function getChordTypeColour(note: music.ScaleNote): string {
        if(note.chordType === music.ChordType.Diminished) return "red";
        if(note.chordType === music.ChordType.Minor) return "lightblue";
        if(note.chordType === music.ChordType.Major) return "lightgreen";
        throw "Unexpected ChordType";
    }

    function generateSegments(count: number): Segment[] {
        let fifths = music.fifths();
        let items: Array<Segment> = [];
        let angle = (Math.PI * (2 / count));
        for (let i: number = 0; i < count; i++) {
            let itemAngle = (angle * i) - (angle / 2);
            items.push({
                note: fifths[i],
                startAngle: itemAngle,
                endAngle: itemAngle + angle
            });
        }
        return items;
    }

    function handleNoteClick(segment: Segment, i: number): void {
        state.changeTonic(segment.note);
    }

    function handleChordClick(segment: Segment, i: number): void {
        let note = <music.ScaleNote>segment.note;
        state.changeChord(note.triad);
    }

    interface Segment {
        readonly note: music.Note;
        readonly startAngle: number;
        readonly endAngle: number;
    }
}

namespace modes {

    let buttons: d3.Selection<music.Mode> = null;

    export function init(): void {
        let pad = 10;
        let buttonHeight = 50;
        let buttonWidth = 250;
        let svg = d3.select("#modes");
        let modes = svg.append("g");

        let gs = modes.selectAll("g")
            .data(music.modes, function (m) { return m.index.toString(); })
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + 30) + ")"; })

        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("width", buttonWidth)
            .attr("height", buttonHeight)
            .attr("fill", "lightgrey")
            .attr("stroke", "black")
            .attr("stroke-width", "3")
            .on("click", handleButtonClick);

        gs
            .append("text")
            .attr("x", pad + 20)
            .attr("y", 34)
            .text(function (x) { return x.name; })
            .attr("font-size", "30px")
            .attr("text-anchor", "left")
            .attr("fill", "black");

        state.addListener(update);
    }

    function handleButtonClick(mode: music.Mode, i: number): void {
        state.changeMode(mode);
    }

    function update(stateChange: state.StateChange): void {
        let modes: Array<music.Mode> = [stateChange.mode];
        buttons
            .data(modes, function (m) { return m.index.toString(); })
            .attr("fill", "white")
            .exit()
            .attr("fill", "lightgrey")
    }
}

namespace gtr {

    let notes: d3.Selection<music.Note> = null;

    let noteColours: Array<string> = [
        "yellow",
        "lightgrey",
        "white",
        "white",
        "white",
        "lightgrey",
        "white"
    ];

    export function init(): void {
        let stringGap = 40;
        let fretGap = 70;
        let fretWidth = 5;
        let noteRadius = 15;
        let pad = 50;

        let fretData: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        let dots: Array<[number, number]> = [
            [3, 3], // [fret, position]
            [5, 3],
            [7, 3],
            [9, 3],
            [12, 2],
            [12, 4],
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
            .data(music.tuning.reverse(), function (n) { return n.name; })
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + ((i * stringGap) + pad) + ")"; });

        // string lines
        strings
            .append("line")
            .attr("x1", pad + fretGap)
            .attr("y1", stringGap / 2)
            .attr("x2", pad + (fretGap * 12) + 20)
            .attr("y2", stringGap / 2)
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        notes = strings
            .selectAll("circle")
            .data(function (d) { return music.allNotesFrom(d); }, function (d) { return d.name; })
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
        
        let fill = function(d: music.Note, i: number): string {
            return noteColours[i];
        };
        
        let stroke = function(d: music.Note, i: number): string {
            let note = <music.ScaleNote>d;
            if(note.chordNote !== undefined) {
                return "red";
            }
            return "black";
        };
        
        let strokeWidth = function(d: music.Note, i: number): number {
            let note = <music.ScaleNote>d;
            if(note.chordNote !== undefined) {
                return 5;
            }
            return 2;
        };

        
        notes
            .data(stateChange.scale, function (d) { return d.name; })
            .attr("fill", fill)
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth)
            .exit()
            .attr("fill", "none")
            .attr("stroke", "none");
    }
}

cof.init();
modes.init();
gtr.init();
state.changeTonic(music.notes[0]);