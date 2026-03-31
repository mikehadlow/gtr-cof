import type { Msg } from "../message";
import type { Model } from "../model";
import type { RenderNode } from "../ui";

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
