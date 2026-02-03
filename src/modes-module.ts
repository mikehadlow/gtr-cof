import * as events from './events-module';
import * as music from './music-module';

let buttons: d3.Selection<music.Mode>;
let modes: d3.Selection<any>;

export function init(scaleFamily: music.ScaleFamily): void {
    let svg = d3.select("#modes");
    modes = svg
        .append("g")
        .attr("transform", "translate(0, 280)");

    drawButtons(scaleFamily);

    events.modeChange.subscribe(update);
    events.scaleFamilyChange.subscribe(handleScaleFamilyChangedEvent);
}

function drawButtons(scaleFamily: music.ScaleFamily): void {
    let pad = 5;
    let buttonHeight = 25;

    modes.selectAll("g").remove();
    let gs = modes.selectAll("g").data(scaleFamily.modes, index);

    gs
        .exit()
        .remove();

    gs
        .enter()
        .append("g")
        .attr("transform", (d, i) => "translate(0, " + (i * (buttonHeight + pad) + pad) + ")");

    buttons = gs
        .append("rect")
        .attr("x", pad)
        .attr("y", 0)
        .attr("strokeWidth", 2)
        .attr("width", 150)
        .attr("height", 25)
        .attr("class", "mode-button")
        .on("click", (d) => events.modeChange.publish({ mode: d }));

    gs
        .append("text")
        .attr("x", pad + 10)
        .attr("y", 17)
        .text((x) => x.name)
        .attr("class", "mode-text");

    let defaultMode = scaleFamily.modes.find(x => x.index == scaleFamily.defaultModeIndex);
    highlightActiveMode(defaultMode!);
}

function update(modeChange: events.ModeChangedEvent): void {
    highlightActiveMode(modeChange.mode);
}

function highlightActiveMode(mode: music.Mode): void {
    let modes: Array<music.Mode> = [mode];
    buttons
        .data(modes, index)
        .attr("class", "mode-button mode-button-selected")
        .exit()
        .attr("class", "mode-button")
}

function handleScaleFamilyChangedEvent(scaleFamilyChangedEvent: events.ScaleFamilyChangeEvent) {
    drawButtons(scaleFamilyChangedEvent.scaleFamily);
}

function index(mode: music.Mode): string {
    return mode.index.toString();
}
