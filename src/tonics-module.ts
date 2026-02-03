import * as d3 from 'd3';
import * as events from './events-module';
import * as music from './music-module';

let buttons: d3.Selection<ButtonData>;

type ButtonData = {
    readonly noteSpec: music.NoteSpec;
};

function bg(natural: music.Natural): Array<ButtonData> {
    let flatIndex = natural.index == 0 ? 11 : natural.index - 1;
    let sharpIndex = (natural.index + 1) % 12;
    return [
        { noteSpec: music.createNoteSpec(natural.index, flatIndex) },
        { noteSpec: music.createNoteSpec(natural.index, natural.index) },
        { noteSpec: music.createNoteSpec(natural.index, sharpIndex) }
    ];
}

export function init(): void {
    let pad = 5;
    let buttonHeight = 25;
    let svg = d3.select("#modes");

    let tonics = svg.append("g");

    let gs = tonics.selectAll("g")
        .data(music.naturals)
        .enter()
        .append("g")
        .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; })
        .selectAll("g")
        .data(d => bg(d), indexer)
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
        .attr("class", d => isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button")
        .on("click", d => events.tonicChange.publish({ noteSpec: d.noteSpec }));

    gs
        .append("text")
        .attr("x", pad + 10)
        .attr("y", 17)
        .text(function (x) { return x.noteSpec.label; })
        .attr("class", "tonic-text");

    events.tonicChange.subscribe(listener);
}

function listener(tonicChanged: events.TonicChangedEvent): void {
    let ds: Array<ButtonData> = [{
        noteSpec: tonicChanged.noteSpec
    }];
    buttons
        .data(ds, indexer)
        .attr("class", "tonic-button tonic-button-selected")
        .exit()
        .attr("class", d => isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button");
}

function indexer(d: ButtonData): string {
    return d.noteSpec.label;
}

function isSameNoteAsNatural(noteSpec: music.NoteSpec): boolean {
    return music.naturals.some(x => x.index === noteSpec.index && x.index != noteSpec.natural.index);
}
