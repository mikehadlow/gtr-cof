import { type State } from "./types";
import { type Model } from "./model";
import { type Msg } from "./message";
import { createViews, getStateFromLocalStorage, updateStateFromQuerystring } from "./view";
import { update, updateScale } from "./update";
import { setWakeLock } from "./wakelock";

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
