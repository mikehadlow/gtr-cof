


namespace state {

    let currentMode: music.Mode = music.modes[1];
    let currentNoteSpec: music.NoteSpec = music.createNoteSpec(3, 3); // C natural is default
    let currentIndex: number = 0;
    let currentChordIndex: number = -1

    export function init() {
        let cookieData = cookies.readCookie();

        if(cookieData.hasCookie) {
            currentIndex = cookieData.index;
            currentMode = music.modes.filter((x) => x.index == cookieData.modeIndex)[0];
            currentChordIndex = cookieData.chordIndex;
        }

        // lets remember this while we reset everything.
        let tempChordIndex = currentChordIndex;

        events.tonicChange.subscribe(tonicChanged);
        events.modeChange.subscribe(modeChanged);
        events.chordChange.subscribe(chordChanged);

        events.tonicChange.publish({ noteSpec: currentNoteSpec });
        events.modeChange.publish({ mode: currentMode });
        events.chordChange.publish({ chordIndex: tempChordIndex });
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
        if(chordChangedEvent.chordIndex == currentChordIndex) {
            currentChordIndex = -1
        }
        else {
            currentChordIndex = chordChangedEvent.chordIndex;
        }
        updateScale();
    }

    function updateScale(): void {
        let nodes = music.generateScaleShim(currentNoteSpec, currentMode);
        events.scaleChange.publish({
            nodes: nodes
        });
    }
}
