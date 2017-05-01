
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
