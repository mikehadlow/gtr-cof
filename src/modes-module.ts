
namespace modes {

    let buttons: d3.Selection<music.Mode>;

    export function init(): void {
        let pad = 5;
        let buttonHeight = 25;
        let svg = d3.select("#modes");
        let modes = svg
            .append("g")
            .attr("transform", "translate(0, 280)");

        let gs = modes.selectAll("g")
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
            .on("click", (d) => events.modeChange.publish({ mode: d }));

        gs
            .append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text(function (x) { return x.name; })
            .attr("class", "mode-text");

        events.modeChange.subscribe(update);
    }

    function update(modeChange: events.ModeChangedEvent): void {
        let modes: Array<music.Mode> = [modeChange.mode];
        buttons
            .data(modes, function (m) { return m.index.toString(); })
            .attr("class", "mode-button mode-button-selected")
            .exit()
            .attr("class", "mode-button")
    }
}
