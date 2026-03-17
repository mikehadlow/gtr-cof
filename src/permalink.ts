import { State } from './types';
import { View, ViewContext, Svg } from "./types";
import { Model } from "./model";
import { Msg } from "./message";
import { defaultState } from './defaultState';

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
    // only copy state that's different from default
    Object.keys(state).forEach((key) => {
        if ((state as any)[key] !== (defaultState as any)[key]) {
            params.append(key, (state as any)[key]);
        }
    });
    const queryString = params.size === 0 ? "" : `?${params.toString()}`;
    return `${location.protocol}//${location.host}${location.pathname}${queryString}`;
}

// update state from querystring
export function updateStateFromQuerystring(existingState: State): State {
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const mutableState: any = existingState;

    try {
        Object.keys(existingState).forEach(x => {
            const value = params.get(x);
            if (value == null) return;

            switch (typeof mutableState[x]) {
                case 'boolean':
                    mutableState[x] = (value === "true");
                    break;
                case 'number':
                    mutableState[x] = parseInt(value, 10);
                    break;
                case 'object':
                    mutableState[x] = JSON.parse("[" + value + "]");
                    break;
                case 'string':
                    mutableState[x] = value;
                    break;
            }
        });
    }
    catch (e) {
        console.log(`Error reading query string: ${e}`);
        return existingState;
    }

    return mutableState;
}
