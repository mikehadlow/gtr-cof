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
})(music || (music = {}));
var gtrcof;
(function (gtrcof) {
    var noteSegments = null;
    function init() {
        var pad = 50;
        var svg = d3.select("#cof");
        var svgWidth = +svg.attr("width");
        var svgHeight = +svg.attr("height");
        var svgMin = (svgWidth > svgHeight) ? svgHeight : svgWidth;
        var radius = (svgMin - pad * 2) / 2;
        var innerRadius = radius / 2;
        var textRadius = innerRadius + (radius - innerRadius) / 2;
        var cof = svg
            .append("g")
            .attr("transform", "translate(" + (radius + pad) + ", " + (radius + pad) + ")");
        var segments = generateSegments(12);
        noteSegments = cof.selectAll("path")
            .data(segments, function (s) { return s.note.name; })
            .enter()
            .append("path")
            .attr("d", noteSegmentGenerator(innerRadius, radius))
            .attr("fill", "lightgrey")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("class", "note-segment");
        cof.selectAll("text")
            .data(segments)
            .enter()
            .append("text")
            .attr("x", function (x) { return polarToCart(textRadius, x.textAngle)[0]; })
            .attr("y", function (x) { return polarToCart(textRadius, x.textAngle)[1] + 25; })
            .text(function (x) { return x.note.name; })
            .attr("font-size", "80px")
            .attr("text-anchor", "middle")
            .attr("fill", "black");
        console.log("init done!");
    }
    gtrcof.init = init;
    function update(notes) {
        var data = [];
        for (var _i = 0, notes_1 = notes; _i < notes_1.length; _i++) {
            var n = notes_1[_i];
            data.push({
                startAngle: 0,
                endAngle: 0,
                textAngle: 0,
                note: n
            });
        }
        var segments = noteSegments
            .data(data, function (n) { return n.note.name; })
            .attr("fill", "white");
        segments.exit().attr("fill", "lightgrey");
    }
    gtrcof.update = update;
    function noteSegmentGenerator(inner, outter) {
        return function (segment) {
            var arc = d3.svg.arc()
                .innerRadius(inner)
                .outerRadius(outter)
                .startAngle(segment.startAngle)
                .endAngle(segment.endAngle);
            return arc(d3.svg.arc());
        };
    }
    function polarToCart(r, radians) {
        return [r * Math.cos(radians), r * Math.sin(radians)];
    }
    function generateSegments(count) {
        var fifths = music.fifths();
        var items = [];
        var angle = (Math.PI * (2 / count));
        for (var i = 0; i < count; i++) {
            var itemAngle = (angle * i) - (angle / 2);
            items.push({
                startAngle: itemAngle,
                endAngle: itemAngle + angle,
                textAngle: itemAngle - (Math.PI / 2) + (angle / 2),
                note: fifths[i]
            });
        }
        return items;
    }
    var Segment = (function () {
        function Segment() {
        }
        return Segment;
    }());
})(gtrcof || (gtrcof = {}));
gtrcof.init();
gtrcof.update(music.scale(music.notes[0], music.modes[1]));
//# sourceMappingURL=gtr-cof.js.map