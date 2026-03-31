import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { RenderNode } from "../ui";

export function modesNodes(model: Model, raise: (msg: Msg) => void): RenderNode[] {
    const pad = 5;
    const buttonHeight = 25;
    const scaleFamily = music.scaleFamily[model.state.scaleFamilyIndex];
    const activeMode = scaleFamily.modes.find((m) => m.index === model.state.modeIndex)!;

    const children: RenderNode[] = scaleFamily.modes.map((mode, i) => ({
        type: "g" as const,
        transform: `translate(0, ${i * (buttonHeight + pad) + pad})`,
        children: [
            {
                type: "rect" as const,
                x: pad,
                y: 0,
                width: 150,
                height: buttonHeight,
                class: mode.index === activeMode.index ? "mode-button mode-button-selected" : "mode-button",
                onClick: () => raise({ id: "ModeChanged", mode }),
            },
            {
                type: "text" as const,
                x: pad + 10,
                y: 17,
                class: "mode-text",
                content: mode.name,
            },
        ],
    }));

    return [{ type: "g", transform: "translate(0, 280)", children }];
}
