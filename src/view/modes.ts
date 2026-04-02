import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { RenderNode } from "../ui";

export function modesNodes(model: Model, raise: (msg: Msg) => void): RenderNode[] {
    const scaleFamily = music.scaleFamily[model.state.scaleFamilyIndex];
    const activeMode = scaleFamily.modes.find((m) => m.index === model.state.modeIndex)!;

    const children: RenderNode[] = scaleFamily.modes.map((mode, i) => ({
        type: "buttonRow" as const,
        row: i,
        children: [
            {
                type: "svgButton" as const,
                class: mode.index === activeMode.index ? "mode-button mode-button-selected" : "mode-button",
                label: mode.name,
                xPos: 0,
                xSize: 3,
                onClick: () => raise({ id: "ModeChanged", mode }),
            },
        ],
    }));

    return [{ type: "g", transform: "translate(0, 280)", children }];
}
