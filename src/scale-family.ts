import * as d3 from 'd3';
import * as events from './events';
import * as music from './music';

export function init() {
    d3.select("#scale-dropdown")
        .selectAll("div")
        .data(music.scaleFamily)
        .enter()
        .append("div")
        .attr("class", "dropdown-content-item")
        .on("click", x => raiseScaleFamilyChangedEvent(x))
        .text(x => x.name);
}

function raiseScaleFamilyChangedEvent(scaleFamily: music.ScaleFamily): void{
    events.scaleFamilyChange.publish({
        scaleFamily: scaleFamily
    });
}
