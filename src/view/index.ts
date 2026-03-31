import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { View } from "../types";
import { type RenderNode, renderToSvg } from "../ui";
import { chordIntervalNodes } from "./chord-interval";
import { circleNodes } from "./circle";
import { guitarNodes } from "./guitar";
import { create as menuCreate } from "./menu";
import { create as modalCreate } from "./modal";
import { modesNodes } from "./modes";
import { view as permalinkView } from "./permalink";
import { scaleFamilyNodes } from "./scale-family";
import { create as settingsCreate } from "./settings";
import { view as storageView } from "./storage";
import { tonicsNodes } from "./tonics";
import { tuningNodes } from "./tuning";

export { updateStateFromQuerystring } from "./permalink";
export { getStateFromLocalStorage } from "./storage";

const modesPanelView: View<Model, Msg, RenderNode> = (model, raise) => [
    ...tonicsNodes(model, raise),
    ...chordIntervalNodes(model, raise),
    ...modesNodes(model, raise),
];

const svgViews: { containerId: string; view: View<Model, Msg, RenderNode> }[] = [
    { containerId: "modes", view: modesPanelView },
    { containerId: "chromatic", view: circleNodes(music.chromatic(), "Chromatic", 500) },
    { containerId: "cof", view: circleNodes(music.fifths(), "Circle of Fifths", 500) },
    { containerId: "gtr", view: guitarNodes },
    { containerId: "scale-dropdown", view: scaleFamilyNodes },
    { containerId: "tuning-dropdown", view: tuningNodes },
    { containerId: "no-op", view: menuCreate() },
    { containerId: "no-op", view: settingsCreate() },
    { containerId: "no-op", view: storageView },
    { containerId: "no-op", view: permalinkView },
    { containerId: "no-op", view: modalCreate() },
];

export const createViews = () => {
    return (model: Model, raise: (msg: Msg) => void): void => {
        for (const { containerId, view } of svgViews) {
            const container = document.getElementById(containerId) as Element | null;
            if (container) {
                renderToSvg(container, view(model, raise));
            }
        }
    };
};
