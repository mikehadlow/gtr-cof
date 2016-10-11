///<reference path="node_modules/@types/d3/index.d.ts" />

namespace gtrcof {
    
    export function init() {
        let cof = d3.select("#cof").append("g");
        cof.append("circle")
            .attr("r", "300")
            .attr("cx", "300")
            .attr("cy", "300");
        console.log("init done!");
    }

}

gtrcof.init();