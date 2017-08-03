
namespace cof {

    export class NoteCircle {
        noteSegments: d3.Selection<Segment>;
        noteText: d3.Selection<Segment>;
        intervalSegments: d3.Selection<Segment>;
        intervalText: d3.Selection<Segment>;
        chordText: d3.Selection<Segment>;
        chordSegments: d3.Selection<Segment>;
        chordNotes: d3.Selection<Segment>;
        indexer: (x: Segment) => string = (x) => x.index + "";

        constructor(svg: d3.Selection<any>, noteIndexes: number[], label: string) {
            let pad = 50;

            let chordRadius = 240;
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

            this.intervalSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", degreeArc)
                .attr("class", "degree-segment")

            this.intervalText = cof.append("g").selectAll("text")
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
                .attr("r", 25)
                .attr("cx", function (x) { return chordArc.centroid(x)[0]; })
                .attr("cy", function (x) { return chordArc.centroid(x)[1]; })
                .attr("class", "chord-segment-note");

            this.chordText = cof.append("g").selectAll("text")
                .data(segments, this.indexer)
                .enter()
                .append("text")
                .attr("x", function (x) { return chordArc.centroid(x)[0]; })
                .attr("y", function (x) { return chordArc.centroid(x)[1] + 8; })
                .text("")
                .attr("class", "degree-segment-text");

            // let instance = this;
            // events.scaleChange.subscribe(function (stateChange: events.ScaleChangedEvent) {
            //     instance.update(stateChange);
            // });

            events.scaleChange2.subscribe(scaleChnaged => this.update2(scaleChnaged));
        }

        update2(scaleChnaged: events.ScaleChangedEvent2): void {
            let data: Segment[] = scaleChnaged.nodes.map(node => <Segment>{
                    startAngle: 0,
                    endAngle: 0,
                    scaleNote: {},
                    index: node.scaleNote.note.index,
                    node: node
                });

            this.noteSegments
                .data(data, this.indexer)
                .attr("class", (d, i) => "note-segment " + 
                    (d.node.scaleNote.isScaleNote ? ((i === 0) ? "note-segment-tonic" : "note-segment-scale") : ""));

            this.noteText
                .data(data, this.indexer)
                .text(d => d.node.scaleNote.note.label);

            this.intervalSegments
                .data(data, this.indexer)
                .attr("class", d => d.node.scaleNote.isScaleNote ? "degree-segment-selected" : "degree-segment");

            this.intervalText
                .data(data, this.indexer)
                .text(d => d.node.scaleNote.intervalName);

            this.chordText
                .data(data, this.indexer)
                .text(d => d.node.scaleNote.chord!.romanNumeral + "");

            this.chordSegments
                .data(data, this.indexer)
                .attr("class", d => d.node.scaleNote.isScaleNote ? getChordSegmentClass(d.node.scaleNote.chord!) : "chord-segment");

            this.chordNotes
                .data(data, this.indexer)
                .attr("class", "chord-segment-note");
        }
    }

    function getChordSegmentClass(chord: music.Chord): string {
        if (chord.type === music.ChordType.Diminished) return "chord-segment-dim";
        if (chord.type === music.ChordType.Minor) return "chord-segment-minor";
        if (chord.type === music.ChordType.Major) return "chord-segment-major";
        throw "Unexpected ChordType";
    }

    // function getChordNoteClass(chord: music2.Chord): string {
    //     if (note.chordNote === undefined) return "chord-segment-note";
    //     if (note.chordNote === 0) return "chord-segment-note-root";
    //     if (note.chordNote === 1) return "chord-segment-note-third";
    //     return "chord-segment-note-fifth";
    // }

    function generateSegments(fifths: number[]): Segment[] {
        let count = fifths.length;
        let items: Array<Segment> = [];
        let angle = (Math.PI * (2 / count));
        for (let i: number = 0; i < count; i++) {
            let itemAngle = (angle * i) - (angle / 2);
            items.push({
                startAngle: itemAngle,
                endAngle: itemAngle + angle,
                index: fifths[i],
                node: music.nullNode
            });
        }
        return items;
    }

    function handleNoteClick(segment: Segment, i: number): void {
        events.tonicChange.publish({
            noteSpec: replaceDoubleSharpsAndFlatsWithEquivalentNote(segment.node.scaleNote.note)
        });
    }

    function replaceDoubleSharpsAndFlatsWithEquivalentNote(noteSpec: music.NoteSpec): music.NoteSpec {
        if(Math.abs(noteSpec.offset) > 1) {
            let naturalId = noteSpec.natural.id;
            let newNaturalId = (noteSpec.offset > 0)
                ? naturalId + 1 % 7
                : naturalId == 0 ? 6 : naturalId - 1;
            let newNatural = music.naturals.filter(x => x.id === newNaturalId)[0];
            return music.createNoteSpec(newNatural.index, noteSpec.index)
        }
        return noteSpec;
    }

    function handleChordClick(segment: Segment, i: number): void {
        events.chordChange.publish({ chordIndex: segment.node.scaleNote.note.index });
    }

    interface Segment {
        readonly startAngle: number;
        readonly endAngle: number;
        readonly index: number;
        readonly node: music.Node;
    }
}
