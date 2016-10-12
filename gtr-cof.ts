///<reference path="node_modules/@types/d3/index.d.ts" />

namespace gtrcof {
    
    export function init() {
        let pad = 10;
        let radius = 300;
        let cof = d3.select("#cof").append("g");
        cof.append("circle")
            .attr("r", radius)
            .attr("cx", radius + pad)
            .attr("cy", radius + pad)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", "2");
        console.log("init done!");
    }

}

gtrcof.init();