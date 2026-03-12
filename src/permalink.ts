import * as events from './events';
import { State } from './types';
import { defaultState } from './state';
import { View, ViewContext, Svg } from "./types";
import { Model } from "./model";
import { Msg } from "./message";

let currentState: State | null = null;

export const view: View<Model, Msg, Svg> = ({ state }: Model, _ctx: ViewContext, _raise: (msg: Msg) => void): Svg => {
    currentState = state;
}

// TODO: remove
export function init(): void {
    events.stateChange.subscribe(x => currentState = x.state);
}

export function populatePermalinkText(): void {
    const permalink = generatePermalink();
    const inputbox = document.getElementById("permalink-text") as HTMLInputElement
    inputbox.value = permalink;
    navigator.clipboard.writeText(permalink);
}

// create querystring from state
export function generatePermalink(): string {
    if (currentState === null) {
        throw "No stateChange event published before querystring requested";
    }

    const params = new URLSearchParams();

    // only copy state that's different from default
    Object.keys(currentState).forEach(key => {
        if ((currentState as any)[key] !== (defaultState as any)[key]) {
            params.append(key, (currentState as any)[key]);
        }
    });

    return `${location.protocol}//${location.host}${location.pathname}?${params.toString()}`;
}

// update state from querystring
export function updateStateFromQuerystring(existingState: State): State {

    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const mutableState: any = existingState;

    Object.keys(existingState).forEach(x => {
        const value = params.get(x);
        if (value == null) return;

        switch (typeof mutableState[x]) {
            case 'boolean':
                mutableState[x] = (value === "true");
                break;
            case 'number':
                mutableState[x] = parseInt(value);
                break;
            case 'object':
                mutableState[x] = JSON.parse("[" + value + "]");
                break;
            case 'string':
                mutableState[x] = value;
                break;
        }

        console.log(`${x} -> ${value}, ${typeof mutableState[x]}, ${mutableState[x]}`);
    });

    return mutableState;
}

// test function
export function getCurrentState(): void {
    if (currentState) {
        updateStateFromQuerystring(currentState);
    }
}
