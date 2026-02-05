import * as events from './events';
import { State } from './types';
import { defaultState } from './state';

let currentState: State | null = null;

export function init(): void {
    events.stateChange.subscribe(x => currentState = x.state);
}

export function populatePermalinkText(): void {
    let permalink = generatePermalink();
    let inputbox = document.getElementById("permalink-text") as HTMLInputElement
    inputbox.value = permalink;
    inputbox.focus;
    inputbox.select;
    inputbox.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

// create querystring from state
export function generatePermalink(): string {
    if(currentState === null) {
        throw "No stateChange event published before querystring requested";
    }

    let params = new URLSearchParams();

    // only copy state that's different from default
    Object.keys(currentState).forEach(key => {
        if((currentState as any)[key] !== (defaultState as any)[key]) {
            params.append(key, (currentState as any)[key]);
        }
    });

    return `${location.protocol}//${location.host}${location.pathname}?${params.toString()}`;
}

// update state from querystring
export function getState(existingState: State): State {

    let queryString = location.search;
    let params = new URLSearchParams(queryString);
    let mutableState: any = existingState;

    Object.keys(existingState).forEach(x => {
        let value = params.get(x);
        if(value == null) return;

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
        getState(currentState);
    }
}
