import * as events from './events-module';
import { State } from './types';

let cookieName = "gtr-cof-state-v4";

export function init(): void {
    events.stateChange.subscribe(bakeCookie2);
}

function bakeCookie2(stateChange: events.StateChangedEvent): void {
    let json = JSON.stringify(stateChange.state);
    document.cookie = cookieName + "=" + json + ";";
}

export function readCookie2(): State | null {
    let result = document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
    if (result != null) {
        let state: State = JSON.parse(result[1]);
        console.log(JSON.stringify(state, null, 2));
        return state;
    }

    return null;
}
