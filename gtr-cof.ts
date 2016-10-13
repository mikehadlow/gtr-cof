///<reference path="node_modules/@types/d3/index.d.ts" />

namespace music {

    let notes: Array<Note> = [
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

    export class Note {
        name: string;
        index: number;
    }

    export function fifths(): Array<Note> {
        let items: Array<Note> = [];
        let current: Note = notes[0];

        for (let i: number = 0; i < 12; i++) {
            items.push(current);
            current = notes[(current.index + 7) % 12];
        }

        return items;
    }
}

namespace gtrcof {

    export function init() {
        let pad = 10;
        let radius = 300;
        let innerRadius = radius - 150;
        let textRadius = radius - 75;

        let cof = d3
            .select("#cof")
            .append("g")
            .attr("transform", "translate(" + (radius + pad) + ", " + (radius + pad) + ")");

        cof.append("circle")
            .attr("r", radius)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", "2");

        cof.append("circle")
            .attr("r", innerRadius)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", "2");

        let segments = generateSegments(12);

        cof.selectAll("path")
            .data(segments)
            .enter()
            .append("path")
            .attr("d", function (x) { return radialGenerator(innerRadius, radius, x.lineAngle); })
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

    function polarToCart(r: number, radians: number): [number, number] {
        return [r * Math.cos(radians), r * Math.sin(radians)];
    }

    function radialGenerator(inner: number, outter: number, radians: number): string {
        let innerCart = polarToCart(inner, radians);
        let outterCart = polarToCart(outter, radians);
        return "M " + innerCart[0] + " " + innerCart[1] + " L " + outterCart[0] + " " + outterCart[1];
    }

    function generateSegments(count: number): Segment[] {
        let fifths = music.fifths();
        let items: Array<Segment> = [];
        let angle = (Math.PI * (2 / count));
        for (let i: number = 0; i < count; i++) {
            let itemAngle = (angle * i) - (Math.PI / 2) - (angle / 2);
            items.push({
                lineAngle: itemAngle,
                textAngle: itemAngle + (angle / 2),
                note: fifths[i]
            });
        }
        return items;
    }

    class Segment {
        lineAngle: number;
        textAngle: number;
        note: music.Note;
    }
}

gtrcof.init();