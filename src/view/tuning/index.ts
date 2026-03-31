import d3 from "d3";
import type { Msg } from "../../message";
import type { Model } from "../../model";
import type { Svg, View, ViewContext } from "../../types";
import { type Tuning, tunings } from "./tuning-model";

export type { Tuning };
export { tunings };

export const view: View<Model, Msg, Svg> = (_: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    const raiseTuningChangedEvent = (tuning: Tuning): void => {
        raise({
            id: "TuningChanged",
            index: tuning.index,
        });
    };
    if (ctx.init) {
        d3.select("#tuning-dropdown")
            .selectAll("div")
            .data(tunings)
            .enter()
            .append("div")
            .attr("class", "dropdown-content-item")
            .on("click", raiseTuningChangedEvent)
            .text((x) => `${x.tuning}   ${x.description}`);
    }
};
