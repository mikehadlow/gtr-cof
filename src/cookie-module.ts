namespace cookies {

    let cookieName = "gtr-cof-state-v3";

    export function init(): void {
        events.stateChange.subscribe(bakeCookie2);
    }

    function bakeCookie2(stateChange: events.StateChangedEvent): void {
        let json = JSON.stringify(stateChange.state);
        document.cookie = cookieName + "=" + json + ";";
    }

    export function readCookie2(): state.State {
        let result = document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
        if(result != null)
        {
            let state: state.State = JSON.parse(result[1]);
            return state;
        }

        return null;
    }
}