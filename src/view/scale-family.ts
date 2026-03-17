import d3 from 'd3';
import * as music from '../music';
import { View, ViewContext, Svg } from "../types";
import { Model } from "../model";
import { Msg } from "../message";

export const view: View<Model, Msg, Svg> = (_: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    function raiseScaleFamilyChangedEvent(scaleFamily: music.ScaleFamily): void {
        raise({
            id: "ScaleFamilyChange",
            scaleFamily: scaleFamily
        });
    }
    if (ctx.init) {
        d3.select("#scale-dropdown")
            .selectAll("div")
            .data(music.scaleFamily)
            .enter()
            .append("div")
            .attr("class", "dropdown-content-item")
            .on("click", raiseScaleFamilyChangedEvent)
            .text(x => x.name);
    }
}
