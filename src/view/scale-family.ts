import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { View } from "../types";
import type { RenderNode } from "../ui";

export const scaleFamilySelectNodes: View<Model, Msg, RenderNode> = (model, raise): RenderNode[] => {
    const currentFamily = music.scaleFamily[model.state.scaleFamilyIndex];
    return [
        {
            type: "selectHtml",
            x: 5,
            y: 5,
            width: 150,
            height: 25,
            class: "scale-family-select",
            options: music.scaleFamily.map((sf) => ({ value: String(sf.index), label: sf.name })),
            selectedValue: String(currentFamily.index),
            onChange: (value) => {
                const sf = music.scaleFamily.find((x) => String(x.index) === value);
                if (sf) {
                    raise({ id: "ScaleFamilyChange", scaleFamily: sf });
                }
            },
        },
    ];
};
