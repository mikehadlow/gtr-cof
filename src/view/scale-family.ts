import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { View } from "../types";
import type { RenderNode } from "../ui";

export const scaleFamilyNodes: View<Model, Msg, RenderNode> = (_model, raise): RenderNode[] =>
    music.scaleFamily.map((sf) => ({
        type: "div",
        class: "dropdown-content-item",
        textContent: sf.name,
        onClick: () => raise({ id: "ScaleFamilyChange", scaleFamily: sf }),
    }));
