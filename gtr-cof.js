///<reference path="node_modules/@types/d3/index.d.ts" />
var music;
(function (music) {
    var notes = [
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
    var Note = (function () {
        function Note() {
        }
        return Note;
    }());
    music.Note = Note;
    function fifths() {
        var items = [];
        var current = notes[0];
        for (var i = 0; i < 12; i++) {
            items.push(current);
            current = notes[(current.index + 7) % 12];
        }
        return items;
    }
    music.fifths = fifths;
})(music || (music = {}));
var gtrcof;
(function (gtrcof) {
    function init() {
        var pad = 10;
        var radius = 300;
        var innerRadius = radius - 150;
        var textRadius = radius - 75;
        var cof = d3
            .select("#cof")
            .append("g")
            .attr("transform", "translate(" + (radius + pad) + ", " + (radius + pad) + ")");
        var segments = generateSegments(12);
        cof.selectAll("path")
            .data(segments)
            .enter()
            .append("path")
            .attr("d", noteSegmentGenerator(innerRadius, radius))
            .attr("fill", "lightgrey")
            .attr("stroke", "black")
            .attr("stroke-width", "2");
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
    function radialGenerator(inner, outter, radians) {
        var innerCart = polarToCart(inner, radians);
        var outterCart = polarToCart(outter, radians);
        return "M " + innerCart[0] + " " + innerCart[1] + " L " + outterCart[0] + " " + outterCart[1];
    }
    function generateSegments(count) {
        var fifths = music.fifths();
        var items = [];
        var angle = (Math.PI * (2 / count));
        for (var i = 0; i < count; i++) {
            var itemAngle = (angle * i) - (Math.PI / 2) - (angle / 2);
            items.push({
                startAngle: itemAngle,
                endAngle: itemAngle + angle,
                textAngle: itemAngle + (angle / 2),
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
//# sourceMappingURL=gtr-cof.js.map