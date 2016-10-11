///<reference path="node_modules/@types/d3/index.d.ts" />
var gtrcof;
(function (gtrcof) {
    function init() {
        var cof = d3.select("#cof").append("g");
        cof.append("circle")
            .attr("r", "300")
            .attr("cx", "300")
            .attr("cy", "300");
        console.log("init done!");
    }
    gtrcof.init = init;
})(gtrcof || (gtrcof = {}));
gtrcof.init();
//# sourceMappingURL=gtr-cof.js.map