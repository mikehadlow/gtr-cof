///<reference path="node_modules/@types/d3/index.d.ts" />
var gtrcof;
(function (gtrcof) {
    function init() {
        var pad = 10;
        var radius = 300;
        var cof = d3.select("#cof").append("g");
        cof.append("circle")
            .attr("r", radius)
            .attr("cx", radius + pad)
            .attr("cy", radius + pad)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", "2");
        console.log("init done!");
    }
    gtrcof.init = init;
})(gtrcof || (gtrcof = {}));
gtrcof.init();
//# sourceMappingURL=gtr-cof.js.map