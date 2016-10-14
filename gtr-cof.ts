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

    let scaleTones: Array<number> = [2, 2, 1, 2, 2, 2, 1];

    export class Note {
        name: string;
        index: number;
    }

    export class Mode {
        name: string;
        index: number;
    }

    export function fifths(): Array<Note> {
        let items: Array<Note> = [];
        let current: Note = notes[0];

        for (let i: number = 0; i < 12; i++) {
            items.push(current);
            current = notes[(current.index + 7) % 12];
        }

        return items;
    }

    export function scale(tonic: Note, mode: Mode): Array<Note> {
        let scale: Array<Note> = [];
        let noteIndex = tonic.index;

        for (let i = 0; i < 7; i++) {
            scale.push(notes[noteIndex]);
            noteIndex = (noteIndex + scaleTones[((i + mode.index) % 7)]) % 12
        }
        return scale;
    }
}

namespace state {

    let listeners: Array<(n: Array<music.Note>) => void> = [];
    let currentTonic: music.Note = music.notes[0];
    let currentMode: music.Mode = music.modes[1];

    export function addListener(listener: (n: Array<music.Note>) => void): void {
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

    function updateListeners(): void {
        let scale = music.scale(currentTonic, currentMode);
        for (let listener of listeners) {
            listener(scale);
        }
    }
}

namespace gtrcof {

    let noteSegments: d3.Selection<Segment> = null;

    export function init(): void {
        let pad = 50;

        let svg = d3.select("#cof");
        let svgWidth = +svg.attr("width");
        let svgHeight = +svg.attr("height");
        let svgMin = (svgWidth > svgHeight) ? svgHeight : svgWidth;
        let radius = (svgMin - pad * 2) / 2;
        let innerRadius = radius / 2;
        let textRadius = innerRadius + (radius - innerRadius) / 2;


        let cof = svg
            .append("g")
            .attr("transform", "translate(" + (radius + pad) + ", " + (radius + pad) + ")");

        let segments = generateSegments(12);

        noteSegments = cof.selectAll("path")
            .data(segments, function (s) { return s.note.name; })
            .enter()
            .append("path")
            .attr("d", noteSegmentGenerator(innerRadius, radius))
            .attr("fill", "lightgrey")
            .attr("stroke", "black")
            .attr("stroke-width", "3")
            .attr("class", "note-segment")
            .on("click", handleNoteClick);

        cof.selectAll("text")
            .data(segments)
            .enter()
            .append("text")
            .attr("x", function (x) { return polarToCart(textRadius, x.textAngle)[0]; })
            .attr("y", function (x) { return polarToCart(textRadius, x.textAngle)[1] + 25; })
            .text(function (x) { return x.note.name; })
            .attr("font-size", "80px")
            .attr("text-anchor", "middle")
            .attr("fill", "black");

        state.addListener(update);

        console.log("init done!");
    }

    export function update(notes: Array<music.Note>): void {

        let data: Array<Segment> = [];
        for (let n of notes) {
            data.push({
                startAngle: 0,
                endAngle: 0,
                textAngle: 0,
                note: n
            });
        }

        let segments = noteSegments
            .data(data, function (n) { return n.note.name; })
            .attr("fill", "white");

        segments.exit().attr("fill", "lightgrey");
    }

    function noteSegmentGenerator(inner: number, outter: number): (Segment) => string {
        return function (segment: Segment) {
            let arc = d3.svg.arc<d3.svg.Arc<void>>()
                .innerRadius(inner)
                .outerRadius(outter)
                .startAngle(segment.startAngle)
                .endAngle(segment.endAngle);

            return arc(d3.svg.arc<void>());
        }
    }

    function polarToCart(r: number, radians: number): [number, number] {
        return [r * Math.cos(radians), r * Math.sin(radians)];
    }

    function generateSegments(count: number): Segment[] {
        let fifths = music.fifths();
        let items: Array<Segment> = [];
        let angle = (Math.PI * (2 / count));
        for (let i: number = 0; i < count; i++) {
            let itemAngle = (angle * i) - (angle / 2);
            items.push({
                startAngle: itemAngle,
                endAngle: itemAngle + angle,
                textAngle: itemAngle - (Math.PI / 2) + (angle / 2),
                note: fifths[i]
            });
        }
        return items;
    }

    function handleNoteClick(segment: Segment, i: number): void {
        state.changeTonic(segment.note);
    }

    class Segment {
        startAngle: number;
        endAngle: number;
        textAngle: number;
        note: music.Note;
    }
}

namespace modes {

    export function init(): void {
        let pad = 10;
        let buttonHeight = 50;
        let buttonWidth = 250;
        let svg = d3.select("#modes");
        let modes = svg.append("g");

        let buttons = modes.selectAll("g")
            .data(music.modes)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + 30) + ")"; })

        buttons
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("width", buttonWidth)
            .attr("height", buttonHeight)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", "3")
            .on("click", handleButtonClick);

        buttons
            .append("text")
            .attr("x", pad + 20)
            .attr("y", 34)
            .text(function (x) { return x.name; })
            .attr("font-size", "30px")
            .attr("text-anchor", "left")
            .attr("fill", "black");
    }

    function handleButtonClick(mode: music.Mode, i: number): void {
        state.changeMode(mode);
    }

}

gtrcof.init();
modes.init();
state.changeTonic(music.notes[0]);