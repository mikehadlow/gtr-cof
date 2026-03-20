import * as music from "../music";
import { type Msg } from "../message";
import { type Model } from "../model";
import { type Svg, View, ViewContext } from "../types";

import { view as menuView } from "./menu";
import { view as tonicsView } from "./tonics";
import { view as modesView } from "./modes";
import { view as chordIntervalView } from "./chord-interval"
import { view as tuningView } from "./tuning";
import { view as scaleFamilyView } from "./scale-family";
import { view as storageView } from "./storage";
import { view as settingsView } from "./settings";
import { view as permalinkView } from "./permalink";
import { create as createCircle } from "./circle";
import { create as createGuitar } from "./guitar";
import { create as createModal } from "./modal";

export { getStateFromLocalStorage } from "./storage";
export { updateStateFromQuerystring } from "./permalink";

export const createViews = (): View<Model, Msg, Svg> => {
    const chromaticView = createCircle("#chromatic", music.chromatic(), "Chromatic");
    const cofView = createCircle("#cof", music.fifths(), "Circle of Fifths");
    const guitarView = createGuitar();
    const modalView = createModal();

    const views: View<Model, Msg, Svg>[] = [
        menuView,
        tonicsView,
        modesView,
        chordIntervalView,
        tuningView,
        chromaticView,
        cofView,
        guitarView,
        scaleFamilyView,
        settingsView,
        storageView,
        permalinkView,
        modalView,
    ];

    return (model: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
        for (const view of views) {
            view(model, ctx, raise);
        }
    };
}
