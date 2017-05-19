
namespace gtr {

    let currentState: events.ScaleChangedEvent = null;
    let notes: d3.Selection<StringNote> = null;
    let noteLabels: d3.Selection<StringNote> = null;
    let numberOfFrets = 16;
    let fretboardElement: SVGGElement = null;
    let isLeftHanded: boolean = false;
    let fretboardLabelType: events.FretboardLabelType = events.FretboardLabelType.NoteName;

    let stringGap = 40;
    let fretGap = 70;
    let fretWidth = 5;
    let noteRadius = 15;
    let pad = 20;

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

    export function init() {
        events.tuningChange.subscribe(updateFretboard);
        events.scaleChange.subscribe(update);
        events.leftHandedChange.subscribe(handleLeftHandedChanged);
        events.fretboardLabelChange.subscribe(handleLabelChange);
    }

    function handleLeftHandedChanged(lhEvent: events.LeftHandedFretboardEvent) {
        isLeftHanded = lhEvent.isLeftHanded;
        setHandedness();
    }

    function setHandedness()
    {
        if(isLeftHanded) {
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

    function handleLabelChange(lcEvent: events.FretboardLabelChangeEvent) {

        this.fretboardLabelType = lcEvent.labelType;
        setLabels();
    }

    function setLabels()
    {
        function setNoteName(note: StringNote): string {
            if(note.scaleNote == null) return "";
            return note.scaleNote.noteName;
        }

        function setInterval(note: StringNote): string {
            if(note.scaleNote == null) return "";
            return note.scaleNote.intervalShort;
        }

        switch (this.fretboardLabelType) {
            case events.FretboardLabelType.None:
                noteLabels.text("");
                break;
            case events.FretboardLabelType.NoteName:
                noteLabels.text(setNoteName)
                break;
            case events.FretboardLabelType.Interval:
                noteLabels.text(setInterval);
                break;
        }
    }

    function updateFretboard(tuningInfo: events.TuningChangedEvent): void {

        let fretData: Array<number> = getFretData(numberOfFrets);
        let dots: Array<[number, number]> = tuningInfo.dots;

        d3.selectAll("#gtr > *").remove();
        let svg = d3.select("#gtr");
        svg.append("text")
            .attr("class", "mode-text")
            .attr("x", 30)
            .attr("y", 10)
            .text(tuningInfo.tuning + " " + tuningInfo.description);
        let gtr = svg.append("g").attr("transform", "translate(0, 0) scale(1, 1)");
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

        let strings = gtr.append("g").selectAll("g")
            .data(tuningInfo.notes.slice().reverse(), function (n) { return n + ""; })
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

        if(currentState != null) {
            update(currentState);
        }
    }

    function update(stateChange: events.ScaleChangedEvent): void {

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

        let setText = function(d: StringNote, i: number): string {
            return d.scaleNote.noteName;
        }

        notes
            .data(repeatTo(stateChange.scale2, numberOfFrets), indexer)
            .attr("fill", fill)
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth)
            .exit()
            .attr("fill", "none")
            .attr("stroke", "none");
        noteLabels
            .data(repeatTo(stateChange.scale2, numberOfFrets), indexer)
            .text(setText)
            .exit()
            .each((d, i) => d.scaleNote = null)
            .text("");

        currentState = stateChange;

        setLabels();
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
        scaleNote: music.ScaleNote;
    }
}
