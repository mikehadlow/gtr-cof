import { State, StateSchema } from './types';
import { View, ViewContext, Svg } from "./types";
import { Model } from "./model";
import { Msg } from "./message";
import { defaultState } from './defaultState';

const STORAGE_KEY = "app_state";

export const view: View<Model, Msg, Svg> = ({ state }: Model, _ctx: ViewContext, _raise: (msg: Msg) => void): Svg => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    catch (e) {
        console.log(`Could not store state in local storage: ${e}`);
    }
}

export const getStateFromLocalStorage = (): State => {
    const stateString = localStorage.getItem(STORAGE_KEY)
    if (!stateString) {
        return defaultState;
    }
    const parsed = StateSchema.safeParse(JSON.parse(stateString));
    if (!parsed.success) {
        console.log("Invalid cookie state:", parsed.error.message);
        return defaultState;
    }
    return parsed.data;
}
