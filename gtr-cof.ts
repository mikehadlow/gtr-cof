///<reference path="node_modules/@types/d3/index.d.ts" />

namespace gtrcof {
    
    export function init() {
        let pad = 10;
        let radius = 300;
        let innerRadius = radius - 150;

        let cof = d3
            .select("#cof")
            .append("g")
            .attr("transform", "translate(" + (radius + pad) +", " + (radius + pad) + ")");

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
            .attr("d", function(x) { return radialGenerator(innerRadius, radius, x); })
            .attr("stroke", "black")
            .attr("stroke-width", "2");
            
        console.log("init done!");
    }

    function polarToCart(r: number, radians: number) : [number, number] {
        return [r * Math.cos(radians), r * Math.sin(radians)];
    }
    
    function radialGenerator(inner: number, outter: number, radians: number) : string {
        let innerCart = polarToCart(inner, radians);
        let outterCart = polarToCart(outter, radians);
        return "M " + innerCart[0] + " " + innerCart[1] + " L " + outterCart[0] + " " + outterCart[1];
    }
    
    function angles(count: number) : number[] {
        let items : Array<number> = [];
        for(let i:number = 0; i < count; i++) {
            items.push(i * (Math.PI * (2 / count)));
        }
        return items;
    }
}

gtrcof.init();