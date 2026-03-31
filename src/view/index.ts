import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { Svg, SvgView, View, ViewContext } from "../types";
import { renderToSvg } from "../ui";
import { chordIntervalNodes } from "./chord-interval";
import { circleNodes } from "./circle";
import { guitarNodes } from "./guitar";
import { create as menuCreate } from "./menu";
import { create as createModal } from "./modal";
import { modesNodes } from "./modes";
import { view as permalinkView } from "./permalink";
import { scaleFamilyNodes } from "./scale-family";
import { view as settingsView } from "./settings";
import { view as storageView } from "./storage";
import { tonicsNodes } from "./tonics";
import { tuningNodes } from "./tuning";

export { updateStateFromQuerystring } from "./permalink";
export { getStateFromLocalStorage } from "./storage";

const modesPanelView: SvgView<Model, Msg> = (model, raise) => [
    ...tonicsNodes(model, raise),
    ...chordIntervalNodes(model, raise),
    ...modesNodes(model, raise),
];

const svgViews: { containerId: string; view: SvgView<Model, Msg> }[] = [
    { containerId: "modes", view: modesPanelView },
    { containerId: "chromatic", view: circleNodes(music.chromatic(), "Chromatic", 500) },
    { containerId: "cof", view: circleNodes(music.fifths(), "Circle of Fifths", 500) },
    { containerId: "gtr", view: guitarNodes },
    { containerId: "scale-dropdown", view: scaleFamilyNodes },
    { containerId: "tuning-dropdown", view: tuningNodes },
    { containerId: "no-op", view: menuCreate() },
];

export const createViews = (): View<Model, Msg, Svg> => {
    const modalView = createModal();

    const views: View<Model, Msg, Svg>[] = [settingsView, storageView, permalinkView, modalView];

    return (model: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
        for (const view of views) {
            view(model, ctx, raise);
        }
        for (const { containerId, view } of svgViews) {
            const container = document.getElementById(containerId) as Element | null;
            if (container) {
                renderToSvg(container, view(model, raise));
            }
        }
    };
};
