import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { Svg, SvgView, View, ViewContext } from "../types";
import { renderToSvg } from "../ui";
import { chordIntervalNodes } from "./chord-interval";
import { create as createCircle } from "./circle";
import { create as createGuitar } from "./guitar";
import { view as menuView } from "./menu";
import { create as createModal } from "./modal";
import { modesNodes } from "./modes";
import { view as permalinkView } from "./permalink";
import { view as scaleFamilyView } from "./scale-family";
import { view as settingsView } from "./settings";
import { view as storageView } from "./storage";
import { tonicsNodes } from "./tonics";
import { view as tuningView } from "./tuning";

export { updateStateFromQuerystring } from "./permalink";
export { getStateFromLocalStorage } from "./storage";

const modesPanelView: SvgView<Model, Msg> = (model, raise) => [
    ...tonicsNodes(model, raise),
    ...chordIntervalNodes(model, raise),
    ...modesNodes(model, raise),
];

const svgViews: { containerId: string; view: SvgView<Model, Msg> }[] = [{ containerId: "modes", view: modesPanelView }];

export const createViews = (): View<Model, Msg, Svg> => {
    const chromaticView = createCircle("#chromatic", music.chromatic(), "Chromatic");
    const cofView = createCircle("#cof", music.fifths(), "Circle of Fifths");
    const guitarView = createGuitar();
    const modalView = createModal();

    const views: View<Model, Msg, Svg>[] = [
        menuView,
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
        for (const { containerId, view } of svgViews) {
            const container = document.getElementById(containerId) as SVGElement | null;
            if (container) {
                renderToSvg(container, view(model, raise));
            }
        }
    };
};
