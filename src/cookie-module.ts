import * as events from './events-module';
import { State, StateSchema } from './types';

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
        let parsed = StateSchema.safeParse(JSON.parse(result[1]));
        if (!parsed.success) {
            console.log("Invalid cookie state:", parsed.error.message);
            return null;
        }
        return parsed.data;
    }

    return null;
}
