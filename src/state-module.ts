namespace state {

    export interface State {
        noteSpec: music.NoteSpec;
        chordIndex: number;
        chordIntervals: number[];
        toggledIndexes: number;
        scaleFamily: music.ScaleFamily;
        mode: music.Mode;
        midiToggledIndexes: number;
    }

    // default initial state
    let current: State = {
        noteSpec: music.createNoteSpec(3, 3), // C natural is default
        chordIndex: -1, // no chord
        chordIntervals: [0, 2, 4], // standard triad
        toggledIndexes: 0, // index bitflag
        scaleFamily: music.scaleFamily[0], // diatornic
        mode: music.scaleFamily[0].modes[1], // major
        midiToggledIndexes: 0,
    }

    export function init() {
        try{
            let cookieState = cookies.readCookie2();
            if(cookieState !== null) {
                current = cookieState;
            }
        }
        catch(e) {
            // ignore the invalid cookie:
        }

        // lets remember this while we reset everything.
        let tempChordIndex = current.chordIndex;

        events.scaleFamilyChange.publish({ scaleFamily: current.scaleFamily });
        events.modeChange.publish({ mode: current.mode });

        events.tonicChange.subscribe(tonicChanged);
        events.modeChange.subscribe(modeChanged);
        events.chordChange.subscribe(chordChanged);
        events.toggle.subscribe(toggle);
        events.chordIntervalChange.subscribe(chordIntervalChanged);
        events.scaleFamilyChange.subscribe(scaleFamilyChanged);
        events.midiNote.subscribe(midiNote);

        events.tonicChange.publish({ noteSpec: current.noteSpec });
        events.chordIntervalChange.publish( { chordIntervals: current.chordIntervals });
        events.chordChange.publish({ chordIndex: tempChordIndex });
    }

    function tonicChanged(tonicChangedEvent: events.TonicChangedEvent): void {
        current.noteSpec = tonicChangedEvent.noteSpec;
        current.chordIndex = -1;
        updateScale();
    }

    function modeChanged(modeChangedEvent: events.ModeChangedEvent): void {
        current.mode = modeChangedEvent.mode;
        current.chordIndex = -1;
        updateScale();
    }

    function chordChanged(chordChangedEvent: events.ChordChangeEvent): void {
        if(chordChangedEvent.chordIndex === current.chordIndex) {
            current.chordIndex = -1
        }
        else {
            current.chordIndex = chordChangedEvent.chordIndex;
        }
        current.toggledIndexes = 0;
        updateScale();
    }

    function toggle(toggleEvent: events.ToggleEvent): void {
        current.toggledIndexes = current.toggledIndexes ^ 2**toggleEvent.index;
        updateScale();
    }

    function chordIntervalChanged(chordIntervalChangedEvent: events.ChordIntervalChangeEvent): void {
        current.chordIntervals = chordIntervalChangedEvent.chordIntervals;
        current.toggledIndexes = 0;
        updateScale();
    }

    function scaleFamilyChanged(scaleFamilyChangedEvent: events.ScaleFamilyChangeEvent): void {
        current.scaleFamily = scaleFamilyChangedEvent.scaleFamily;
        current.chordIndex = -1
        updateScale();
    }

    function midiNote(midiNoteEvent: events.MidiNoteEvent): void {
        current.midiToggledIndexes = midiNoteEvent.toggledIndexes;
        updateScale();
    }

    function updateScale(): void {
        let nodes = music.generateScaleShim(
            current.noteSpec, 
            current.mode, 
            current.chordIndex, 
            current.chordIntervals, 
            current.toggledIndexes,
            current.midiToggledIndexes,
            current.scaleFamily);

        // update togges, because a chord may have been generated.
        current.toggledIndexes = nodes
            .filter(x => x.toggle)
            .map(x => x.scaleNote.note.index)
            .reduce((a, b) => a + 2**b, 0);

        events.scaleChange.publish({
            nodes: nodes,
            mode: current.mode
        });

        publishStateChange();
    }

    function publishStateChange(): void {
        events.stateChange.publish({
            state: current
        });
    }
}