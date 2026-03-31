import type { Msg } from "../../message";
import type { Model } from "../../model";
import type { View } from "../../types";
import type { RenderNode } from "../../ui";
import { type Tuning, tunings } from "./tuning-model";

export type { Tuning };
export { tunings };

export const tuningNodes: View<Model, Msg, RenderNode> = (_model, raise): RenderNode[] =>
    tunings.map((t) => ({
        type: "div",
        class: "dropdown-content-item",
        textContent: `${t.tuning}   ${t.description}`,
        onClick: () => raise({ id: "TuningChanged", index: t.index }),
    }));
