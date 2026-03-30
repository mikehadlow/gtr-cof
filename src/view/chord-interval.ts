import d3 from "d3";
import type { Msg } from "../message";
import type { Model } from "../model";
import type { Svg, View, ViewContext } from "../types";
import type { RenderNode } from "../ui";

let buttons: d3.Selection<number>;
let toggle: number = 0;

export function chordIntervalNodes(model: Model, raise: (msg: Msg) => void): RenderNode[] {
    const radius = 10;
    const pad = 2;

    const children: RenderNode[] = [0, 1, 2, 3, 4, 5, 6].map((i) => ({
        type: "g" as const,
        transform: `translate(${i * (radius * 2 + pad) + pad}, 0)`,
        children: [
            {
                type: "circle" as const,
                cx: radius,
                cy: radius,
                r: radius,
                class: model.state.chordIntervals.includes(i) ? "mode-button mode-button-selected" : "mode-button",
                onClick: () => {
                    const currentToggle = model.state.chordIntervals.reduce((acc, ci) => acc | (2 ** ci), 0);
                    const updatedToggle = currentToggle ^ (2 ** i);
                    const chordIntervals = [0, 1, 2, 3, 4, 5, 6].filter(
                        (ci) => ((2 ** ci) & updatedToggle) === 2 ** ci,
                    );
                    raise({ id: "ChordIntervalChange", chordIntervals });
                },
            },
            {
                type: "text" as const,
                x: radius,
                y: radius + 5,
                textAnchor: "middle",
                content: `${i + 1}`,
            },
        ],
    }));

    return [{ type: "g", transform: "translate(0, 240)", children }];
}

export const view: View<Model, Msg, Svg> = (model: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    const onClick = (x: number) => {
        const updatedToggle = toggle ^ (2 ** x);
        const chordIntervals = [0, 1, 2, 3, 4, 5, 6].filter((x) => ((2 ** x) & updatedToggle) === 2 ** x);
        raise({ id: "ChordIntervalChange", chordIntervals: chordIntervals });
    };

    if (ctx.init) {
        const radius = 10;
        const pad = 2;

        const svg = d3.select("#modes");
        const intervals = svg.append("g").attr("transform", "translate(0, 240)");

        const gs = intervals
            .selectAll("g")
            .data([0, 1, 2, 3, 4, 5, 6], (i) => i.toString())
            .enter()
            .append("g")
            .attr("transform", (_d, i) => `translate(${i * (radius * 2 + pad) + pad}, 0)`);

        buttons = gs
            .append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("r", radius)
            .attr("strokeWidth", 2)
            .attr("class", "mode-button")
            .on("click", onClick);

        gs.append("text")
            .attr("x", radius)
            .attr("y", radius + 5)
            .attr("text-anchor", "middle")
            .text((x) => x + 1);
    }

    toggle = 0;
    model.state.chordIntervals.forEach((x) => {
        toggle = toggle + 2 ** x;
    });
    buttons
        .data(model.state.chordIntervals, (m) => m.toString())
        .attr("class", "mode-button mode-button-selected")
        .exit()
        .attr("class", "mode-button");
};
