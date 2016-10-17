///<reference path="node_modules/@types/d3/index.d.ts" />
var music;
(function (music) {
    music.notes = [
        { name: 'C', index: 0 },
        { name: 'C#', index: 1 },
        { name: 'D', index: 2 },
        { name: 'D#', index: 3 },
        { name: 'E', index: 4 },
        { name: 'F', index: 5 },
        { name: 'F#', index: 6 },
        { name: 'G', index: 7 },
        { name: 'G#', index: 8 },
        { name: 'A', index: 9 },
        { name: 'A#', index: 10 },
        { name: 'B', index: 11 },
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
    var scaleTones = [2, 2, 1, 2, 2, 2, 1];
    var romanNumeral = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
    var Note = (function () {
        function Note() {
        }
        return Note;
    }());
    music.Note = Note;
    var Mode = (function () {
        function Mode() {
        }
        return Mode;
    }());
    music.Mode = Mode;
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
        var scale = [];
        var noteIndex = tonic.index;
        for (var i = 0; i < 7; i++) {
            scale.push(music.notes[noteIndex]);
            noteIndex = (noteIndex + scaleTones[((i + mode.index) % 7)]) % 12;
        }
        return scale;
    }
    music.scale = scale;
    function degree(i) {
        return romanNumeral[i];
    }
    music.degree = degree;
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
    function updateListeners() {
        var stateChange = {
            tonic: currentTonic,
            mode: currentMode,
            scale: music.scale(currentTonic, currentMode)
        };
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener(stateChange);
        }
    }
    var StateChange = (function () {
        function StateChange() {
        }
        return StateChange;
    }());
    state.StateChange = StateChange;
})(state || (state = {}));
var gtrcof;
(function (gtrcof) {
    var noteSegments = null;
    var degreeSegments = null;
    var degreeText = null;
    var indexer = function (x) { return x.note.name; };
    function init() {
        var pad = 30;
        var svg = d3.select("#cof");
        var radius = 220;
        var midRadius = 125;
        var innerRadius = 90;
        var cof = svg
            .append("g")
            .attr("transform", "translate(" + (radius + pad) + ", " + (radius + pad) + ")");
        var segments = generateSegments(12);
        var noteArc = d3.svg.arc()
            .innerRadius(midRadius)
            .outerRadius(radius);
        var degreeArc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(midRadius);
        noteSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", noteArc)
            .attr("fill", "lightgrey")
            .attr("stroke", "black")
            .attr("stroke-width", "3")
            .attr("class", "note-segment")
            .on("click", handleNoteClick);
        cof.append("g").selectAll("text")
            .data(segments)
            .enter()
            .append("text")
            .attr("x", function (x) { return noteArc.centroid(x)[0]; })
            .attr("y", function (x) { return noteArc.centroid(x)[1] + 18; })
            .text(function (x) { return x.note.name; })
            .attr("font-size", "50px")
            .attr("text-anchor", "middle")
            .attr("fill", "black");
        degreeSegments = cof.append("g").selectAll("path")
            .data(segments, indexer)
            .enter()
            .append("path")
            .attr("d", degreeArc)
            .attr("fill", "none")
            .attr("stroke", "none");
        degreeText = cof.append("g").selectAll("text")
            .data(segments, indexer)
            .enter()
            .append("text")
            .attr("x", function (x) { return degreeArc.centroid(x)[0]; })
            .attr("y", function (x) { return degreeArc.centroid(x)[1] + 8; })
            .text("")
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("fill", "black");
        state.addListener(update);
    }
    gtrcof.init = init;
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
            .attr("fill", function (d, i) { return (i === 0) ? "yellow" : "white"; })
            .exit()
            .attr("fill", "lightgrey");
        degreeSegments
            .data(data, indexer)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .exit()
            .attr("fill", "none")
            .attr("stroke", "none");
        degreeText
            .data(data, indexer)
            .text(function (d, i) { return music.degree(i); })
            .exit()
            .text("");
    }
    gtrcof.update = update;
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
    var Segment = (function () {
        function Segment() {
        }
        return Segment;
    }());
})(gtrcof || (gtrcof = {}));
var modes;
(function (modes_1) {
    var buttons = null;
    function init() {
        var pad = 10;
        var buttonHeight = 50;
        var buttonWidth = 250;
        var svg = d3.select("#modes");
        var modes = svg.append("g");
        var gs = modes.selectAll("g")
            .data(music.modes, function (m) { return m.index.toString(); })
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + 30) + ")"; });
        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("width", buttonWidth)
            .attr("height", buttonHeight)
            .attr("fill", "lightgrey")
            .attr("stroke", "black")
            .attr("stroke-width", "3")
            .on("click", handleButtonClick);
        gs
            .append("text")
            .attr("x", pad + 20)
            .attr("y", 34)
            .text(function (x) { return x.name; })
            .attr("font-size", "30px")
            .attr("text-anchor", "left")
            .attr("fill", "black");
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
            .attr("fill", "white")
            .exit()
            .attr("fill", "lightgrey");
    }
})(modes || (modes = {}));
gtrcof.init();
modes.init();
state.changeTonic(music.notes[0]);
//# sourceMappingURL=gtr-cof.js.map