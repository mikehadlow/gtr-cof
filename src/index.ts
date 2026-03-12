import d3 from "d3";
import * as menu from "./menu";
import * as tonics from "./tonics";
import * as modes from "./modes";
import * as chordInterval from "./chord-interval";
import * as cof from "./cof";
import * as gtr from "./gtr";
import * as tuning from "./tuning";
import * as scaleFamily from "./scale-family";
import * as settings from "./settings";
import * as permalink from "./permalink";
import * as state from "./state";
import * as cookies from "./cookie";
import * as music from "./music";
import { setWakeLock } from "./wakelock";
import { type State } from "./types";
import { type Model } from "./model";
import { updateScale } from "./update/updateScale";
import { createViews } from "./view";
import { type Msg } from "./message";
import { update } from "./update";
import { getStateFromLocalStorage } from "./storage";
import { updateStateFromQuerystring } from "./permalink";

// Expose modules for HTML onclick handlers
declare global {
    interface Window {
        settings: typeof settings;
        permalink: typeof permalink;
    }
}
window.settings = settings;
window.permalink = permalink;

const initModel = (): Model => {
    const state: State = updateStateFromQuerystring(getStateFromLocalStorage());
    return updateScale(state);
};

const main = () => {
    menu.init(); // Elmed
    tonics.init(); // Elmed
    modes.init(music.scaleFamily[0]); // Elmed
    chordInterval.init(); // Elmed
    new cof.NoteCircle(d3.select("#chromatic"), music.chromatic(), "Chromatic"); // Elmed
    new cof.NoteCircle(d3.select("#cof"), music.fifths(), "Circle of Fifths"); // Elmed
    gtr.init(); // Elmed
    tuning.init(); // Elmed
    scaleFamily.init(); // Elmed
    settings.init(); // Elmed
    permalink.init();
    state.init(); // Not needed
    cookies.init(); // Elmed
    setWakeLock(); // Elmed
};

const main2 = () => {
    let model: Model = initModel();

    const view = createViews();
    const raise = (msg: Msg): void => {
        model = update(model, msg)
        view(model, { init: false }, raise);
    }

    view(model, { init: true }, raise);
    setWakeLock();
};

main2();
