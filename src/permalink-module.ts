namespace permalink {

    let currentState: state.State = null;

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
            if(currentState[key] !== state.defaultState[key]) {
                params.append(key, currentState[key]);
            }
        });

        return `${location.protocol}//${location.host}${location.pathname}?${params.toString()}`;
    }

    // update state from querystring
    export function getState(existingState: state.State): state.State {

        let queryString = location.search;
        let params = new URLSearchParams(queryString);

        Object.keys(existingState).forEach(x => {
            let value = params.get(x);
            if(value == null) return;

            switch (typeof existingState[x]) {
                case 'boolean':
                    existingState[x] = (value === "true");
                    break;
                case 'number':
                    existingState[x] = parseInt(value);
                    break;
                case 'object':
                    existingState[x] = JSON.parse("[" + value + "]");
                    break;
                case 'string':
                    existingState[x] = value;
                    break;
            }

            console.log(`${x} -> ${value}, ${typeof existingState[x]}, ${existingState[x]}`);
        });

        return existingState;
    }

    // test function
    export function getCurrentState(): void {
        let newState = getState(currentState);
    }
}