import d3 from "d3";

// icons references SVG icon ids defined in docs/index.html
export const icons = {
    gear: "#icon-gear",
} as const;

export const appendSettingsIcon = (svg: d3.Selection<any>, onClick: () => void): void => {
    const gearX = parseInt(svg.attr("width"), 10) - 30;
    const gearY = 0;
    const size = 25;
    const gearGroup = svg
        .append("g")
        .style("cursor", "pointer")
        .on("mouseover", function (this: Element) {
            d3.select(this).select("use").style("fill", "black");
        })
        .on("mouseout", function (this: Element) {
            d3.select(this).select("use").style("fill", "none");
        })
        .on("click", onClick);
    gearGroup
        .append("rect")
        .attr("x", gearX)
        .attr("y", gearY)
        .attr("width", size)
        .attr("height", size)
        .style("fill", "transparent");
    gearGroup
        .append("use")
        .attr("href", icons.gear)
        .attr("x", gearX)
        .attr("y", gearY)
        .attr("width", size)
        .attr("height", size)
        .style("fill", "none")
        .style("stroke", "black")
        .style("pointer-events", "none");
};
