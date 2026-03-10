import { Msg } from "../message";
import { Model } from "../model";
import { Svg, View, ViewContext } from "../types";

import { view as menuView } from "../menu";
import { view as tonicsView } from "../tonics";
import { view as modesView } from "../modes";
import { view as chordIntervalView } from "../chord-interval"

export const view: View<Model, Msg, Svg> = (model: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    menuView(model, ctx, raise);
    tonicsView(model, ctx, raise);
    modesView(model, ctx, raise);
    chordIntervalView(model, ctx, raise);
}
