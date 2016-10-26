///<reference path="node_modules/@types/d3/index.d.ts" />
var music;
(function (music) {
    music.notes = [
        { name: 'C', flat: 'C', index: 0 },
        { name: 'C#', flat: 'Db', index: 1 },
        { name: 'D', flat: 'D', index: 2 },
        { name: 'D#', flat: 'Eb', index: 3 },
        { name: 'E', flat: 'E', index: 4 },
        { name: 'F', flat: 'F', index: 5 },
        { name: 'F#', flat: 'Gb', index: 6 },
        { name: 'G', flat: 'G', index: 7 },
        { name: 'G#', flat: 'Ab', index: 8 },
        { name: 'A', flat: 'A', index: 9 },
        { name: 'A#', flat: 'Bb', index: 10 },
        { name: 'B', flat: 'B', index: 11 },
    ];
    music.modes = [
        { name: 'Lydian', index: 3 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 4 },
        { name: 'Dorian', index: 1 },
        { name: 'N Minor / Aolian', index: 5 },
        { name: 'Phrygian', index: 2 },
        { name: 'Locrian', index: 6 },
    ];
    music.tuning = [
        music.notes[4],
        music.notes[9],
        music.notes[2],
        music.notes[7],
        music.notes[11],
        music.notes[4],
    ];
    var scaleTones = [2, 2, 1, 2, 2, 2, 1];
    var romanNumeral = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
    (function (ChordType) {
        ChordType[ChordType["Major"] = 0] = "Major";
        ChordType[ChordType["Minor"] = 1] = "Minor";
        ChordType[ChordType["Diminished"] = 2] = "Diminished";
    })(music.ChordType || (music.ChordType = {}));
    var ChordType = music.ChordType;
    ;
    function fifths() {
        var items = [];
        var current = music.notes[0];
        for (var i = 0; i < 12; i++) {
            items.push(current);
            current = music.notes[(current.index + 7) % 12];
        }
        return items;
    }
    music.fifths = fifths;
    function scale(tonic, mode) {
        var notesOfScale = [];
        var scale = [];
        var noteIndex = tonic.index;
        for (var i = 0; i < 7; i++) {
            notesOfScale.push(music.notes[noteIndex]);
            noteIndex = (noteIndex + scaleTones[((i + mode.index) % 7)]) % 12;
        }
        for (var i = 0; i < 7; i++) {
            var note = notesOfScale[i];
            var triad = [
                notesOfScale[i],
                notesOfScale[(i + 2) % 7],
                notesOfScale[(i + 4) % 7]
            ];
            scale.push({
                name: note.name,
                flat: note.flat,
                index: note.index,
                degree: i,
                degreeName: romanNumeral[i],
                triad: triad,
                chordType: getChordType(triad)
            });
        }
        return scale;
    }
    music.scale = scale;
    function appendTriad(scale, triad) {
        for (var _i = 0, scale_1 = scale; _i < scale_1.length; _i++) {
            var note = scale_1[_i];
            for (var i = 0; i < 3; i++) {
                if (note.name === triad[i].name) {
                    note.chordNote = i;
                }
            }
        }
        return scale;
    }
    music.appendTriad = appendTriad;
    function getChordType(triad) {
        // check for diminished
        if (interval(triad[0], triad[2]) === 6)
            return ChordType.Diminished;
        // check for minor
        if (interval(triad[0], triad[1]) === 3)
            return ChordType.Minor;
        // must be Major
        return ChordType.Major;
    }
    function interval(a, b) {
        return (a.index <= b.index) ? b.index - a.index : (b.index + 12) - a.index;
    }
})(music || (music = {}));
var state;
(function (state) {
    var listeners = [];
    var currentTonic = music.notes[0];
    var currentMode = music.modes[1];
    function addListener(listener) {
        listeners.push(listener);
    }
    state.addListener = addListener;
    function changeTonic(newTonic) {
        currentTonic = newTonic;
        updateListeners();
    }
    state.changeTonic = changeTonic;
    function changeMode(newMode) {
        currentMode = newMode;
        updateListeners();
    }
    state.changeMode = changeMode;
    function changeChord(triad) {
        updateListeners(triad);
    }
    state.changeChord = changeChord;
    function updateListeners(triad) {
        var scale = music.scale(currentTonic, currentMode);
        if (triad) {
            scale = music.appendTriad(scale, triad);
        }
        var stateChange = {
            tonic: currentTonic,
            mode: currentMode,
            scale: scale
        };
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener(stateChange);
        }
    }
})(state || (state = {}));
var cof;
(function (cof_1) {
    var noteSegments = null;
    var degreeSegments = null;
    var degreeText = null;
    var chordSegments = null;
    var chordNotes = null;
    var indexer = function (x) { return x.note.name; };
    function init() {
        var pad = 30;
        var svg = d3.select("#cof");
        var chordRadius = 220;
        var noteRadius = 200;
        var degreeRadius = 135;
        var innerRadius = 90;
        var cof = svg
            .append("g")
            .attr("transform", "translate(" + (noteRadius + pad) + ", " + (noteRadius + pad) + ")");
        var segments = generateSegments(12);
        var noteArc = d3.svg.arc()
            .innerRadius(degreeRadius)
            .outerRadius(noteRadius);
        var degreeArc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(degreeRadius);
        var chordArc = d3.svg.arc()
            .innerRadius(noteRadius)
            .outerRadius(chordRadius);
        noteSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", noteArc)
            .attr("class", "note-segment")
            .on("click", handleNoteClick);
        cof.append("g").selectAll("text")
            .data(segments)
            .enter()
            .append("text")
            .attr("x", function (x) { return noteArc.centroid(x)[0]; })
            .attr("y", function (x) { return noteArc.centroid(x)[1] + 18; })
            .text(function (x) { return x.note.name; })
            .attr("class", "note-segment-text");
        degreeSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", degreeArc)
            .attr("class", "degree-segment");
        degreeText = cof.append("g").selectAll("text")
            .data(segments, indexer)
            .enter()
            .append("text")
            .attr("x", function (x) { return degreeArc.centroid(x)[0]; })
            .attr("y", function (x) { return degreeArc.centroid(x)[1] + 8; })
            .text("")
            .attr("class", "degree-segment-text");
        chordSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", chordArc)
            .attr("class", "chord-segment")
            .on("click", handleChordClick);
        chordNotes = cof.append("g").selectAll("circle")
            .data(segments, indexer)
            .enter()
            .append("circle")
            .style("pointer-events", "none")
            .attr("r", 15)
            .attr("cx", function (x) { return chordArc.centroid(x)[0]; })
            .attr("cy", function (x) { return chordArc.centroid(x)[1]; })
            .attr("class", "chord-segment-note");
        state.addListener(update);
    }
    cof_1.init = init;
    function update(stateChange) {
        var data = [];
        for (var _i = 0, _a = stateChange.scale; _i < _a.length; _i++) {
            var n = _a[_i];
            data.push({
                note: n,
                startAngle: 0,
                endAngle: 0
            });
        }
        noteSegments
            .data(data, indexer)
            .attr("class", function (d, i) { return "note-segment " + ((i === 0) ? "note-segment-tonic" : "note-segment-scale"); })
            .exit()
            .attr("class", "note-segment");
        degreeSegments
            .data(data, indexer)
            .attr("class", "degree-segment-selected")
            .exit()
            .attr("class", "degree-segment");
        degreeText
            .data(data, indexer)
            .text(function (d, i) { return d.note.degreeName; })
            .exit()
            .text("");
        chordSegments
            .data(data, indexer)
            .attr("class", function (d, i) { return getChordSegmentClass(d.note); })
            .exit()
            .attr("class", "chord-segment");
        chordNotes
            .data(data, indexer)
            .attr("class", function (d, i) { return getChordNoteClass(d.note); })
            .exit()
            .attr("class", "chord-segment-note");
    }
    cof_1.update = update;
    function getChordSegmentClass(note) {
        if (note.chordType === music.ChordType.Diminished)
            return "chord-segment-dim";
        if (note.chordType === music.ChordType.Minor)
            return "chord-segment-minor";
        if (note.chordType === music.ChordType.Major)
            return "chord-segment-major";
        throw "Unexpected ChordType";
    }
    function getChordNoteClass(note) {
        if (note.chordNote === undefined)
            return "chord-segment-note";
        if (note.chordNote === 0)
            return "chord-segment-note-root";
        if (note.chordNote === 1)
            return "chord-segment-note-third";
        return "chord-segment-note-fifth";
    }
    function generateSegments(count) {
        var fifths = music.fifths();
        var items = [];
        var angle = (Math.PI * (2 / count));
        for (var i = 0; i < count; i++) {
            var itemAngle = (angle * i) - (angle / 2);
            items.push({
                note: fifths[i],
                startAngle: itemAngle,
                endAngle: itemAngle + angle
            });
        }
        return items;
    }
    function handleNoteClick(segment, i) {
        state.changeTonic(segment.note);
    }
    function handleChordClick(segment, i) {
        var note = segment.note;
        state.changeChord(note.triad);
    }
})(cof || (cof = {}));
var modes;
(function (modes_1) {
    var buttons = null;
    function init() {
        var pad = 5;
        var buttonHeight = 25;
        var svg = d3.select("#modes");
        var modes = svg.append("g");
        var gs = modes.selectAll("g")
            .data(music.modes, function (m) { return m.index.toString(); })
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; });
        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("class", "mode-button")
            .on("click", handleButtonClick);
        gs
            .append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text(function (x) { return x.name; })
            .attr("class", "mode-text");
        state.addListener(update);
    }
    modes_1.init = init;
    function handleButtonClick(mode, i) {
        state.changeMode(mode);
    }
    function update(stateChange) {
        var modes = [stateChange.mode];
        buttons
            .data(modes, function (m) { return m.index.toString(); })
            .attr("class", "mode-button mode-button-selected")
            .exit()
            .attr("class", "mode-button");
    }
})(modes || (modes = {}));
var gtr;
(function (gtr_1) {
    var notes = null;
    var numberOfFrets = 16;
    var noteColours = [
        "yellow",
        "lightgrey",
        "white",
        "white",
        "white",
        "lightgrey",
        "white"
    ];
    function init() {
        var stringGap = 40;
        var fretGap = 70;
        var fretWidth = 5;
        var noteRadius = 15;
        var pad = 50;
        var fretData = getFretData(numberOfFrets);
        var dots = [
            [3, 3],
            [5, 3],
            [7, 3],
            [9, 3],
            [12, 2],
            [12, 4],
            [15, 3]
        ];
        var svg = d3.select("#gtr");
        var gtr = svg.append("g");
        // frets
        gtr.append("g").selectAll("rect")
            .data(fretData)
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return (i + 1) * fretGap + pad - fretWidth; })
            .attr("y", pad + stringGap / 2 - fretWidth)
            .attr("width", fretWidth)
            .attr("height", stringGap * 5 + (fretWidth * 2))
            .attr("fill", function (d, i) { return i === 0 ? "black" : "none"; })
            .attr("stroke", "grey")
            .attr("stroke-width", 1);
        // dots
        gtr.append("g").selectAll("circle")
            .data(dots)
            .enter()
            .append("circle")
            .attr("r", noteRadius)
            .attr("cx", function (d) { return d[0] * fretGap + pad + (fretGap / 2); })
            .attr("cy", function (d) { return (d[1] + 1) * stringGap + 12; })
            .attr("fill", "lightgrey")
            .attr("stroke", "none");
        var strings = gtr.append("g").selectAll("g")
            .data(music.tuning.reverse(), function (n) { return n.name; })
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
            .data(function (d) { return allNotesFrom(d, numberOfFrets); }, function (d) { return d.note.name + d.octave.toString(); })
            .enter()
            .append("circle")
            .attr("r", noteRadius)
            .attr("cy", stringGap / 2)
            .attr("cx", function (d, i) { return i * fretGap + pad + 30; })
            .attr("fill", "none")
            .attr("stroke", "none");
        state.addListener(update);
    }
    gtr_1.init = init;
    function update(stateChange) {
        var fill = function (d, i) {
            return noteColours[i % 7];
        };
        var stroke = function (d, i) {
            var note = d.note;
            if (note.chordNote === undefined) {
                return "grey";
            }
            if (note.chordNote === 0) {
                return "red";
            }
            if (note.chordNote === 1) {
                return "green";
            }
            return "blue";
        };
        var strokeWidth = function (d, i) {
            var note = d.note;
            if (note.chordNote !== undefined) {
                return 5;
            }
            return 2;
        };
        notes
            .data(repeatTo(stateChange.scale, numberOfFrets), function (d) { return d.note.name + d.octave.toString(); })
            .attr("fill", fill)
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth)
            .exit()
            .attr("fill", "none")
            .attr("stroke", "none");
    }
    function allNotesFrom(note, numberOfNotes) {
        var items = [];
        for (var i = 0; i < numberOfNotes; i++) {
            items.push({
                note: music.notes[(i + note.index) % 12],
                octave: Math.floor((i + 1) / 12)
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
    function repeatTo(scale, count) {
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push({
                note: scale[i % scale.length],
                octave: Math.floor((i + 1) / 8)
            });
        }
        return result;
    }
})(gtr || (gtr = {}));
cof.init();
modes.init();
gtr.init();
state.changeTonic(music.notes[0]);
//# sourceMappingURL=gtr-cof.js.map