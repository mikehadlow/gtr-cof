import type { State } from '../types';
import type { View, ViewContext, Svg } from "../types";
import type { Model } from "../model";
import type { Msg } from "../message";
import { defaultState } from '../defaultState';

const PERMALINK_BUTTON_ID = "permalink-button";
const PERMALINK_TEXT_ID = "permalink-text";

export const view: View<Model, Msg, Svg> = ({ state }: Model, _ctx: ViewContext, _raise: (msg: Msg) => void): Svg => {
    const permalinkButton = document.getElementById(PERMALINK_BUTTON_ID);
    if (permalinkButton) {
        permalinkButton.onclick = () => populatePermalinkText(state);
    }
}

function populatePermalinkText(state: State): void {
    const permalink = generatePermalink(state);
    const inputbox = document.getElementById(PERMALINK_TEXT_ID) as HTMLInputElement
    inputbox.value = permalink;
    navigator.clipboard.writeText(permalink);
}

// create querystring from state
function generatePermalink(state: State): string {
    const params = new URLSearchParams();
    const keys = Object.keys(state) as Array<keyof State>;
    for (const key of keys) {
        // only copy state that's different from default
        if (state[key] !== defaultState[key]) {
            params.append(key, state[key].toString());
        }
    }
    const queryString = params.size === 0 ? "" : `?${params.toString()}`;
    return `${location.protocol}//${location.host}${location.pathname}${queryString}`;
}

// update state from querystring
export function updateStateFromQuerystring(existingState: State): State {
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const mutableState = { ...existingState };
    const keys = Object.keys(existingState) as Array<keyof State>;

    try {
        for (const x of keys) {
            const value = params.get(x);
            if (value == null) continue;

            switch (typeof mutableState[x]) {
                case 'boolean':
                    (mutableState[x] as boolean) = (value === "true");
                    break;
                case 'number':
                    (mutableState[x] as number) = parseInt(value, 10);
                    break;
                case 'object':
                    (mutableState[x] as object) = JSON.parse("[" + value + "]");
                    break;
                case 'string':
                    (mutableState[x] as string) = value;
                    break;
            }
        }
    }
    catch (e) {
        console.log(`Error reading query string: ${e}`);
        return existingState;
    }

    return mutableState;
}
