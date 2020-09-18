


namespace state {

    let currentNoteSpec: music.NoteSpec = music.createNoteSpec(3, 3); // C natural is default
    let currentChordIndex: number = -1;
    let currentChordIntervals: number[] = [0, 2, 4];
    let currentToggledIndexes: number = 0; // index bitflag
    let currentScaleFamily: music.ScaleFamily = music.scaleFamily[0];
    let currentMode: music.Mode = currentScaleFamily.modes[1];
    let currentMidiToggledIndexes: number = 0;

    export function init() {
        try{
            let cookieData = cookies.readCookie();

            if(cookieData.hasCookie) {
                let cookieModes = currentScaleFamily.modes.filter((x) => x.index == cookieData.modeIndex);
                if(cookieModes.length > 0) {
                    currentMode = cookieModes[0];
                }
                currentChordIndex = cookieData.chordIndex;
                currentNoteSpec = music.createNoteSpec(cookieData.naturalIndex, cookieData.index);
            }
        }
        catch(e) {
            // ignore the invalid cookie:
            currentMode = currentScaleFamily.modes[1];
            currentChordIndex = -1;
            currentNoteSpec = music.createNoteSpec(3, 3); // C natural is default
        }

        // lets remember this while we reset everything.
        let tempChordIndex = currentChordIndex;

        events.tonicChange.subscribe(tonicChanged);
        events.modeChange.subscribe(modeChanged);
        events.chordChange.subscribe(chordChanged);
        events.toggle.subscribe(toggle);
        events.chordIntervalChange.subscribe(chordIntervalChanged);
        events.scaleFamilyChange.subscribe(scaleFamilyChanged);
        events.midiNote.subscribe(midiNote);

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

    function chordIntervalChanged(chordIntervalChangedEvent: events.ChordIntervalChangeEvent): void {
        currentChordIntervals = chordIntervalChangedEvent.chordIntervals;
        currentToggledIndexes = 0;
        updateScale();
    }

    function scaleFamilyChanged(scaleFamilyChangedEvent: events.ScaleFamilyChangeEvent): void {
        currentScaleFamily = scaleFamilyChangedEvent.scaleFamily;
        currentChordIndex = -1
        updateScale();
    }

    function midiNote(midiNoteEvent: events.MidiNoteEvent): void {
        currentMidiToggledIndexes = midiNoteEvent.toggledIndexes;
        updateScale();
    }

    function updateScale(): void {
        let nodes = music.generateScaleShim(
            currentNoteSpec, 
            currentMode, 
            currentChordIndex, 
            currentChordIntervals, 
            currentToggledIndexes,
            currentMidiToggledIndexes,
            currentScaleFamily);

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
