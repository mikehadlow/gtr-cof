namespace chordInterval {

    let buttons: d3.Selection<number>;
    let toggle: number = 0;

    export function init(): void {

        let radius = 10;
        let pad = 2;

        let svg = d3.select("#modes");
        let intervals = svg
            .append("g")
            .attr("transform", "translate(0, 240)");

        let gs = intervals.selectAll("g")
            .data([0,1,2,3,4,5,6], function (i) { return i.toString(); })
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

    function onClick(x:number) {
        let updatedToggle = toggle ^ (2**x);
        let chordIntervals = [0,1,2,3,4,5,6].filter(x => (2**x & updatedToggle) === 2**x);
        events.chordIntervalChange.publish({ chordIntervals: chordIntervals });
    }

    export function update(event: events.ChordIntervalChangeEvent): void {
        toggle = 0;
        event.chordIntervals.forEach(x => toggle = toggle + 2**x);
        buttons
            .data(event.chordIntervals, function (m) { return m.toString(); })
            .attr("class", "mode-button mode-button-selected")
            .exit()
            .attr("class", "mode-button");
    }

    interface button {
        readonly id: number,
        selected: boolean
    }
}