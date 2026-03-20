import d3 from "d3";
import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { Svg, View, ViewContext } from "../types";

export const view: View<Model, Msg, Svg> = (_: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    function raiseScaleFamilyChangedEvent(scaleFamily: music.ScaleFamily): void {
        raise({
            id: "ScaleFamilyChange",
            scaleFamily: scaleFamily,
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
            .text((x) => x.name);
    }
};
