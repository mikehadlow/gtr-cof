"use strict";
var mod;
(function (mod) {
    var Mod = (function () {
        function Mod(items) {
            this.size = 0;
            this.start = 0;
            this.items = items;
            this.size = items.length;
        }
        Mod.prototype.setStart = function (start) {
            this.start = start % this.size;
        };
        Mod.prototype.itemAt = function (index) {
            return this.items[(this.start + index) % this.size];
        };
        Mod.prototype.toArray = function () {
            var newArray = [];
            for (var i = 0; i < this.size; i++) {
                newArray.push(this.items[(i + this.start) % this.size]);
            }
            return newArray;
        };
        Mod.prototype.merge = function (items) {
            var theseItems = this.toArray();
            return zip(theseItems, items);
        };
        Mod.prototype.merge3 = function (items2, items3) {
            var theseItems = this.toArray();
            return zip3(theseItems, items2, items3);
        };
        return Mod;
    }());
    mod.Mod = Mod;
    function zip(a, b) {
        if (a.length != b.length) {
            throw "Cannot merge arrays of different lengths";
        }
        return a.map(function (x, i) { return [x, b[i]]; });
    }
    mod.zip = zip;
    function zip3(a, b, c) {
        if (a.length != b.length || a.length != c.length) {
            throw "Cannot merge arrays of different lengths";
        }
        return a.map(function (x, i) { return [x, b[i], c[i]]; });
    }
    mod.zip3 = zip3;
    function diff(size, a, b) {
        var ax = a % size;
        var bx = b % size;
        if (ax == bx)
            return 0;
        var d1 = bx - ax;
        var d2 = 0;
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
var modTest = new mod.Mod([0, 1, 2, 3, 4, 5]);
var events;
(function (events) {
    var Bus = (function () {
        function Bus() {
            this.listeners = [];
        }
        Bus.prototype.subscribe = function (listener) {
            this.listeners.push(listener);
        };
        Bus.prototype.publish = function (event) {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(event);
            }
        };
        return Bus;
    }());
    events.Bus = Bus;
    events.scaleChange = new Bus();
    events.tonicChange = new Bus();
    events.modeChange = new Bus();
    events.chordChange = new Bus();
    events.toggle = new Bus();
    events.tuningChange = new Bus();
    events.leftHandedChange = new Bus();
    events.flipNutChange = new Bus();
    events.fretboardLabelChange = new Bus();
    var FretboardLabelType;
    (function (FretboardLabelType) {
        FretboardLabelType[FretboardLabelType["None"] = 0] = "None";
        FretboardLabelType[FretboardLabelType["NoteName"] = 1] = "NoteName";
        FretboardLabelType[FretboardLabelType["Interval"] = 2] = "Interval";
    })(FretboardLabelType = events.FretboardLabelType || (events.FretboardLabelType = {}));
    events.chordIntervalChange = new Bus();
})(events || (events = {}));
var cookies;
(function (cookies) {
    function init() {
        events.scaleChange.subscribe(bakeCookie);
    }
    cookies.init = init;
    function bakeCookie(scaleChange) {
        var cookieExpiryDays = 30;
        var expiryDate = new Date(Date.now() + (cookieExpiryDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + expiryDate.toUTCString();
        var tonicNode = scaleChange.nodes[0];
        document.cookie = "gtr-cof-state="
            + tonicNode.scaleNote.note.index + "|"
            + tonicNode.scaleNote.note.natural.index + "|"
            + scaleChange.mode.index + "|"
            + (scaleChange.nodes.some(function (x) { return x.isChordRoot; })
                ? scaleChange.nodes.filter(function (x) { return x.isChordRoot; })[0].scaleNote.note.index
                : -1) + ""
            + ";" + expires;
    }
    function readCookie() {
        var result = document.cookie.match(new RegExp("gtr-cof-state" + '=([^;]+)'));
        if (result != null) {
            var items = result[1].split("|");
            if (items.length == 4) {
                return {
                    hasCookie: true,
                    index: Number(items[0]),
                    naturalIndex: Number(items[1]),
                    modeIndex: Number(items[2]),
                    chordIndex: Number(items[3])
                };
            }
        }
        return {
            hasCookie: false,
            index: 0,
            naturalIndex: 0,
            modeIndex: 0,
            chordIndex: -1
        };
    }
    cookies.readCookie = readCookie;
})(cookies || (cookies = {}));
var music;
(function (music) {
    var IntervalType;
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
    music.getIntervalName = function (interval) { return music.intervalName[interval.type] + (interval.ord + 1); };
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
    // root diatonic scale is major
    music.diatonic = new mod.Mod([true, false, true, false, true, true, false, true, false, true, false, true]);
    music.indexList = new mod.Mod([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    function createNoteSpec(naturalIndex, index) {
        var natural = music.naturals.filter(function (x) { return x.index === naturalIndex; })[0];
        if (!music.naturals.some(function (x) { return x.index === naturalIndex; })) {
            throw "naturalIndex is not valid: " + naturalIndex;
        }
        var offset = mod.diff(12, naturalIndex, index);
        if (Math.abs(offset) > 2) {
            throw "offset between naturalIndex: " + naturalIndex + ", and index: " + index + ", is invalid: " + offset;
        }
        var noteLabel = noteLabels.filter(function (x) { return x.offset === offset; })[0];
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
    var naturalList = new mod.Mod(music.naturals);
    var noteLabels = [
        { offset: 0, label: '' },
        { offset: 1, label: '♯' },
        { offset: 2, label: 'x' },
        { offset: -1, label: '♭' },
        { offset: -2, label: '♭♭' },
    ];
    ;
    music.modes = [
        { name: 'Lydian', index: 5 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 7 },
        { name: 'Dorian', index: 2 },
        { name: 'N Minor / Aeolian', index: 9 },
        { name: 'Phrygian', index: 4 },
        { name: 'Locrian', index: 11 },
    ];
    function createScaleSpec(index, naturalIndex, modeIndex) {
        return {
            noteSpec: createNoteSpec(naturalIndex, index),
            mode: music.modes[modeIndex]
        };
    }
    music.createScaleSpec = createScaleSpec;
    var ChordType;
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
        toggle: false
    };
    function generateScaleShim(noteSpec, mode, chordIndex, chordIntervals, toggledIndexes) {
        var scale = generateScale(noteSpec, mode);
        mod.zip(scale, generateChordNumbers(scale, mode)).forEach(function (x) { return x[0].chord = x[1]; });
        if (chordIndex === -1) {
            return generateNodes(scale, mode, scale[0].note.index, chordIntervals, toggledIndexes);
        }
        else {
            return generateNodes(scale, mode, chordIndex, chordIntervals, toggledIndexes, true);
        }
    }
    music.generateScaleShim = generateScaleShim;
    function generateScale(noteSpec, mode) {
        music.indexList.setStart(noteSpec.index);
        naturalList.setStart(noteSpec.natural.id);
        music.diatonic.setStart(mode.index);
        music.intervals.setStart(0);
        var workingSet = music.indexList.merge3(buildScaleCounter(music.diatonic.toArray()), music.intervals.toArray());
        return workingSet.map(function (item) {
            var index = item[0];
            var isScaleNote = item[1][0];
            var noteNumber;
            var natural;
            var activeInterval;
            if (isScaleNote) {
                noteNumber = item[1][1];
                natural = naturalList.itemAt(noteNumber);
                activeInterval = item[2].filter(function (x) { return x.ord == noteNumber; })[0];
            }
            else {
                activeInterval = item[2][0];
                noteNumber = activeInterval.ord;
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
    function generateNodes(scaleNotes, mode, chordIndex, chordIntervals, toggledIndexes, chordSelected) {
        if (chordSelected === void 0) { chordSelected = false; }
        var chordIndexOffset = ((chordIndex + 12) - scaleNotes[0].note.index) % 12;
        music.intervals.setStart(12 - chordIndexOffset);
        music.diatonic.setStart(mode.index);
        var startAt = scaleNotes.filter(function (x) { return x.note.index === chordIndex; })[0].noteNumber;
        var workingSet = music.intervals.merge3(scaleNotes, buildScaleCounter(music.diatonic.toArray(), startAt));
        return workingSet.map(function (item) {
            var chordIntervalCandidates = item[0];
            var scaleNote = item[1];
            var scaleCounter = item[2];
            var activeInterval = scaleNote.isScaleNote
                ? chordIntervalCandidates.filter(function (x) { return x.ord === scaleCounter[1]; })[0]
                : chordIntervalCandidates[0];
            // console.log("index: " + scaleNote.index + ", isScaleNote: " + scaleNote.isScaleNote +
            //     ", note: " + scaleNote.label + ", interval: " + scaleNote.intervalName + " -> " + 
            //     getIntervalName(activeInterval) +
            //     ", scaleCount: " + scaleNote.noteNumber + " -> " + scaleCounter[1]);
            return {
                scaleNote: scaleNote,
                chordInterval: activeInterval,
                intervalName: music.getIntervalName(activeInterval),
                isChordRoot: chordSelected && activeInterval.ord === 0 && activeInterval.type === 0,
                toggle: calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals)
            };
        });
    }
    music.generateNodes = generateNodes;
    function buildScaleCounter(diatonic, startAt) {
        if (startAt === void 0) { startAt = 0; }
        var noteCount = diatonic.filter(function (x) { return x; }).length;
        var i = (noteCount - startAt) % noteCount;
        return diatonic.map(function (isNote) {
            if (isNote) {
                var value = [true, i];
                i = (i + 1) % noteCount;
                return value;
            }
            return [false, 0];
        });
    }
    var romanNumeral = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
    function generateChordNumbers(scaleNotes, mode) {
        return scaleNotes.map(function (scaleNote, i) {
            if (scaleNote.isScaleNote) {
                var roman = romanNumeral[scaleNote.noteNumber];
                var nodes = generateNodes(scaleNotes, mode, scaleNote.note.index, [], 0);
                var diminished = "";
                var seventh = "";
                var type = ChordType.Minor;
                // does it have a diminished 5th?
                if (nodes.some(function (x) { return x.scaleNote.isScaleNote && x.chordInterval.ord === 4 && x.chordInterval.type === IntervalType.Dim; })) {
                    diminished = "°";
                    type = ChordType.Diminished;
                }
                // does it have a major 3rd?
                if (nodes.some(function (x) { return x.scaleNote.isScaleNote && x.chordInterval.ord === 2 && x.chordInterval.type === IntervalType.Maj; })) {
                    roman = roman.toLocaleUpperCase();
                    type = ChordType.Major;
                }
                // does it have a natural 7th?
                if (nodes.some(function (x) { return x.scaleNote.isScaleNote && x.chordInterval.ord === 6 && x.chordInterval.type === IntervalType.Min; })) {
                    seventh = "7";
                }
                // does it have a major 7th?
                if (nodes.some(function (x) { return x.scaleNote.isScaleNote && x.chordInterval.ord === 6 && x.chordInterval.type === IntervalType.Maj; })) {
                    seventh = "^7";
                }
                return {
                    romanNumeral: roman + diminished + seventh,
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
            return chordSelected && scaleNote.isScaleNote && chordIntervals.some(function (x) { return activeInterval.ord === x; });
        }
        return (toggledIndexes & (Math.pow(2, scaleNote.note.index))) != 0;
    }
    music.calculateToggle = calculateToggle;
    function fifths() {
        var indexes = [];
        var current = 0;
        for (var i = 0; i < 12; i++) {
            indexes.push(current);
            current = (current + 7) % 12;
        }
        return indexes;
    }
    music.fifths = fifths;
    function chromatic() {
        var indexes = [];
        for (var i = 0; i < 12; i++) {
            indexes.push(i);
        }
        return indexes;
    }
    music.chromatic = chromatic;
})(music || (music = {}));
var state;
(function (state) {
    var currentMode = music.modes[1];
    var currentNoteSpec = music.createNoteSpec(3, 3); // C natural is default
    var currentChordIndex = -1;
    var currentChordIntervals = [0, 2, 4];
    var currentToggledIndexes = 0; // index bitflag
    function init() {
        try {
            var cookieData_1 = cookies.readCookie();
            if (cookieData_1.hasCookie) {
                var cookieModes = music.modes.filter(function (x) { return x.index == cookieData_1.modeIndex; });
                if (cookieModes.length > 0) {
                    currentMode = cookieModes[0];
                }
                currentChordIndex = cookieData_1.chordIndex;
                currentNoteSpec = music.createNoteSpec(cookieData_1.naturalIndex, cookieData_1.index);
            }
        }
        catch (e) {
            // ignore the invalid cookie:
            var currentMode_1 = music.modes[1];
            var currentNoteSpec_1 = music.createNoteSpec(3, 3); // C natural is default
            var currentChordIndex_1 = -1;
        }
        // lets remember this while we reset everything.
        var tempChordIndex = currentChordIndex;
        events.tonicChange.subscribe(tonicChanged);
        events.modeChange.subscribe(modeChanged);
        events.chordChange.subscribe(chordChanged);
        events.toggle.subscribe(toggle);
        events.chordIntervalChange.subscribe(function (x) { return currentChordIntervals = x.chordIntervals; });
        events.tonicChange.publish({ noteSpec: currentNoteSpec });
        events.modeChange.publish({ mode: currentMode });
        events.chordChange.publish({ chordIndex: tempChordIndex });
        events.chordIntervalChange.publish({ chordIntervals: currentChordIntervals });
    }
    state.init = init;
    function tonicChanged(tonicChangedEvent) {
        currentNoteSpec = tonicChangedEvent.noteSpec;
        currentChordIndex = -1;
        updateScale();
    }
    function modeChanged(modeChangedEvent) {
        currentMode = modeChangedEvent.mode;
        currentChordIndex = -1;
        updateScale();
    }
    function chordChanged(chordChangedEvent) {
        if (chordChangedEvent.chordIndex === currentChordIndex) {
            currentChordIndex = -1;
        }
        else {
            currentChordIndex = chordChangedEvent.chordIndex;
        }
        currentToggledIndexes = 0;
        updateScale();
    }
    function toggle(toggleEvent) {
        currentToggledIndexes = currentToggledIndexes ^ Math.pow(2, toggleEvent.index);
        updateScale();
    }
    function updateScale() {
        var nodes = music.generateScaleShim(currentNoteSpec, currentMode, currentChordIndex, currentChordIntervals, currentToggledIndexes);
        // update togges, because a chord may have been generated.
        currentToggledIndexes = nodes
            .filter(function (x) { return x.toggle; })
            .map(function (x) { return x.scaleNote.note.index; })
            .reduce(function (a, b) { return a + Math.pow(2, b); }, 0);
        events.scaleChange.publish({
            nodes: nodes,
            mode: currentMode
        });
    }
})(state || (state = {}));
var cof;
(function (cof_1) {
    var NoteCircle = (function () {
        function NoteCircle(svg, noteIndexes, label) {
            var _this = this;
            this.indexer = function (x) { return x.index + ""; };
            var pad = 50;
            var chordRadius = 240;
            var noteRadius = 200;
            var degreeRadius = 135;
            var innerRadius = 90;
            var cof = svg
                .append("g")
                .attr("transform", "translate(" + (noteRadius + pad) + ", " + (noteRadius + pad) + ")");
            cof.append("text")
                .attr("text-anchor", "middle")
                .attr("x", 0)
                .attr("y", 0)
                .text(label);
            var segments = generateSegments(noteIndexes);
            var noteArc = d3.svg.arc()
                .innerRadius(degreeRadius)
                .outerRadius(noteRadius);
            var degreeArc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(degreeRadius);
            var chordArc = d3.svg.arc()
                .innerRadius(noteRadius)
                .outerRadius(chordRadius);
            this.noteSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", noteArc)
                .attr("class", "note-segment")
                .on("click", handleNoteClick);
            this.noteText = cof.append("g").selectAll("text")
                .data(segments)
                .enter()
                .append("text")
                .attr("x", function (x) { return noteArc.centroid(x)[0]; })
                .attr("y", function (x) { return noteArc.centroid(x)[1] + 11; })
                .text("")
                .attr("class", "note-segment-text");
            this.intervalSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", degreeArc)
                .attr("class", "interval-segment")
                .on("click", handleIntervalClick);
            this.intervalNotes = cof.append("g").selectAll("circle")
                .data(segments, this.indexer)
                .enter()
                .append("circle")
                .style("pointer-events", "none")
                .attr("r", 25)
                .attr("cx", function (x) { return degreeArc.centroid(x)[0]; })
                .attr("cy", function (x) { return degreeArc.centroid(x)[1]; })
                .attr("class", "interval-note");
            this.intervalText = cof.append("g").selectAll("text")
                .data(segments, this.indexer)
                .enter()
                .append("text")
                .attr("x", function (x) { return degreeArc.centroid(x)[0]; })
                .attr("y", function (x) { return degreeArc.centroid(x)[1] + 8; })
                .text("")
                .attr("class", "degree-segment-text");
            this.chordSegments = cof.append("g").selectAll("path")
                .data(segments, this.indexer)
                .enter()
                .append("path")
                .attr("d", chordArc)
                .attr("class", "chord-segment")
                .on("click", handleChordClick);
            this.chordNotes = cof.append("g").selectAll("circle")
                .data(segments, this.indexer)
                .enter()
                .append("circle")
                .style("pointer-events", "none")
                .attr("r", 28)
                .attr("cx", function (x) { return chordArc.centroid(x)[0]; })
                .attr("cy", function (x) { return chordArc.centroid(x)[1]; })
                .attr("class", "chord-segment-note");
            this.chordText = cof.append("g").selectAll("text")
                .data(segments, this.indexer)
                .enter()
                .append("text")
                .attr("x", function (x) { return chordArc.centroid(x)[0]; })
                .attr("y", function (x) { return chordArc.centroid(x)[1] + 8; })
                .text("")
                .attr("class", "degree-segment-text");
            // let instance = this;
            // events.scaleChange.subscribe(function (stateChange: events.ScaleChangedEvent) {
            //     instance.update(stateChange);
            // });
            events.scaleChange.subscribe(function (scaleChnaged) { return _this.update(scaleChnaged); });
        }
        NoteCircle.prototype.update = function (scaleChnaged) {
            var data = scaleChnaged.nodes.map(function (node) { return ({
                startAngle: 0,
                endAngle: 0,
                scaleNote: {},
                index: node.scaleNote.note.index,
                node: node
            }); });
            this.noteSegments
                .data(data, this.indexer)
                .attr("class", function (d, i) { return "note-segment " +
                (d.node.scaleNote.isScaleNote ? ((i === 0) ? "note-segment-tonic" : "note-segment-scale") : ""); });
            this.noteText
                .data(data, this.indexer)
                .text(function (d) { return d.node.scaleNote.note.label; });
            this.intervalSegments
                .data(data, this.indexer)
                .attr("class", function (d) { return d.node.scaleNote.isScaleNote ? "degree-segment-selected" : "interval-segment"; });
            this.intervalText
                .data(data, this.indexer)
                .text(function (d) { return d.node.intervalName; });
            this.intervalNotes
                .data(data, this.indexer)
                .attr("class", function (d) { return d.node.toggle ? "interval-note-selected" : "interval-note"; })
                .style("fill", function (d) { return d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16) : "none"; });
            this.chordText
                .data(data, this.indexer)
                .text(function (d) { return d.node.scaleNote.chord.romanNumeral + ""; });
            this.chordSegments
                .data(data, this.indexer)
                .attr("class", function (d) { return d.node.scaleNote.isScaleNote ? getChordSegmentClass(d.node.scaleNote.chord) : "chord-segment"; });
            this.chordNotes
                .data(data, this.indexer)
                .attr("class", function (d) { return d.node.isChordRoot ? getChordSegmentClass(d.node.scaleNote.chord) : "chord-segment-note"; });
        };
        return NoteCircle;
    }());
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
        var count = fifths.length;
        var items = [];
        var angle = (Math.PI * (2 / count));
        for (var i = 0; i < count; i++) {
            var itemAngle = (angle * i) - (angle / 2);
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
            var naturalId = noteSpec.natural.id;
            var newNaturalId_1 = (noteSpec.offset > 0)
                ? naturalId + 1 % 7
                : naturalId == 0 ? 6 : naturalId - 1;
            var newNatural = music.naturals.filter(function (x) { return x.id === newNaturalId_1; })[0];
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
})(cof || (cof = {}));
var tonics;
(function (tonics_1) {
    var buttons;
    ;
    function bg(natural) {
        var flatIndex = natural.index == 0 ? 11 : natural.index - 1;
        var sharpIndex = (natural.index + 1) % 12;
        return [
            { noteSpec: music.createNoteSpec(natural.index, flatIndex) },
            { noteSpec: music.createNoteSpec(natural.index, natural.index) },
            { noteSpec: music.createNoteSpec(natural.index, sharpIndex) }
        ];
    }
    function init() {
        var pad = 5;
        var buttonHeight = 25;
        var svg = d3.select("#modes");
        var tonics = svg.append("g");
        var gs = tonics.selectAll("g")
            .data(music.naturals)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; })
            .selectAll("g")
            .data(function (d) { return bg(d); }, indexer)
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
            .attr("class", function (d) { return isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button"; })
            .on("click", function (d) { return events.tonicChange.publish({ noteSpec: d.noteSpec }); });
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
        var ds = [{
                noteSpec: tonicChanged.noteSpec
            }];
        buttons
            .data(ds, indexer)
            .attr("class", "tonic-button tonic-button-selected")
            .exit()
            .attr("class", function (d) { return isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button"; });
    }
    function indexer(d) {
        return d.noteSpec.label;
    }
    function isSameNoteAsNatural(noteSpec) {
        return music.naturals.some(function (x) { return x.index === noteSpec.index && x.index != noteSpec.natural.index; });
    }
})(tonics || (tonics = {}));
var chordInterval;
(function (chordInterval) {
    var buttons;
    var toggle = 0;
    function init() {
        var radius = 10;
        var pad = 2;
        var svg = d3.select("#modes");
        var intervals = svg
            .append("g")
            .attr("transform", "translate(0, 240)");
        var gs = intervals.selectAll("g")
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
        var updatedToggle = toggle ^ (Math.pow(2, x));
        var chordIntervals = [0, 1, 2, 3, 4, 5, 6].filter(function (x) { return (Math.pow(2, x) & updatedToggle) === Math.pow(2, x); });
        events.chordIntervalChange.publish({ chordIntervals: chordIntervals });
    }
    function update(event) {
        toggle = 0;
        event.chordIntervals.forEach(function (x) { return toggle = toggle + Math.pow(2, x); });
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
    var buttons;
    function init() {
        var pad = 5;
        var buttonHeight = 25;
        var svg = d3.select("#modes");
        var modes = svg
            .append("g")
            .attr("transform", "translate(0, 280)");
        var gs = modes.selectAll("g")
            .data(music.modes, function (m) { return m.index.toString(); })
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; });
        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("strokeWidth", 2)
            .attr("width", 150)
            .attr("height", 25)
            .attr("class", "mode-button")
            .on("click", function (d) { return events.modeChange.publish({ mode: d }); });
        gs
            .append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text(function (x) { return x.name; })
            .attr("class", "mode-text");
        events.modeChange.subscribe(update);
    }
    modes_1.init = init;
    function update(modeChange) {
        var modes = [modeChange.mode];
        buttons
            .data(modes, function (m) { return m.index.toString(); })
            .attr("class", "mode-button mode-button-selected")
            .exit()
            .attr("class", "mode-button");
    }
})(modes || (modes = {}));
var gtr;
(function (gtr_1) {
    var currentTuning;
    var currentState;
    var notes;
    var noteLabels;
    var numberOfFrets = 16;
    var fretboardElement;
    var isLeftHanded = false;
    var isNutFlipped = false;
    var fretboardLabelType = events.FretboardLabelType.NoteName;
    var stringGap = 40;
    var fretGap = 70;
    var fretWidth = 5;
    var noteRadius = 15;
    var pad = 20;
    function indexer(stringNote) {
        return stringNote.index + "_" + stringNote.octave;
    }
    function init() {
        events.tuningChange.subscribe(updateFretboard);
        events.scaleChange.subscribe(update);
        events.leftHandedChange.subscribe(handleLeftHandedChanged);
        events.flipNutChange.subscribe(handleFlipNutChanged);
        events.fretboardLabelChange.subscribe(handleLabelChange);
    }
    gtr_1.init = init;
    function handleLeftHandedChanged(lhEvent) {
        isLeftHanded = lhEvent.isLeftHanded;
        setHandedness();
    }
    function setHandedness() {
        if (isLeftHanded) {
            fretboardElement.transform.baseVal.getItem(0).setTranslate(1200, 0);
            fretboardElement.transform.baseVal.getItem(1).setScale(-1, 1);
            noteLabels
                .attr("transform", function (d, i) { return "translate(0, 0) scale(-1, 1)"; })
                .attr("x", function (d, i) { return -(i * fretGap + pad + 30); });
        }
        else {
            fretboardElement.transform.baseVal.getItem(0).setTranslate(0, 0);
            fretboardElement.transform.baseVal.getItem(1).setScale(1, 1);
            noteLabels
                .attr("transform", function (d, i) { return "translate(0, 0) scale(1, 1)"; })
                .attr("x", function (d, i) { return (i * fretGap + pad + 30); });
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
        var fretData = getFretData(numberOfFrets);
        var dots = tuningInfo.dots;
        d3.selectAll("#gtr > *").remove();
        var svg = d3.select("#gtr");
        svg.append("text")
            .attr("class", "mode-text")
            .attr("x", 30)
            .attr("y", 10)
            .text(tuningInfo.tuning + " " + tuningInfo.description);
        var gtr = svg.append("g").attr("transform", "translate(0, 0) scale(1, 1)");
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
        var strings = gtr.append("g").selectAll("g")
            .data(isNutFlipped ? tuningInfo.notes.slice() : tuningInfo.notes.slice().reverse(), function (n) { return n + ""; })
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
            .on("click", function (d) { return events.toggle.publish({ index: d.index }); });
        noteLabels = strings
            .selectAll("text")
            .data(function (d) { return allNotesFrom(d, numberOfFrets); }, indexer)
            .enter()
            .append("text")
            .attr("transform", "translate(0, 0) scale(1, 1)")
            .attr("text-anchor", "middle")
            .attr("x", function (d, i) { return i * fretGap + pad + 30; })
            .attr("y", (stringGap / 2) + 5)
            .text("");
        setHandedness();
        if (currentState != null) {
            update(currentState);
        }
    }
    function update(stateChange) {
        var hasToggledNotes = stateChange.nodes.some(function (x) { return x.toggle; });
        var fill = function (d) {
            return d.node.toggle
                ? "white"
                : d.node.scaleNote.isScaleNote
                    ? d.node.scaleNote.noteNumber === 0
                        ? hasToggledNotes ? "white" : "yellow"
                        : "white"
                    : "rgba(255, 255, 255, 0.01)";
        };
        var stroke = function (d) {
            return d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16)
                : hasToggledNotes ? "none"
                    : d.node.scaleNote.isScaleNote ? "grey" : "none";
        };
        var strokeWidth = function (d) {
            return d.node.toggle ? 4
                : d.node.scaleNote.isScaleNote ? 2 : 0;
        };
        var data = repeatTo(stateChange.nodes, numberOfFrets);
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
        var items = [];
        for (var i = 0; i < numberOfNotes; i++) {
            items.push({
                octave: Math.floor((i + 1) / 12),
                index: (i + index) % 12,
                node: music.nullNode
            });
        }
        return items;
    }
    function getFretData(numberOfFrets) {
        var data = [];
        for (var i = 0; i < numberOfFrets; i++) {
            data.push(i);
        }
        return data;
    }
    function repeatTo(nodes, count) {
        var stringNotes = [];
        var _loop_1 = function (i) {
            stringNotes = stringNotes.concat(nodes.map(function (x) { return ({
                octave: i,
                index: x.scaleNote.note.index,
                node: x
            }); }));
        };
        for (var i = 0; i <= Math.floor(count / 12); i++) {
            _loop_1(i);
        }
        return stringNotes;
    }
})(gtr || (gtr = {}));
var tuning;
(function (tuning_1) {
    var guitarDots = [
        [3, 0],
        [5, 0],
        [7, 0],
        [9, 0],
        [12, -1],
        [12, 1],
        [15, 0]
    ];
    var tunings = [
        { tuning: "EADGBE", dots: guitarDots, description: "Guitar Standard" },
        { tuning: "DADGBE", dots: guitarDots, description: "Guitar Drop D" },
        { tuning: "DADGAD", dots: guitarDots, description: "Guitar" },
        { tuning: "CGDAEA", dots: guitarDots, description: "Guitar Fripp NST" },
        { tuning: "EADG", dots: guitarDots, description: "Bass Standard" },
        { tuning: "DADG", dots: guitarDots, description: "Bass Drop D" },
        { tuning: "GCEA", dots: guitarDots, description: "Ukulele C" },
        { tuning: "CGDA", dots: guitarDots, description: "Cello" },
        { tuning: "GDAE", dots: guitarDots, description: "Violin" },
        { tuning: "CGDA", dots: guitarDots, description: "Viola" },
    ];
    function parseTuning(tuning) {
        var result = [];
        var _loop_2 = function (i) {
            var noteChar = tuning.charAt(i);
            var natural = music.naturals.filter(function (x) { return x.label === noteChar; });
            if (natural.length != 1) {
                throw "Invalid tuning char";
            }
            result.push(natural[0].index);
        };
        for (var i = 0; i < tuning.length; i++) {
            _loop_2(i);
        }
        return result;
    }
    function init() {
        d3.select("#tuning-dropdown")
            .selectAll("div")
            .data(tunings)
            .enter()
            .append("div")
            .attr("class", "dropdown-content-item")
            .on("click", function (x) { return raiseTuningChangedEvent(x); })
            .text(function (x) { return x.tuning + "   " + x.description; });
        raiseTuningChangedEvent(tunings[0]);
    }
    tuning_1.init = init;
    function raiseTuningChangedEvent(info) {
        events.tuningChange.publish({
            tuning: info.tuning,
            dots: info.dots,
            description: info.description,
            notes: parseTuning(info.tuning)
        });
    }
})(tuning || (tuning = {}));
var settings;
(function (settings) {
    function onLeftHandedClick(e) {
        events.leftHandedChange.publish({ isLeftHanded: e.checked });
    }
    settings.onLeftHandedClick = onLeftHandedClick;
    function onFlipNut(e) {
        console.log("Flip Nut");
        events.flipNutChange.publish({ isNutFlipped: e.checked });
    }
    settings.onFlipNut = onFlipNut;
    function onFbNoteTextClick(e) {
        events.fretboardLabelChange.publish({ labelType: parseInt(e.value) });
    }
    settings.onFbNoteTextClick = onFbNoteTextClick;
})(settings || (settings = {}));
///<reference path="../node_modules/@types/d3/index.d.ts" />
tonics.init();
modes.init();
chordInterval.init();
var chromatic = new cof.NoteCircle(d3.select("#chromatic"), music.chromatic(), "Chromatic");
var circleOfFifths = new cof.NoteCircle(d3.select("#cof"), music.fifths(), "Circle of Fifths");
gtr.init();
tuning.init();
state.init();
cookies.init();
//# sourceMappingURL=gtr-cof.js.map