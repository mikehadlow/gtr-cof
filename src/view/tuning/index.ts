import type { Msg } from "../../message";
import type { Model } from "../../model";
import type { View } from "../../types";
import type { RenderNode } from "../../ui";
import { tunings } from "./tuning-model";

export type { StringInfo, Tuning } from "./tuning-model";
export { tunings } from "./tuning-model";

export const tuningNodes: View<Model, Msg, RenderNode> = (_model, raise): RenderNode[] =>
    tunings.map((t) => ({
        type: "div",
        class: "dropdown-content-item",
        textContent: `${t.tuning}   ${t.description}`,
        onClick: () => raise({ id: "TuningChanged", index: t.index }),
    }));
