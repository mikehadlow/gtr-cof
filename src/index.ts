import { setWakeLock } from "./wakelock";
import { type State } from "./types";
import { type Model } from "./model";
import { updateScale } from "./update/updateScale";
import { createViews } from "./view";
import { type Msg } from "./message";
import { update } from "./update";
import { getStateFromLocalStorage } from "./view/storage";
import { updateStateFromQuerystring } from "./view/permalink";

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
