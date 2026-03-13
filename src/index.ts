import * as settings from "./settings";
import * as permalink from "./permalink";
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
    let model: Model = initModel();
    const view = createViews();

    const raise = (msg: Msg): void => {
        model = update(model, msg)
        view(model, { init: false }, raise);
    }

    view(model, { init: true }, raise);
    setWakeLock();
};

main();
