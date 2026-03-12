import * as music from "../music";
import { type Msg } from "../message";
import { type Model } from "../model";
import { type Svg, View, ViewContext } from "../types";

import { view as menuView } from "../menu";
import { view as tonicsView } from "../tonics";
import { view as modesView } from "../modes";
import { view as chordIntervalView } from "../chord-interval"
import { create as createCircle } from "../circle";

export const createViews = (): View<Model, Msg, Svg> => {
    const chromaticView = createCircle("#chromatic", music.chromatic(), "Chromatic");
    const cofView = createCircle("#cof", music.fifths(), "Circle of Fifths");
    return (model: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
        menuView(model, ctx, raise);
        tonicsView(model, ctx, raise);
        modesView(model, ctx, raise);
        chordIntervalView(model, ctx, raise);
        chromaticView(model, ctx, raise);
        cofView(model, ctx, raise);
    };
}
