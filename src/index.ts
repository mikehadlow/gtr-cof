import type { Msg } from "./message";
import type { Model } from "./model";
import { service } from "./service";
import type { State } from "./types";
import { update, updateScale } from "./update";
import { createViews, getStateFromLocalStorage, updateStateFromQuerystring } from "./view";
import { setWakeLock } from "./wakelock";

const initModel = (): Model => {
    const state: State = updateStateFromQuerystring(getStateFromLocalStorage());
    return updateScale(state);
};

const main = () => {
    let model: Model = initModel();
    const view = createViews();

    const raise = (msg: Msg): void => {
        model = update(model, msg);
        service(model, msg, raise);
        view(model, raise);
    };

    view(model, raise);
    setWakeLock();
};

main();
