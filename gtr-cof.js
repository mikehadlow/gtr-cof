var mod;
(function (mod) {
    class Mod {
        constructor(items) {
            this.size = 0;
            this.start = 0;
            this.items = items;
            this.size = items.length;
        }
        setStart(start) {
            this.start = start % this.size;
        }
        itemAt(index) {
            return this.items[(this.start + index) % this.size];
        }
        toArray() {
            let newArray = [];
            for (let i = 0; i < this.size; i++) {
                newArray.push(this.items[(i + this.start) % this.size]);
            }
            return newArray;
        }
        merge(items) {
            let theseItems = this.toArray();
            return zip(theseItems, items);
        }
        merge3(items2, items3) {
            let theseItems = this.toArray();
            return zip3(theseItems, items2, items3);
        }
    }
    mod.Mod = Mod;
    function zip(a, b) {
        if (a.length != b.length) {
            throw "Cannot merge arrays of different lengths";
        }
        return a.map((x, i) => [x, b[i]]);
    }
    mod.zip = zip;
    function zip3(a, b, c) {
        if (a.length != b.length || a.length != c.length) {
            throw "Cannot merge arrays of different lengths";
        }
        return a.map((x, i) => [x, b[i], c[i]]);
    }
    mod.zip3 = zip3;
    function diff(size, a, b) {
        let ax = a % size;
        let bx = b % size;
        if (ax == bx)
            return 0;
        let d1 = bx - ax;
        let d2 = 0;
        if (d1 > 0) {
            d2 = -((ax + size) - bx);
        }
        else {
            d2 = (bx + size) - ax;
        }
        return Math.abs(d1) > Math.abs(d2) ? d2 : d1;
    }
    mod.diff = diff;
})(mod || (mod = {}));
let modTest = new mod.Mod([0, 1, 2, 3, 4, 5]);
var events;
(function (events) {
    class Bus {
        // name should be the name of the exported variable in 'events' that the bus instance is assigned to.
        constructor(name) {
            this.listeners = [];
            this.name = name;
        }
        subscribe(listener) {
            this.listeners.push(listener);
        }
        // first call should be passed index = -1
        resubscribe(listener, index) {
            if (index === -1) {
                return this.listeners.push(listener) - 1;
            }
            this.listeners[index] = listener;
            return index;
        }
        publish(event) {
            //console.log("Published event: '" + this.name + "'")
            for (let listener of this.listeners) {
                listener(event);
            }
        }
    }
    events.Bus = Bus;
    function genericName(type) {
        return type.constructor.toString();
    }
    events.stateChange = new Bus("stateChange");
    events.scaleChange = new Bus("scaleChange");
    events.tonicChange = new Bus("tonicChange");
    events.modeChange = new Bus("modeChange");
    events.chordChange = new Bus("chordChange");
    events.toggle = new Bus("toggle");
    events.tuningChange = new Bus("tuningChange");
    events.leftHandedChange = new Bus("leftHandedChange");
    events.flipNutChange = new Bus("flipNutChange");
    events.fretboardLabelChange = new Bus("fretboardLabelChange");
    let FretboardLabelType;
    (function (FretboardLabelType) {
        FretboardLabelType[FretboardLabelType["None"] = 0] = "None";
        FretboardLabelType[FretboardLabelType["NoteName"] = 1] = "NoteName";
        FretboardLabelType[FretboardLabelType["Interval"] = 2] = "Interval";
    })(FretboardLabelType = events.FretboardLabelType || (events.FretboardLabelType = {}));
    events.chordIntervalChange = new Bus("chordIntervalChange");
    events.scaleFamilyChange = new Bus("scaleFamilyChange");
    events.midiNote = new Bus("midiNoteEvent");
    events.setCToNoon = new Bus("setCToNoonEvent");
})(events || (events = {}));
var cookies;
(function (cookies) {
    let cookieName = "gtr-cof-state-v4";
    function init() {
        events.stateChange.subscribe(bakeCookie2);
    }
    cookies.init = init;
    function bakeCookie2(stateChange) {
        let json = JSON.stringify(stateChange.state);
        document.cookie = cookieName + "=" + json + ";";
    }
    function readCookie2() {
        let result = document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
        if (result != null) {
            let state = JSON.parse(result[1]);
            return state;
        }
        return null;
    }
    cookies.readCookie2 = readCookie2;
})(cookies || (cookies = {}));
var music;
(function (music) {
    let IntervalType;
    (function (IntervalType) {
        IntervalType[IntervalType["Nat"] = 0] = "Nat";
        IntervalType[IntervalType["Maj"] = 1] = "Maj";
        IntervalType[IntervalType["Min"] = 2] = "Min";
        IntervalType[IntervalType["Aug"] = 3] = "Aug";
        IntervalType[IntervalType["Dim"] = 4] = "Dim";
    })(IntervalType = music.IntervalType || (music.IntervalType = {}));
    ;
    music.intervalName = {};
    music.intervalName[IntervalType.Nat] = "";
    music.intervalName[IntervalType.Maj] = "M";
    music.intervalName[IntervalType.Min] = "m";
    music.intervalName[IntervalType.Aug] = "A";
    music.intervalName[IntervalType.Dim] = "d";
    ;
    music.getIntervalName = interval => music.intervalName[interval.type] + (interval.ord + 1);
    music.intervals = new mod.Mod([
        [{ ord: 0, type: IntervalType.Nat, colour: 0xf44b42 }, { ord: 1, type: IntervalType.Dim, colour: 0xf44b42 }],
        [{ ord: 1, type: IntervalType.Min, colour: 0xf48942 }, { ord: 0, type: IntervalType.Aug, colour: 0xf48942 }],
        [{ ord: 1, type: IntervalType.Maj, colour: 0xf4bf42 }, { ord: 2, type: IntervalType.Dim, colour: 0xf4bf42 }],
        [{ ord: 2, type: IntervalType.Min, colour: 0xf4ee42 }, { ord: 1, type: IntervalType.Aug, colour: 0xf4ee42 }],
        [{ ord: 2, type: IntervalType.Maj, colour: 0x8cf442 }, { ord: 3, type: IntervalType.Dim, colour: 0x8cf442 }],
        [{ ord: 3, type: IntervalType.Nat, colour: 0x42f4bf }, { ord: 2, type: IntervalType.Aug, colour: 0x42f4bf }],
        [{ ord: 4, type: IntervalType.Dim, colour: 0x42d4f4 }, { ord: 3, type: IntervalType.Aug, colour: 0x42d4f4 }],
        [{ ord: 4, type: IntervalType.Nat, colour: 0x429ef4 }, { ord: 5, type: IntervalType.Dim, colour: 0x429ef4 }],
        [{ ord: 5, type: IntervalType.Min, colour: 0xe542f4 }, { ord: 4, type: IntervalType.Aug, colour: 0xe542f4 }],
        [{ ord: 5, type: IntervalType.Maj, colour: 0xf44289 }, { ord: 6, type: IntervalType.Dim, colour: 0xf44289 }],
        [{ ord: 6, type: IntervalType.Min, colour: 0xff8282 }, { ord: 5, type: IntervalType.Aug, colour: 0xff8282 }],
        [{ ord: 6, type: IntervalType.Maj, colour: 0xff82fc }, { ord: 0, type: IntervalType.Dim, colour: 0xff82fc }],
    ]);
    ;
    function notesInScaleFamily(scaleFamily) {
        return scaleFamily.intervals.items.filter(x => x).length;
    }
    music.notesInScaleFamily = notesInScaleFamily;
    let diatonicModes = [
        { name: 'Lydian', index: 5 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 7 },
        { name: 'Dorian', index: 2 },
        { name: 'N Minor / Aeolian', index: 9 },
        { name: 'Phrygian', index: 4 },
        { name: 'Locrian', index: 11 },
    ];
    let harmonicMinorModes = [
        { name: 'Lydian ♯2', index: 5 },
        { name: 'Ionian ♯5', index: 0 },
        { name: 'Superlocrian', index: 8 },
        { name: 'Dorian ♯4', index: 2 },
        { name: 'Harmonic Minor', index: 9 },
        { name: 'Phrygian Dominant', index: 4 },
        { name: 'Locrian ♯6', index: 11 },
    ];
    let jazzMinorModes = [
        { name: 'Lydian Dominant', index: 5 },
        { name: 'Jazz Minor', index: 0 },
        { name: 'Mixolydian ♭6', index: 7 },
        { name: 'Assyrian', index: 2 },
        { name: 'Locrian ♮2', index: 9 },
        { name: 'Lydian Augmented', index: 3 },
        { name: 'Altered scale', index: 11 },
    ];
    music.scaleFamily = [
        { index: 0, name: "diatonic", intervals: new mod.Mod([true, false, true, false, true, true, false, true, false, true, false, true]), modes: diatonicModes, defaultModeIndex: 0 },
        { index: 1, name: "harmonic minor", intervals: new mod.Mod([true, false, true, false, true, true, false, false, true, true, false, true]), modes: harmonicMinorModes, defaultModeIndex: 9 },
        { index: 2, name: "jazz minor", intervals: new mod.Mod([true, false, true, true, false, true, false, true, false, true, false, true]), modes: jazzMinorModes, defaultModeIndex: 0 },
        { index: 3, name: "whole tone", intervals: new mod.Mod([true, false, true, false, true, false, true, false, true, false, true, false]), modes: [{ name: 'Whole Tone', index: 0 }], defaultModeIndex: 0 },
        { index: 4, name: "diminished", intervals: new mod.Mod([true, false, true, true, false, true, true, false, true, true, false, true]), modes: [{ name: 'Diminished', index: 0 }], defaultModeIndex: 0 }
    ];
    // root diatonic scale is major
    music.diatonic = new mod.Mod([true, false, true, false, true, true, false, true, false, true, false, true]);
    music.indexList = new mod.Mod([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    function createNoteSpec(naturalIndex, index) {
        let natural = music.naturals.filter(x => x.index === naturalIndex)[0];
        if (!music.naturals.some(x => x.index === naturalIndex)) {
            throw "naturalIndex is not valid: " + naturalIndex;
        }
        let offset = mod.diff(12, naturalIndex, index);
        if (Math.abs(offset) > 2) {
            throw "offset between naturalIndex: " + naturalIndex + ", and index: " + index + ", is invalid: " + offset;
        }
        let noteLabel = noteLabels.filter(x => x.offset === offset)[0];
        return {
            natural: natural,
            index: index,
            offset: offset,
            label: natural.label + noteLabel.label
        };
    }
    music.createNoteSpec = createNoteSpec;
    // fixed index:
    // 0  1  2  3  4  5  6  7  8  9  10 11 
    // A     B  C     D     E  F     G
    music.naturals = [
        { id: 0, index: 0, label: "A" },
        { id: 1, index: 2, label: "B" },
        { id: 2, index: 3, label: "C" },
        { id: 3, index: 5, label: "D" },
        { id: 4, index: 7, label: "E" },
        { id: 5, index: 8, label: "F" },
        { id: 6, index: 10, label: "G" }
    ];
    let naturalList = new mod.Mod(music.naturals);
    music.noteNames = [
        { name: "A", index: 0 },
        { name: "A♯", index: 1 },
        { name: "A♭", index: 11 },
        { name: "B", index: 2 },
        { name: "B♯", index: 3 },
        { name: "B♭", index: 1 },
        { name: "C", index: 3 },
        { name: "C♯", index: 4 },
        { name: "C♭", index: 2 },
        { name: "D", index: 5 },
        { name: "D♯", index: 6 },
        { name: "D♭", index: 4 },
        { name: "E", index: 7 },
        { name: "E♯", index: 8 },
        { name: "E♭", index: 6 },
        { name: "F", index: 8 },
        { name: "F♯", index: 9 },
        { name: "F♭", index: 7 },
        { name: "G", index: 10 },
        { name: "G♯", index: 11 },
        { name: "G♭", index: 9 },
    ];
    let noteLabels = [
        { offset: 0, label: '' },
        { offset: 1, label: '♯' },
        { offset: 2, label: 'x' },
        { offset: -1, label: '♭' },
        { offset: -2, label: '♭♭' },
    ];
    ;
    function createScaleSpec(index, naturalIndex, modeIndex) {
        return {
            noteSpec: createNoteSpec(naturalIndex, index),
            mode: music.scaleFamily[0].modes[modeIndex]
        };
    }
    music.createScaleSpec = createScaleSpec;
    let ChordType;
    (function (ChordType) {
        ChordType[ChordType["Major"] = 0] = "Major";
        ChordType[ChordType["Minor"] = 1] = "Minor";
        ChordType[ChordType["Diminished"] = 2] = "Diminished";
    })(ChordType = music.ChordType || (music.ChordType = {}));
    ;
    ;
    music.nullNode = {
        scaleNote: {
            note: {
                natural: {
                    id: 0,
                    index: 0,
                    label: ""
                },
                index: 0,
                offset: 0,
                label: ""
            },
            interval: {
                ord: 0,
                type: 0,
                colour: 0
            },
            intervalName: "",
            isScaleNote: false,
            noteNumber: 0
        },
        chordInterval: {
            ord: 0,
            type: 0,
            colour: 0
        },
        intervalName: "",
        isChordRoot: false,
        toggle: false,
        midiToggle: false
    };
    function generateScaleShim(noteSpec, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamily) {
        let scale = generateScale(noteSpec, mode, scaleFamily);
        mod.zip(scale, generateChordNumbers(scale, mode, scaleFamily.intervals)).forEach(x => x[0].chord = x[1]);
        if (chordIndex === -1) {
            return generateNodes(scale, mode, scale[0].note.index, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamily.intervals);
        }
        else {
            return generateNodes(scale, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamily.intervals, true);
        }
    }
    music.generateScaleShim = generateScaleShim;
    function generateScale(noteSpec, mode, scaleFamily) {
        music.indexList.setStart(noteSpec.index);
        naturalList.setStart(noteSpec.natural.id);
        scaleFamily.intervals.setStart(mode.index);
        music.intervals.setStart(0);
        let workingSet = music.indexList.merge3(buildScaleCounter(scaleFamily.intervals.toArray()), music.intervals.toArray());
        let isSevenNoteScale = notesInScaleFamily(scaleFamily) == 7;
        return workingSet.map(item => {
            let index = item[0];
            let isScaleNote = item[1][0];
            let noteNumber;
            let natural;
            let activeInterval;
            if (isScaleNote && isSevenNoteScale) {
                noteNumber = item[1][1];
                natural = naturalList.itemAt(noteNumber);
                activeInterval = item[2].filter(x => x.ord == noteNumber)[0];
                if (activeInterval == null) {
                    activeInterval = item[2][0];
                }
            }
            else {
                activeInterval = item[2][0];
                noteNumber = isScaleNote ? item[1][1] : activeInterval.ord;
                natural = naturalList.itemAt(activeInterval.ord);
            }
            // console.log("index: " + index + ", isScaleNote: " + isScaleNote 
            //     + ", noteNumber: " + noteNumber + ", natural.index: " + natural.index
            //     + ", natural.label: " + natural.label
            //     + ", interval: " + getIntervalName(activeInterval))
            return {
                note: createNoteSpec(natural.index, index),
                interval: activeInterval,
                intervalName: music.getIntervalName(activeInterval),
                isScaleNote: isScaleNote,
                noteNumber: noteNumber
            };
        });
    }
    music.generateScale = generateScale;
    // generateNodes creates an 'outer' sliding interval ring that can change with
    // chord selections.
    function generateNodes(scaleNotes, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamily, chordSelected = false) {
        let chordIndexOffset = ((chordIndex + 12) - scaleNotes[0].note.index) % 12;
        music.intervals.setStart(12 - chordIndexOffset);
        scaleFamily.setStart(mode.index);
        let startAt = scaleNotes.filter(x => x.note.index === chordIndex)[0].noteNumber;
        let workingSet = music.intervals.merge3(scaleNotes, buildScaleCounter(scaleFamily.toArray(), startAt));
        return workingSet.map(item => {
            let chordIntervalCandidates = item[0];
            let scaleNote = item[1];
            let scaleCounter = item[2];
            let activeInterval = scaleNote.isScaleNote
                ? chordIntervalCandidates.filter(x => x.ord === scaleCounter[1])[0]
                : chordIntervalCandidates[0];
            if (activeInterval == null) {
                activeInterval = chordIntervalCandidates[0];
            }
            // if(chordSelected) {
            //     console.log("chordIndex: " + chordIndex + 
            //         ", scaleNote.isScaleNote: " + scaleNote.isScaleNote +
            //         ", scaleNote.notenumber: " + scaleNote.noteNumber +
            //         ", scaleCounter: " + scaleCounter +
            //         ", activeInterval: " + getIntervalName(activeInterval) + 
            //         ", toggle: " + calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals));
            // }
            return {
                scaleNote: scaleNote,
                chordInterval: activeInterval,
                intervalName: music.getIntervalName(activeInterval),
                isChordRoot: chordSelected && activeInterval.ord === 0 && activeInterval.type === 0,
                toggle: calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals),
                midiToggle: (toggledMidiNotes & (Math.pow(2, scaleNote.note.index))) != 0
            };
        });
    }
    music.generateNodes = generateNodes;
    function buildScaleCounter(diatonic, startAt = 0) {
        let noteCount = diatonic.filter(x => x).length;
        let i = (noteCount - startAt) % noteCount;
        return diatonic.map(isNote => {
            if (isNote) {
                let value = [true, i];
                i = (i + 1) % noteCount;
                return value;
            }
            return [false, 0];
        });
    }
    let romanNumeral = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];
    function generateChordNumbers(scaleNotes, mode, scaleFamily) {
        return scaleNotes.map((scaleNote, i) => {
            if (scaleNote.isScaleNote) {
                let roman = romanNumeral[scaleNote.noteNumber];
                let nodes = generateNodes(scaleNotes, mode, scaleNote.note.index, [], 0, 0, scaleFamily);
                let diminished = "";
                let type = ChordType.Minor;
                // does it have a diminished 5th?
                if (nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 4 && x.chordInterval.type === IntervalType.Dim)) {
                    diminished = "°";
                    type = ChordType.Diminished;
                }
                // does it have a major 3rd?
                if (nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 2 && x.chordInterval.type === IntervalType.Maj)) {
                    roman = roman.toLocaleUpperCase();
                    type = ChordType.Major;
                }
                return {
                    romanNumeral: roman + diminished,
                    type: type
                };
            }
            return {
                romanNumeral: "",
                type: ChordType.Major
            };
        });
    }
    music.generateChordNumbers = generateChordNumbers;
    function calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals) {
        if (toggledIndexes === 0) {
            return chordSelected && scaleNote.isScaleNote && chordIntervals.some(x => activeInterval.ord === x);
        }
        return (toggledIndexes & (Math.pow(2, scaleNote.note.index))) != 0;
    }
    music.calculateToggle = calculateToggle;
    function fifths() {
        let indexes = [];
        let current = 0;
        for (let i = 0; i < 12; i++) {
            indexes.push(current);
            current = (current + 7) % 12;
        }
        return indexes;
    }
    music.fifths = fifths;
    function chromatic() {
        let indexes = [];
        for (let i = 0; i < 12; i++) {
            indexes.push(i);
        }
        return indexes;
    }
    music.chromatic = chromatic;
})(music || (music = {}));
var state;
(function (state) {
    // default initial state
    state.defaultState = {
        index: 3,
        naturalIndex: 3,
        chordIndex: -1,
        chordIntervals: [0, 2, 4],
        toggledIndexes: 0,
        scaleFamilyIndex: 0,
        modeIndex: 0,
        midiToggledIndexes: 0,
        isLeftHanded: false,
        isNutFlipped: false,
        fretboardLabelType: events.FretboardLabelType.NoteName,
        circleIsCNoon: true,
        tuningIndex: 0,
    };
    let current = {
        index: state.defaultState.index,
        naturalIndex: state.defaultState.naturalIndex,
        chordIndex: state.defaultState.chordIndex,
        chordIntervals: state.defaultState.chordIntervals,
        toggledIndexes: state.defaultState.toggledIndexes,
        scaleFamilyIndex: state.defaultState.scaleFamilyIndex,
        modeIndex: state.defaultState.modeIndex,
        midiToggledIndexes: state.defaultState.midiToggledIndexes,
        isLeftHanded: state.defaultState.isLeftHanded,
        isNutFlipped: state.defaultState.isNutFlipped,
        fretboardLabelType: state.defaultState.fretboardLabelType,
        circleIsCNoon: state.defaultState.circleIsCNoon,
        tuningIndex: state.defaultState.tuningIndex,
    };
    function init() {
        try {
            let cookieState = cookies.readCookie2();
            if (cookieState !== null) {
                current = cookieState;
            }
        }
        catch (e) {
            // ignore the invalid cookie:
        }
        // update current state based on querystring.
        current = permalink.getState(current);
        // lets remember this while we reset everything.
        let tempChordIndex = current.chordIndex;
        let tempToggledIndexes = current.toggledIndexes;
        let scaleFamily = music.scaleFamily.find(x => x.index == current.scaleFamilyIndex);
        if (!scaleFamily) {
            throw "scaleFamily is " + scaleFamily + ", current.scaleFamilyIndex = " + current.scaleFamilyIndex;
        }
        let mode = scaleFamily.modes.find(x => x.index == current.modeIndex);
        if (!mode) {
            throw "mode is " + mode + "current.modeIndex" + current.modeIndex;
        }
        // publish scale and mode
        events.scaleFamilyChange.publish({ scaleFamily: scaleFamily });
        events.modeChange.publish({ mode: mode });
        events.chordIntervalChange.publish({ chordIntervals: current.chordIntervals });
        // subscriptions
        events.tonicChange.subscribe(tonicChanged);
        events.modeChange.subscribe(modeChanged);
        events.chordChange.subscribe(chordChanged);
        events.toggle.subscribe(toggle);
        events.chordIntervalChange.subscribe(chordIntervalChanged);
        events.scaleFamilyChange.subscribe(scaleFamilyChanged);
        events.midiNote.subscribe(midiNote);
        // publish tonic and chord
        events.tonicChange.publish({ noteSpec: music.createNoteSpec(current.naturalIndex, current.index) });
        events.chordChange.publish({ chordIndex: tempChordIndex });
        // restore toggles
        current.toggledIndexes = tempToggledIndexes;
        updateScale();
        // publish settings
        events.leftHandedChange.publish({ isLeftHanded: current.isLeftHanded });
        events.flipNutChange.publish({ isNutFlipped: current.isNutFlipped });
        events.fretboardLabelChange.publish({ labelType: current.fretboardLabelType });
        events.setCToNoon.publish({ isC: current.circleIsCNoon });
        events.tuningChange.publish({ index: current.tuningIndex });
        // subscribe to settings changes
        events.leftHandedChange.subscribe(leftHandedChange);
        events.flipNutChange.subscribe(flipNutChange);
        events.fretboardLabelChange.subscribe(fretboardLabelChange);
        events.setCToNoon.subscribe(setCToNoon);
        events.tuningChange.subscribe(tuningChange);
    }
    state.init = init;
    function tonicChanged(tonicChangedEvent) {
        current.index = tonicChangedEvent.noteSpec.index;
        current.naturalIndex = tonicChangedEvent.noteSpec.natural.index;
        current.chordIndex = -1;
        updateScale();
    }
    function modeChanged(modeChangedEvent) {
        current.modeIndex = modeChangedEvent.mode.index;
        current.chordIndex = -1;
        updateScale();
    }
    function chordChanged(chordChangedEvent) {
        if (chordChangedEvent.chordIndex === current.chordIndex) {
            current.chordIndex = -1;
        }
        else {
            current.chordIndex = chordChangedEvent.chordIndex;
        }
        current.toggledIndexes = 0;
        updateScale();
    }
    function toggle(toggleEvent) {
        current.toggledIndexes = current.toggledIndexes ^ Math.pow(2, toggleEvent.index);
        updateScale();
    }
    function chordIntervalChanged(chordIntervalChangedEvent) {
        current.chordIntervals = chordIntervalChangedEvent.chordIntervals;
        current.toggledIndexes = 0;
        updateScale();
    }
    function scaleFamilyChanged(scaleFamilyChangedEvent) {
        current.scaleFamilyIndex = scaleFamilyChangedEvent.scaleFamily.index;
        current.modeIndex = scaleFamilyChangedEvent.scaleFamily.defaultModeIndex;
        current.chordIndex = -1;
        updateScale();
    }
    function midiNote(midiNoteEvent) {
        current.midiToggledIndexes = midiNoteEvent.toggledIndexes;
        updateScale();
    }
    // setttings event handlers
    function leftHandedChange(leftHandedChangeEvent) {
        current.isLeftHanded = leftHandedChangeEvent.isLeftHanded;
        publishStateChange();
    }
    function flipNutChange(flipNutChangeEvent) {
        current.isNutFlipped = flipNutChangeEvent.isNutFlipped;
        publishStateChange();
    }
    function fretboardLabelChange(fretboardLabelChangeEvent) {
        current.fretboardLabelType = fretboardLabelChangeEvent.labelType;
        publishStateChange();
    }
    function setCToNoon(setCToNoonEvent) {
        current.circleIsCNoon = setCToNoonEvent.isC;
        publishStateChange();
    }
    function tuningChange(tuningChangedEvent) {
        current.tuningIndex = tuningChangedEvent.index;
        publishStateChange();
    }
    function updateScale() {
        let scaleFamily = music.scaleFamily.find(x => x.index == current.scaleFamilyIndex);
        if (!scaleFamily) {
            throw "scaleFamily is " + scaleFamily + ", current.scaleFamilyIndex = " + current.scaleFamilyIndex;
        }
        let mode = scaleFamily.modes.find(x => x.index == current.modeIndex);
        if (!mode) {
            throw "mode is " + mode + "current.modeIndex" + current.modeIndex;
        }
        let noteSpec = music.createNoteSpec(current.naturalIndex, current.index);
        let nodes = music.generateScaleShim(noteSpec, mode, current.chordIndex, current.chordIntervals, current.toggledIndexes, current.midiToggledIndexes, scaleFamily);
        // update togges, because a chord may have been generated.
        current.toggledIndexes = nodes
            .filter(x => x.toggle)
            .map(x => x.scaleNote.note.index)
            .reduce((a, b) => a + Math.pow(2, b), 0);
        events.scaleChange.publish({
            nodes: nodes,
            mode: mode
        });
        publishStateChange();
    }
    function publishStateChange() {
        events.stateChange.publish({
            state: current
        });
    }
})(state || (state = {}));
var cof;
(function (cof_1) {
    class NoteCircle {
        constructor(svg, noteIndexes, label) {
            this.indexer = (x) => x.index + "";
            let state = this.draw(svg, rotate(noteIndexes, 3), label);
            let setCToNoonSubscriptionIndex = -1;
            events.scaleChange.subscribe(scaleChnaged => {
                this.update(scaleChnaged, state);
                setCToNoonSubscriptionIndex = events.setCToNoon.resubscribe(setCToNoonEvent => {
                    let offset = setCToNoonEvent.isC ? 3 : 0;
                    svg.selectAll("*").remove();
                    state = this.draw(svg, rotate(noteIndexes, offset), label);
                    this.update(scaleChnaged, state);
                }, setCToNoonSubscriptionIndex);
            });
        }
        draw(svg, noteIndexes, label) {
            let pad = 50;
            let chordRadius = 240;
            let noteRadius = 200;
            let degreeRadius = 135;
            let innerRadius = 90;
            let cof = svg
                .append("g")
                .attr("transform", "translate(" + (noteRadius + pad) + ", " + (noteRadius + pad) + ")");
            cof.append("text")
                .attr("text-anchor", "middle")
                .attr("x", 0)
                .attr("y", 0)
                .text(label);
            let segments = generateSegments(noteIndexes);
            let noteArc = d3.svg.arc()
                .innerRadius(degreeRadius)
                .outerRadius(noteRadius);
            let degreeArc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(degreeRadius);
            let chordArc = d3.svg.arc()
                .innerRadius(noteRadius)
                .outerRadius(chordRadius);
            let noteSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", noteArc)
                .attr("class", "note-segment")
                .on("click", handleNoteClick);
            let noteText = cof.append("g").selectAll("text")
                .data(segments)
                .enter()
                .append("text")
                .attr("x", function (x) { return noteArc.centroid(x)[0]; })
                .attr("y", function (x) { return noteArc.centroid(x)[1] + 11; })
                .text("")
                .attr("class", "note-segment-text");
            let intervalSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", degreeArc)
                .attr("class", "interval-segment")
                .on("click", handleIntervalClick);
            let intervalNotes = cof.append("g").selectAll("circle")
                .data(segments, this.indexer)
                .enter()
                .append("circle")
                .style("pointer-events", "none")
                .attr("r", 25)
                .attr("cx", function (x) { return degreeArc.centroid(x)[0]; })
                .attr("cy", function (x) { return degreeArc.centroid(x)[1]; })
                .attr("class", "interval-note");
            let intervalText = cof.append("g").selectAll("text")
                .data(segments, this.indexer)
                .enter()
                .append("text")
                .attr("x", function (x) { return degreeArc.centroid(x)[0]; })
                .attr("y", function (x) { return degreeArc.centroid(x)[1] + 8; })
                .text("")
                .attr("class", "degree-segment-text");
            let chordSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", chordArc)
                .attr("class", "chord-segment")
                .on("click", handleChordClick);
            let chordNotes = cof.append("g").selectAll("circle")
                .data(segments, this.indexer)
                .enter()
                .append("circle")
                .style("pointer-events", "none")
                .attr("r", 28)
                .attr("cx", function (x) { return chordArc.centroid(x)[0]; })
                .attr("cy", function (x) { return chordArc.centroid(x)[1]; })
                .attr("class", "chord-segment-note");
            let chordText = cof.append("g").selectAll("text")
                .data(segments, this.indexer)
                .enter()
                .append("text")
                .attr("x", function (x) { return chordArc.centroid(x)[0]; })
                .attr("y", function (x) { return chordArc.centroid(x)[1] + 8; })
                .text("")
                .attr("class", "degree-segment-text");
            return {
                noteSegments: noteSegments,
                noteText: noteText,
                intervalSegments: intervalSegments,
                intervalNotes: intervalNotes,
                intervalText: intervalText,
                chordSegments: chordSegments,
                chordNotes: chordNotes,
                chordText: chordText
            };
        }
        update(scaleChnaged, state) {
            let data = scaleChnaged.nodes.map(node => ({
                startAngle: 0,
                endAngle: 0,
                scaleNote: {},
                index: node.scaleNote.note.index,
                node: node
            }));
            state.noteSegments
                .data(data, this.indexer)
                .attr("class", (d, i) => "note-segment " +
                (d.node.scaleNote.isScaleNote ? ((i === 0) ? "note-segment-tonic" : "note-segment-scale") : ""));
            state.noteText
                .data(data, this.indexer)
                .text(d => d.node.scaleNote.note.label);
            state.intervalSegments
                .data(data, this.indexer)
                .attr("class", d => d.node.scaleNote.isScaleNote ? "degree-segment-selected" : "interval-segment");
            state.intervalText
                .data(data, this.indexer)
                .text(d => d.node.intervalName);
            state.intervalNotes
                .data(data, this.indexer)
                .attr("class", d => d.node.toggle ? "interval-note-selected" : "interval-note")
                .style("fill", d => d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16) : "none")
                .style("stroke-width", d => d.node.midiToggle ? "20px" : "2px")
                .style("stroke", d => d.node.midiToggle ? "OrangeRed" : d.node.toggle ? "black" : "none");
            state.chordText
                .data(data, this.indexer)
                .text(d => d.node.scaleNote.chord.romanNumeral + "");
            state.chordSegments
                .data(data, this.indexer)
                .attr("class", d => d.node.scaleNote.isScaleNote ? getChordSegmentClass(d.node.scaleNote.chord) : "chord-segment");
            state.chordNotes
                .data(data, this.indexer)
                .attr("class", d => d.node.isChordRoot ? getChordSegmentClass(d.node.scaleNote.chord) : "chord-segment-note");
        }
    }
    cof_1.NoteCircle = NoteCircle;
    function getChordSegmentClass(chord) {
        if (chord.type === music.ChordType.Diminished)
            return "chord-segment-dim";
        if (chord.type === music.ChordType.Minor)
            return "chord-segment-minor";
        if (chord.type === music.ChordType.Major)
            return "chord-segment-major";
        throw "Unexpected ChordType";
    }
    function generateSegments(fifths) {
        let count = fifths.length;
        let items = [];
        let angle = (Math.PI * (2 / count));
        for (let i = 0; i < count; i++) {
            let itemAngle = (angle * i) - (angle / 2);
            items.push({
                startAngle: itemAngle,
                endAngle: itemAngle + angle,
                index: fifths[i],
                node: music.nullNode
            });
        }
        return items;
    }
    function handleNoteClick(segment, i) {
        events.tonicChange.publish({
            noteSpec: replaceDoubleSharpsAndFlatsWithEquivalentNote(segment.node.scaleNote.note)
        });
    }
    function replaceDoubleSharpsAndFlatsWithEquivalentNote(noteSpec) {
        if (Math.abs(noteSpec.offset) > 1) {
            let naturalId = noteSpec.natural.id;
            let newNaturalId = (noteSpec.offset > 0)
                ? naturalId + 1 % 7
                : naturalId == 0 ? 6 : naturalId - 1;
            let newNatural = music.naturals.filter(x => x.id === newNaturalId)[0];
            return music.createNoteSpec(newNatural.index, noteSpec.index);
        }
        return noteSpec;
    }
    function handleChordClick(segment, i) {
        events.chordChange.publish({ chordIndex: segment.node.scaleNote.note.index });
    }
    function handleIntervalClick(segment, i) {
        events.toggle.publish({ index: segment.node.scaleNote.note.index });
    }
    function rotate(array, offset) {
        let newArray = [];
        for (let item of array) {
            newArray.push((item + offset) % 12);
        }
        return newArray;
    }
})(cof || (cof = {}));
var tonics;
(function (tonics_1) {
    let buttons;
    ;
    function bg(natural) {
        let flatIndex = natural.index == 0 ? 11 : natural.index - 1;
        let sharpIndex = (natural.index + 1) % 12;
        return [
            { noteSpec: music.createNoteSpec(natural.index, flatIndex) },
            { noteSpec: music.createNoteSpec(natural.index, natural.index) },
            { noteSpec: music.createNoteSpec(natural.index, sharpIndex) }
        ];
    }
    function init() {
        let pad = 5;
        let buttonHeight = 25;
        let svg = d3.select("#modes");
        let tonics = svg.append("g");
        let gs = tonics.selectAll("g")
            .data(music.naturals)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; })
            .selectAll("g")
            .data(d => bg(d), indexer)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(" + (i * 55) + ", 0)"; });
        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("strokeWidth", 2)
            .attr("width", 40)
            .attr("height", 25)
            .attr("class", d => isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button")
            .on("click", d => events.tonicChange.publish({ noteSpec: d.noteSpec }));
        gs
            .append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text(function (x) { return x.noteSpec.label; })
            .attr("class", "tonic-text");
        events.tonicChange.subscribe(listener);
    }
    tonics_1.init = init;
    function listener(tonicChanged) {
        let ds = [{
                noteSpec: tonicChanged.noteSpec
            }];
        buttons
            .data(ds, indexer)
            .attr("class", "tonic-button tonic-button-selected")
            .exit()
            .attr("class", d => isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button");
    }
    function indexer(d) {
        return d.noteSpec.label;
    }
    function isSameNoteAsNatural(noteSpec) {
        return music.naturals.some(x => x.index === noteSpec.index && x.index != noteSpec.natural.index);
    }
})(tonics || (tonics = {}));
var chordInterval;
(function (chordInterval) {
    let buttons;
    let toggle = 0;
    function init() {
        let radius = 10;
        let pad = 2;
        let svg = d3.select("#modes");
        let intervals = svg
            .append("g")
            .attr("transform", "translate(0, 240)");
        let gs = intervals.selectAll("g")
            .data([0, 1, 2, 3, 4, 5, 6], function (i) { return i.toString(); })
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(" + (i * (radius * 2 + pad) + pad) + ", 0)"; });
        buttons = gs
            .append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("r", radius)
            .attr("strokeWidth", 2)
            .attr("class", "mode-button")
            .on("click", onClick);
        gs
            .append("text")
            .attr("x", radius)
            .attr("y", radius + 5)
            .attr("text-anchor", "middle")
            .text(function (x) { return x + 1; });
        events.chordIntervalChange.subscribe(update);
    }
    chordInterval.init = init;
    function onClick(x) {
        let updatedToggle = toggle ^ (Math.pow(2, x));
        let chordIntervals = [0, 1, 2, 3, 4, 5, 6].filter(x => (Math.pow(2, x) & updatedToggle) === Math.pow(2, x));
        events.chordIntervalChange.publish({ chordIntervals: chordIntervals });
    }
    function update(event) {
        toggle = 0;
        event.chordIntervals.forEach(x => toggle = toggle + Math.pow(2, x));
        buttons
            .data(event.chordIntervals, function (m) { return m.toString(); })
            .attr("class", "mode-button mode-button-selected")
            .exit()
            .attr("class", "mode-button");
    }
    chordInterval.update = update;
})(chordInterval || (chordInterval = {}));
var modes;
(function (modes_1) {
    let buttons;
    let modes;
    function init(scaleFamily) {
        let svg = d3.select("#modes");
        modes = svg
            .append("g")
            .attr("transform", "translate(0, 280)");
        drawButtons(scaleFamily);
        events.modeChange.subscribe(update);
        events.scaleFamilyChange.subscribe(handleScaleFamilyChangedEvent);
    }
    modes_1.init = init;
    function drawButtons(scaleFamily) {
        let pad = 5;
        let buttonHeight = 25;
        modes.selectAll("g").remove();
        let gs = modes.selectAll("g").data(scaleFamily.modes, index);
        gs
            .exit()
            .remove();
        gs
            .enter()
            .append("g")
            .attr("transform", (d, i) => "translate(0, " + (i * (buttonHeight + pad) + pad) + ")");
        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("strokeWidth", 2)
            .attr("width", 150)
            .attr("height", 25)
            .attr("class", "mode-button")
            .on("click", (d) => events.modeChange.publish({ mode: d }));
        gs
            .append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text((x) => x.name)
            .attr("class", "mode-text");
        let defaultMode = scaleFamily.modes.find(x => x.index == scaleFamily.defaultModeIndex);
        highlightActiveMode(defaultMode);
    }
    function update(modeChange) {
        highlightActiveMode(modeChange.mode);
    }
    function highlightActiveMode(mode) {
        let modes = [mode];
        buttons
            .data(modes, index)
            .attr("class", "mode-button mode-button-selected")
            .exit()
            .attr("class", "mode-button");
    }
    function handleScaleFamilyChangedEvent(scaleFamilyChangedEvent) {
        drawButtons(scaleFamilyChangedEvent.scaleFamily);
    }
    function index(mode) {
        return mode.index.toString();
    }
})(modes || (modes = {}));
var gtr;
(function (gtr_1) {
    let currentTuning;
    let currentState;
    let notes;
    let noteLabels;
    let numberOfFrets = 16;
    let fretboardElement;
    let isLeftHanded = false;
    let isNutFlipped = false;
    let fretboardLabelType = events.FretboardLabelType.NoteName;
    let stringGap = 40;
    let fretGap = 70;
    let fretWidth = 5;
    let noteRadius = 15;
    let pad = 20;
    function indexer(stringNote) {
        return stringNote.index + "_" + stringNote.octave;
    }
    function init() {
        events.tuningChange.subscribe(handleTuningChange);
        events.scaleChange.subscribe(update);
        events.leftHandedChange.subscribe(handleLeftHandedChanged);
        events.flipNutChange.subscribe(handleFlipNutChanged);
        events.fretboardLabelChange.subscribe(handleLabelChange);
    }
    gtr_1.init = init;
    function handleTuningChange(tuningChangedEvent) {
        let newTuning = tuning.tunings.find(x => x.index == tuningChangedEvent.index);
        updateFretboard(newTuning);
    }
    function handleLeftHandedChanged(lhEvent) {
        isLeftHanded = lhEvent.isLeftHanded;
        if (currentTuning != null) {
            updateFretboard(currentTuning);
        }
    }
    function setHandedness() {
        if (isLeftHanded) {
            fretboardElement.transform.baseVal.getItem(0).setTranslate(1200, 0);
            fretboardElement.transform.baseVal.getItem(1).setScale(-1, 1);
            noteLabels
                .attr("transform", (d, i) => "translate(0, 0) scale(-1, 1)")
                .attr("x", (d, i) => -(i * fretGap + pad + 30));
        }
        else {
            fretboardElement.transform.baseVal.getItem(0).setTranslate(0, 0);
            fretboardElement.transform.baseVal.getItem(1).setScale(1, 1);
            noteLabels
                .attr("transform", (d, i) => "translate(0, 0) scale(1, 1)")
                .attr("x", (d, i) => (i * fretGap + pad + 30));
        }
    }
    function handleFlipNutChanged(fnEvent) {
        isNutFlipped = fnEvent.isNutFlipped;
        if (currentTuning != null) {
            updateFretboard(currentTuning);
        }
    }
    function handleLabelChange(lcEvent) {
        fretboardLabelType = lcEvent.labelType;
        setLabels();
    }
    function setLabels() {
        function setNoteName(note) {
            return note.node.scaleNote.isScaleNote || note.node.toggle ? note.node.scaleNote.note.label : "";
        }
        function setInterval(note) {
            return note.node.scaleNote.isScaleNote || note.node.toggle ? note.node.intervalName : "";
        }
        switch (fretboardLabelType) {
            case events.FretboardLabelType.None:
                noteLabels.text("");
                break;
            case events.FretboardLabelType.NoteName:
                noteLabels.text(setNoteName);
                break;
            case events.FretboardLabelType.Interval:
                noteLabels.text(setInterval);
                break;
        }
    }
    function updateFretboard(tuningInfo) {
        currentTuning = tuningInfo;
        let fretData = getFretData(numberOfFrets);
        let dots = tuningInfo.dots;
        d3.selectAll("#gtr > *").remove();
        let svg = d3.select("#gtr");
        svg.append("text")
            .attr("class", "mode-text")
            .attr("x", 30)
            .attr("y", 11)
            .text(tuningInfo.tuning + " "
            + tuningInfo.description
            + (isLeftHanded ? ", Left Handed" : "")
            + (isNutFlipped ? ", Nut Flipped" : ""));
        let gtr = svg.append("g").attr("transform", "translate(0, 0) scale(1, 1)");
        fretboardElement = gtr.node();
        // frets
        gtr.append("g").selectAll("rect")
            .data(fretData)
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return (i + 1) * fretGap + pad - fretWidth; })
            .attr("y", pad + stringGap / 2 - fretWidth)
            .attr("width", fretWidth)
            .attr("height", stringGap * (tuningInfo.notes.length - 1) + (fretWidth * 2))
            .attr("fill", function (d, i) { return i === 0 ? "black" : "none"; })
            .attr("stroke", "grey")
            .attr("stroke-width", 1);
        // dots
        gtr.append("g").selectAll("circle")
            .data(dots)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr("cx", function (d) { return d[0] * fretGap + pad + 30 + (d[1] * 10); })
            .attr("cy", function (d) { return (tuningInfo.notes.length) * stringGap + pad + 15; })
            .attr("fill", "lightgrey")
            .attr("stroke", "none");
        let strings = gtr.append("g").selectAll("g")
            .data(isNutFlipped ? tuningInfo.notes.slice() : tuningInfo.notes.slice().reverse(), (_, i) => i + "")
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + ((i * stringGap) + pad) + ")"; });
        // string lines
        strings
            .append("line")
            .attr("x1", pad + fretGap)
            .attr("y1", stringGap / 2)
            .attr("x2", pad + (fretGap * numberOfFrets) + 20)
            .attr("y2", stringGap / 2)
            .attr("stroke", "black")
            .attr("stroke-width", 2);
        notes = strings
            .selectAll("circle")
            .data(function (d) { return allNotesFrom(d, numberOfFrets); }, indexer)
            .enter()
            .append("circle")
            .attr("r", noteRadius)
            .attr("cy", stringGap / 2)
            .attr("cx", function (d, i) { return i * fretGap + pad + 30; })
            .on("click", d => events.toggle.publish({ index: d.index }));
        noteLabels = strings
            .selectAll("text")
            .data(function (d) { return allNotesFrom(d, numberOfFrets); }, indexer)
            .enter()
            .append("text")
            .attr("transform", "translate(0, 0) scale(1, 1)")
            .attr("text-anchor", "middle")
            .attr("x", (d, i) => i * fretGap + pad + 30)
            .attr("y", (stringGap / 2) + 5)
            .text("");
        setHandedness();
        if (currentState != null) {
            update(currentState);
        }
    }
    function update(stateChange) {
        let hasToggledNotes = stateChange.nodes.some(x => x.toggle);
        let fill = function (d) {
            return d.node.toggle
                ? "white"
                : d.node.scaleNote.isScaleNote
                    ? d.node.scaleNote.noteNumber === 0
                        ? hasToggledNotes ? "white" : "yellow"
                        : "white"
                    : "rgba(255, 255, 255, 0.01)";
        };
        let stroke = function (d) {
            return d.node.midiToggle ? "OrangeRed"
                : d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16)
                    : hasToggledNotes ? "none"
                        : d.node.scaleNote.isScaleNote ? "grey" : "none";
        };
        let strokeWidth = function (d) {
            return d.node.midiToggle ? 10
                : d.node.toggle ? 4
                    : d.node.scaleNote.isScaleNote ? 2
                        : 0;
        };
        let data = repeatTo(stateChange.nodes, numberOfFrets);
        notes
            .data(data, indexer)
            .attr("fill", fill)
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth);
        noteLabels.data(data, indexer);
        setLabels();
        currentState = stateChange;
    }
    function allNotesFrom(index, numberOfNotes) {
        let items = [];
        for (let i = 0; i < numberOfNotes; i++) {
            items.push({
                octave: Math.floor((i + 1) / 12),
                index: (i + index) % 12,
                node: music.nullNode
            });
        }
        return items;
    }
    function getFretData(numberOfFrets) {
        let data = [];
        for (let i = 0; i < numberOfFrets; i++) {
            data.push(i);
        }
        return data;
    }
    function repeatTo(nodes, count) {
        let stringNotes = [];
        for (let i = 0; i <= Math.floor(count / 12); i++) {
            stringNotes = stringNotes.concat(nodes.map(x => ({
                octave: i,
                index: x.scaleNote.note.index,
                node: x
            })));
        }
        return stringNotes;
    }
})(gtr || (gtr = {}));
var tuning;
(function (tuning_1) {
    let guitarDots = [
        [3, 0],
        [5, 0],
        [7, 0],
        [9, 0],
        [12, -1],
        [12, 1],
        [15, 0]
    ];
    // Viola/violin for beginners.
    let violaDots = [
        [2, 0],
        [4, 0],
        [5, 0],
        [7, 0],
        [12, -1],
        [12, 1]
    ];
    let tuningInfos = [
        { tuning: "EADGBE", dots: guitarDots, description: "Guitar Standard" },
        { tuning: "EADGCF", dots: guitarDots, description: "All Fourths" },
        { tuning: "CGDAEB", dots: guitarDots, description: "All Fifths" },
        { tuning: "BFBFBF", dots: guitarDots, description: "Augmented Fourths" },
        { tuning: "DADGBE", dots: guitarDots, description: "Guitar Drop D" },
        { tuning: "DADGAD", dots: guitarDots, description: "Celtic" },
        { tuning: "CGDAEG", dots: guitarDots, description: "Guitar Fripp NST" },
        { tuning: "BEADGBE", dots: guitarDots, description: "Guitar 7 string" },
        { tuning: "DABEAB", dots: guitarDots, description: "Guitar Portuguese" },
        { tuning: "DGDGBD", dots: guitarDots, description: "Guitar Open G" },
        { tuning: "EADGDG", dots: guitarDots, description: "Guitar Convert" },
        { tuning: "E♭A♭D♭G♭B♭E♭", dots: guitarDots, description: "Guitar E♭ (Hendrix)" },
        { tuning: "EADG", dots: guitarDots, description: "Bass Standard" },
        { tuning: "DADG", dots: guitarDots, description: "Bass Drop D" },
        { tuning: "EADGC", dots: guitarDots, description: "Bass 5 Strings Standard High" },
        { tuning: "BEADG", dots: guitarDots, description: "Bass 5 Strings Standard Low" },
        { tuning: "BEADGC", dots: guitarDots, description: "Bass 6 Strings Standard" },
        { tuning: "BEADGCF", dots: guitarDots, description: "Bass 7 Strings Standard" },
        { tuning: "DGBD", dots: guitarDots, description: "Banjo" },
        { tuning: "DGBD", dots: guitarDots, description: "Cavaquinho" },
        { tuning: "GCEA", dots: guitarDots, description: "Ukulele C" },
        { tuning: "CGDA", dots: violaDots, description: "Cello" },
        { tuning: "GDAE", dots: violaDots, description: "Violin" },
        { tuning: "CGDA", dots: violaDots, description: "Viola" },
    ];
    tuning_1.tunings = [];
    function parseTuning(tuning) {
        let tokens = [];
        let result = [];
        let tokenIndex = 0;
        let lastWasChar = false;
        for (let i = 0; i < tuning.length; i++) {
            let noteChar = tuning.charAt(i);
            if ("ABCDEFG".indexOf(noteChar) >= 0) {
                tokens[tokenIndex] = noteChar;
                tokenIndex++;
                lastWasChar = true;
            }
            else if ("♯♭".indexOf(noteChar) >= 0 && lastWasChar) {
                tokens[tokenIndex - 1] = tokens[tokenIndex - 1] + noteChar;
                lastWasChar = false;
            }
            else {
                throw "Invalid tuning char";
            }
        }
        for (let token of tokens) {
            let noteName = music.noteNames.filter(x => x.name === token);
            if (noteName.length != 1) {
                throw "Invalid token";
            }
            result.push(noteName[0].index);
        }
        return result;
    }
    tuning_1.parseTuning = parseTuning;
    function init() {
        let index = 0;
        for (let info of tuningInfos) {
            let tuning = {
                index: index,
                tuning: info.tuning,
                dots: info.dots,
                description: info.description,
                notes: parseTuning(info.tuning)
            };
            tuning_1.tunings.push(tuning);
            index++;
        }
        d3.select("#tuning-dropdown")
            .selectAll("div")
            .data(tuning_1.tunings)
            .enter()
            .append("div")
            .attr("class", "dropdown-content-item")
            .on("click", x => raiseTuningChangedEvent(x))
            .text(x => x.tuning + "   " + x.description);
        raiseTuningChangedEvent(tuning_1.tunings[0]);
    }
    tuning_1.init = init;
    function raiseTuningChangedEvent(tuning) {
        events.tuningChange.publish({
            index: tuning.index
        });
    }
})(tuning || (tuning = {}));
var settings;
(function (settings) {
    function init() {
        events.leftHandedChange.subscribe(e => {
            let checkbox = document.getElementById("left-handed-checkbox");
            checkbox.checked = e.isLeftHanded;
        });
        events.flipNutChange.subscribe(e => {
            let checkbox = document.getElementById("flip-nut-checkbox");
            checkbox.checked = e.isNutFlipped;
        });
        events.setCToNoon.subscribe(e => {
            let checkbox = document.getElementById("set-c-to-noon-checkbox");
            checkbox.checked = e.isC;
        });
        events.fretboardLabelChange.subscribe(e => {
            let selected = "fb-note-text" + String(e.labelType);
            let radio = document.getElementById(selected);
            radio.checked = true;
        });
    }
    settings.init = init;
    function onLeftHandedClick(e) {
        events.leftHandedChange.publish({ isLeftHanded: e.checked });
    }
    settings.onLeftHandedClick = onLeftHandedClick;
    function onFlipNut(e) {
        events.flipNutChange.publish({ isNutFlipped: e.checked });
    }
    settings.onFlipNut = onFlipNut;
    function onSetCToNoon(e) {
        events.setCToNoon.publish({ isC: e.checked });
    }
    settings.onSetCToNoon = onSetCToNoon;
    function onFbNoteTextClick(e) {
        events.fretboardLabelChange.publish({ labelType: parseInt(e.value) });
    }
    settings.onFbNoteTextClick = onFbNoteTextClick;
})(settings || (settings = {}));
var scaleFamily;
(function (scaleFamily_1) {
    function init() {
        d3.select("#scale-dropdown")
            .selectAll("div")
            .data(music.scaleFamily)
            .enter()
            .append("div")
            .attr("class", "dropdown-content-item")
            .on("click", x => raiseScaleFamilyChangedEvent(x))
            .text(x => x.name);
    }
    scaleFamily_1.init = init;
    function raiseScaleFamilyChangedEvent(scaleFamily) {
        events.scaleFamilyChange.publish({
            scaleFamily: scaleFamily
        });
    }
})(scaleFamily || (scaleFamily = {}));
///<reference path="../node_modules/@types/webmidi/index.d.ts" />
var midiControl;
(function (midiControl) {
    // bit flag for on/off MIDI notes
    let currentToggledIndexes = 0;
    function init() {
        let nav = window.navigator;
        if (!nav.requestMIDIAccess) {
            console.log("Browser does not support MIDI.");
            return;
        }
        nav.requestMIDIAccess()
            .then((midiAccess) => {
            console.log("MIDI Ready!");
            for (let entry of midiAccess.inputs) {
                entry[1].onmidimessage = onMidiMessage;
            }
        })
            .catch((error) => {
            console.log("Error accessing MIDI devices: " + error);
        });
    }
    midiControl.init = init;
    function onMidiMessage(midiEvent) {
        let data = midiEvent.data;
        if (data.length === 3) {
            let status = data[0];
            // command is the four most significant bits of the status byte.
            let command = status >>> 4;
            //let octave = Math.trunc(data[1] / 12);
            // MIDI starts with C0 = 0, but guitar dashboard index 0 = A, so add three to the midi note number.
            let index = (data[1] + 3) % 12;
            if (command === 0x9) {
                // MIDI note on.
                currentToggledIndexes = currentToggledIndexes | Math.pow(2, index);
            }
            if (command === 0x8) {
                // MIDI note off.
                currentToggledIndexes = currentToggledIndexes & ~(Math.pow(2, index));
            }
            events.midiNote.publish({ toggledIndexes: currentToggledIndexes });
        }
    }
})(midiControl || (midiControl = {}));
var permalink;
(function (permalink_1) {
    let currentState = null;
    function init() {
        events.stateChange.subscribe(x => currentState = x.state);
    }
    permalink_1.init = init;
    function populatePermalinkText() {
        let permalink = generatePermalink();
        let inputbox = document.getElementById("permalink-text");
        inputbox.value = permalink;
        inputbox.focus;
        inputbox.select;
        inputbox.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
    permalink_1.populatePermalinkText = populatePermalinkText;
    // create querystring from state
    function generatePermalink() {
        if (currentState === null) {
            throw "No stateChange event published before querystring requested";
        }
        let params = new URLSearchParams();
        // only copy state that's different from default
        Object.keys(currentState).forEach(key => {
            if (currentState[key] !== state.defaultState[key]) {
                params.append(key, currentState[key]);
            }
        });
        return `${location.protocol}//${location.host}${location.pathname}?${params.toString()}`;
    }
    permalink_1.generatePermalink = generatePermalink;
    // update state from querystring
    function getState(existingState) {
        let queryString = location.search;
        let params = new URLSearchParams(queryString);
        Object.keys(existingState).forEach(x => {
            let value = params.get(x);
            if (value == null)
                return;
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
    permalink_1.getState = getState;
    // test function
    function getCurrentState() {
        let newState = getState(currentState);
    }
    permalink_1.getCurrentState = getCurrentState;
})(permalink || (permalink = {}));
///<reference path="../node_modules/@types/d3/index.d.ts" />
tonics.init();
modes.init(music.scaleFamily[0]);
chordInterval.init();
let chromatic = new cof.NoteCircle(d3.select("#chromatic"), music.chromatic(), "Chromatic");
let circleOfFifths = new cof.NoteCircle(d3.select("#cof"), music.fifths(), "Circle of Fifths");
gtr.init();
tuning.init();
scaleFamily.init();
settings.init();
permalink.init();
state.init();
cookies.init();
//# sourceMappingURL=gtr-cof.js.map