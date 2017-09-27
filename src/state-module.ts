


namespace state {

    let currentMode: music.Mode = music.modes[1];
    let currentNoteSpec: music.NoteSpec = music.createNoteSpec(3, 3); // C natural is default
    let currentChordIndex: number = -1;
    let currentChordIntervals: number[] = [0, 2, 4];
    let currentToggledIndexes: number = 0; // index bitflag

    export function init() {
        try{
            let cookieData = cookies.readCookie();

            if(cookieData.hasCookie) {
                let cookieModes = music.modes.filter((x) => x.index == cookieData.modeIndex);
                if(cookieModes.length > 0) {
                    currentMode = cookieModes[0];
                }
                currentChordIndex = cookieData.chordIndex;
                currentNoteSpec = music.createNoteSpec(cookieData.naturalIndex, cookieData.index);
            }
        }
        catch(e) {
            // ignore the invalid cookie:
            let currentMode: music.Mode = music.modes[1];
            let currentNoteSpec: music.NoteSpec = music.createNoteSpec(3, 3); // C natural is default
            let currentChordIndex: number = -1;
        }

        // lets remember this while we reset everything.
        let tempChordIndex = currentChordIndex;

        events.tonicChange.subscribe(tonicChanged);
        events.modeChange.subscribe(modeChanged);
        events.chordChange.subscribe(chordChanged);
        events.toggle.subscribe(toggle);
        events.chordIntervalChange.subscribe(x => currentChordIntervals = x.chordIntervals);

        events.tonicChange.publish({ noteSpec: currentNoteSpec });
        events.modeChange.publish({ mode: currentMode });
        events.chordChange.publish({ chordIndex: tempChordIndex });
        events.chordIntervalChange.publish( { chordIntervals: currentChordIntervals });
    }

    function tonicChanged(tonicChangedEvent: events.TonicChangedEvent): void {
        currentNoteSpec = tonicChangedEvent.noteSpec;
        currentChordIndex = -1;
        updateScale();
    }

    function modeChanged(modeChangedEvent: events.ModeChangedEvent): void {
        currentMode = modeChangedEvent.mode;
        currentChordIndex = -1;
        updateScale();
    }

    function chordChanged(chordChangedEvent: events.ChordChangeEvent): void {
        if(chordChangedEvent.chordIndex === currentChordIndex) {
            currentChordIndex = -1
        }
        else {
            currentChordIndex = chordChangedEvent.chordIndex;
        }
        currentToggledIndexes = 0;
        updateScale();
    }

    function toggle(toggleEvent: events.ToggleEvent): void {
        currentToggledIndexes = currentToggledIndexes ^ 2**toggleEvent.index;
        updateScale();
    }

    function updateScale(): void {
        let nodes = music.generateScaleShim(
            currentNoteSpec, 
            currentMode, 
            currentChordIndex, 
            currentChordIntervals, 
            currentToggledIndexes);

        // update togges, because a chord may have been generated.
        currentToggledIndexes = nodes
            .filter(x => x.toggle)
            .map(x => x.scaleNote.note.index)
            .reduce((a, b) => a + 2**b, 0);

        events.scaleChange.publish({
            nodes: nodes,
            mode: currentMode
        });
    }
}
