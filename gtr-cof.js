///<reference path="node_modules/@types/d3/index.d.ts" />
var gtrcof;
(function (gtrcof) {
    function init() {
        var pad = 10;
        var radius = 300;
        var innerRadius = radius - 150;
        var cof = d3
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
        cof.selectAll("path")
            .data(angles(12))
            .enter()
            .append("path")
            .attr("d", function (x) { return radialGenerator(innerRadius, radius, x); })
            .attr("stroke", "black")
            .attr("stroke-width", "2");
        console.log("init done!");
    }
    gtrcof.init = init;
    function polarToCart(r, radians) {
        return [r * Math.cos(radians), r * Math.sin(radians)];
    }
    function radialGenerator(inner, outter, radians) {
        var innerCart = polarToCart(inner, radians);
        var outterCart = polarToCart(outter, radians);
        return "M " + innerCart[0] + " " + innerCart[1] + " L " + outterCart[0] + " " + outterCart[1];
    }
    function angles(count) {
        var items = [];
        for (var i = 0; i < count; i++) {
            items.push(i * (Math.PI * (2 / count)));
        }
        return items;
    }
})(gtrcof || (gtrcof = {}));
gtrcof.init();
//# sourceMappingURL=gtr-cof.js.map