namespace cookies {

    export function init(): void {
        events.stateChange.subscribe(bakeCookie2);
    }

    function bakeCookie2(stateChange: events.StateChangedEvent): void {
        let json = JSON.stringify(stateChange.state);
        document.cookie = "gtr-cof-state-v2=" + json + ";";
    }

    export function readCookie2(): state.State {
        let result = document.cookie.match(new RegExp("gtr-cof-state-v2" + '=([^;]+)'));
        if(result != null)
        {
            let state: state.State = JSON.parse(result[1]);
            let scaleFamily: music.ScaleFamily = music.scaleFamily.find(x => x.index == state.scaleFamily.index);

            let newState: state.State = {
                noteSpec: state.noteSpec,
                chordIndex: state.chordIndex,
                chordIntervals: state.chordIntervals,
                toggledIndexes: state.toggledIndexes,
                scaleFamily: scaleFamily,
                mode: scaleFamily.modes.find(x => x.index == state.mode.index),
                midiToggledIndexes: state.midiToggledIndexes
            };
            return newState;
        }

        return null;
    }
}