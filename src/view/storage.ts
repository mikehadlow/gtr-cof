import { defaultState } from "../defaultState";
import type { Msg } from "../message";
import type { Model } from "../model";
import { type State, StateSchema, type Svg, type View, type ViewContext } from "../types";

const STORAGE_KEY = "app_state";

export const view: View<Model, Msg, Svg> = ({ state }: Model, _ctx: ViewContext, _raise: (msg: Msg) => void): Svg => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.log(`Could not store state in local storage: ${e}`);
    }
};

export const getStateFromLocalStorage = (): State => {
    const stateString = localStorage.getItem(STORAGE_KEY);
    if (!stateString) {
        return { ...defaultState };
    }
    const parsed = StateSchema.safeParse(JSON.parse(stateString));
    if (!parsed.success) {
        console.log("Invalid storage state:", parsed.error.message);
        return { ...defaultState };
    }
    return parsed.data;
};
