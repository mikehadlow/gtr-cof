import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();

import { describe, expect, test } from "bun:test";
import type { RenderNode } from "./index";
import { renderToSvg } from "./index";

const SVG_NS = "http://www.w3.org/2000/svg";

function makeSvg(): SVGElement {
    return document.createElementNS(SVG_NS, "svg") as SVGElement;
}

describe("renderToSvg", () => {
    test("clears existing children before rendering", () => {
        const svg = makeSvg();
        svg.appendChild(document.createElementNS(SVG_NS, "circle"));
        svg.appendChild(document.createElementNS(SVG_NS, "rect"));

        renderToSvg(svg, []);

        expect(svg.childNodes.length).toBe(0);
    });

    test("appends one child per top-level node", () => {
        const svg = makeSvg();
        const nodes: RenderNode[] = [
            { type: "circle", cx: 0, cy: 0, r: 10 },
            { type: "rect", x: 0, y: 0, width: 10, height: 10 },
        ];

        renderToSvg(svg, nodes);

        expect(svg.childNodes.length).toBe(2);
    });

    test("re-render clears old children and adds new ones", () => {
        const svg = makeSvg();
        renderToSvg(svg, [{ type: "circle", cx: 0, cy: 0, r: 5 }]);
        renderToSvg(svg, [
            { type: "rect", x: 0, y: 0, width: 10, height: 10 },
            { type: "rect", x: 0, y: 0, width: 10, height: 10 },
        ]);

        expect(svg.childNodes.length).toBe(2);
        expect((svg.childNodes[0] as Element).tagName.toLowerCase()).toBe("rect");
    });
});

describe("createElement — circle", () => {
    test("creates a circle element in SVG namespace", () => {
        const svg = makeSvg();
        renderToSvg(svg, [{ type: "circle", cx: 10, cy: 20, r: 5 }]);
        const el = svg.childNodes[0] as Element;
        expect(el.tagName.toLowerCase()).toBe("circle");
        expect(el.namespaceURI).toBe(SVG_NS);
    });

    test("sets cx, cy, r attributes", () => {
        const svg = makeSvg();
        renderToSvg(svg, [{ type: "circle", cx: 10, cy: 20, r: 5 }]);
        const el = svg.childNodes[0] as Element;
        expect(el.getAttribute("cx")).toBe("10");
        expect(el.getAttribute("cy")).toBe("20");
        expect(el.getAttribute("r")).toBe("5");
    });

    test("sets optional class, fill, stroke, strokeWidth, pointerEvents", () => {
        const svg = makeSvg();
        renderToSvg(svg, [
            {
                type: "circle",
                cx: 0,
                cy: 0,
                r: 5,
                class: "note-segment",
                fill: "red",
                stroke: "black",
                strokeWidth: 2,
                pointerEvents: "none",
            },
        ]);
        const el = svg.childNodes[0] as Element;
        expect(el.getAttribute("class")).toBe("note-segment");
        expect(el.getAttribute("fill")).toBe("red");
        expect(el.getAttribute("stroke")).toBe("black");
        expect(el.getAttribute("stroke-width")).toBe("2");
        expect(el.getAttribute("pointer-events")).toBe("none");
    });

    test("attaches onClick via addEventListener", () => {
        const svg = makeSvg();
        let clicked = false;
        renderToSvg(svg, [
            {
                type: "circle",
                cx: 0,
                cy: 0,
                r: 5,
                onClick: () => {
                    clicked = true;
                },
            },
        ]);
        const el = svg.childNodes[0] as Element;
        el.dispatchEvent(new Event("click"));
        expect(clicked).toBe(true);
    });
});

describe("createElement — rect", () => {
    test("sets x, y, width, height", () => {
        const svg = makeSvg();
        renderToSvg(svg, [{ type: "rect", x: 5, y: 10, width: 100, height: 50 }]);
        const el = svg.childNodes[0] as Element;
        expect(el.tagName.toLowerCase()).toBe("rect");
        expect(el.getAttribute("x")).toBe("5");
        expect(el.getAttribute("y")).toBe("10");
        expect(el.getAttribute("width")).toBe("100");
        expect(el.getAttribute("height")).toBe("50");
    });

    test("attaches onClick", () => {
        const svg = makeSvg();
        let clicked = false;
        renderToSvg(svg, [
            {
                type: "rect",
                x: 0,
                y: 0,
                width: 10,
                height: 10,
                onClick: () => {
                    clicked = true;
                },
            },
        ]);
        (svg.childNodes[0] as Element).dispatchEvent(new Event("click"));
        expect(clicked).toBe(true);
    });
});

describe("createElement — path", () => {
    test("sets d attribute and class", () => {
        const svg = makeSvg();
        renderToSvg(svg, [{ type: "path", d: "M 0,0 L 10,10", class: "note-segment" }]);
        const el = svg.childNodes[0] as Element;
        expect(el.tagName.toLowerCase()).toBe("path");
        expect(el.getAttribute("d")).toBe("M 0,0 L 10,10");
        expect(el.getAttribute("class")).toBe("note-segment");
    });

    test("attaches onClick", () => {
        const svg = makeSvg();
        let clicked = false;
        renderToSvg(svg, [
            {
                type: "path",
                d: "M 0,0",
                onClick: () => {
                    clicked = true;
                },
            },
        ]);
        (svg.childNodes[0] as Element).dispatchEvent(new Event("click"));
        expect(clicked).toBe(true);
    });
});

describe("createElement — text", () => {
    test("sets x, y, textContent, textAnchor, class, transform", () => {
        const svg = makeSvg();
        renderToSvg(svg, [
            {
                type: "text",
                x: 5,
                y: 10,
                content: "C#",
                class: "note-label",
                textAnchor: "middle",
                transform: "rotate(45)",
            },
        ]);
        const el = svg.childNodes[0] as Element;
        expect(el.tagName.toLowerCase()).toBe("text");
        expect(el.getAttribute("x")).toBe("5");
        expect(el.getAttribute("y")).toBe("10");
        expect(el.textContent).toBe("C#");
        expect(el.getAttribute("class")).toBe("note-label");
        expect(el.getAttribute("text-anchor")).toBe("middle");
        expect(el.getAttribute("transform")).toBe("rotate(45)");
    });
});

describe("createElement — line", () => {
    test("sets x1, y1, x2, y2, stroke, strokeWidth", () => {
        const svg = makeSvg();
        renderToSvg(svg, [{ type: "line", x1: 0, y1: 0, x2: 100, y2: 100, stroke: "black", strokeWidth: 1 }]);
        const el = svg.childNodes[0] as Element;
        expect(el.tagName.toLowerCase()).toBe("line");
        expect(el.getAttribute("x1")).toBe("0");
        expect(el.getAttribute("y1")).toBe("0");
        expect(el.getAttribute("x2")).toBe("100");
        expect(el.getAttribute("y2")).toBe("100");
        expect(el.getAttribute("stroke")).toBe("black");
        expect(el.getAttribute("stroke-width")).toBe("1");
    });
});

describe("createElement — use", () => {
    test("sets href, x, y, width, height", () => {
        const svg = makeSvg();
        renderToSvg(svg, [{ type: "use", href: "#icon-gear", x: 5, y: 10, width: 25, height: 25 }]);
        const el = svg.childNodes[0] as Element;
        expect(el.tagName.toLowerCase()).toBe("use");
        expect(el.getAttribute("href")).toBe("#icon-gear");
        expect(el.getAttribute("x")).toBe("5");
        expect(el.getAttribute("y")).toBe("10");
        expect(el.getAttribute("width")).toBe("25");
        expect(el.getAttribute("height")).toBe("25");
    });

    test("applies style entries", () => {
        const svg = makeSvg();
        renderToSvg(svg, [
            {
                type: "use",
                href: "#icon",
                x: 0,
                y: 0,
                width: 10,
                height: 10,
                style: { fill: "none", stroke: "black" },
            },
        ]);
        const el = svg.childNodes[0] as HTMLElement;
        expect(el.style.fill).toBe("none");
        expect(el.style.stroke).toBe("black");
    });
});

describe("createElement — g", () => {
    test("creates a g element with transform", () => {
        const svg = makeSvg();
        renderToSvg(svg, [{ type: "g", transform: "translate(10,20)", children: [] }]);
        const el = svg.childNodes[0] as Element;
        expect(el.tagName.toLowerCase()).toBe("g");
        expect(el.getAttribute("transform")).toBe("translate(10,20)");
    });

    test("recurses into children", () => {
        const svg = makeSvg();
        renderToSvg(svg, [
            {
                type: "g",
                children: [
                    { type: "circle", cx: 1, cy: 2, r: 3 },
                    { type: "text", x: 0, y: 0, content: "A" },
                ],
            },
        ]);
        const g = svg.childNodes[0] as Element;
        expect(g.childNodes.length).toBe(2);
        expect((g.childNodes[0] as Element).tagName.toLowerCase()).toBe("circle");
        expect((g.childNodes[1] as Element).tagName.toLowerCase()).toBe("text");
    });

    test("nests arbitrarily deep", () => {
        const svg = makeSvg();
        renderToSvg(svg, [
            {
                type: "g",
                children: [
                    {
                        type: "g",
                        children: [{ type: "circle", cx: 0, cy: 0, r: 5 }],
                    },
                ],
            },
        ]);
        const outer = svg.childNodes[0] as Element;
        const inner = outer.childNodes[0] as Element;
        const circle = inner.childNodes[0] as Element;
        expect(circle.tagName.toLowerCase()).toBe("circle");
    });
});
