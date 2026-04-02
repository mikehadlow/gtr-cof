export type RenderNode =
    | { type: "g"; transform?: string; children: RenderNode[] }
    | {
          type: "circle";
          cx: number;
          cy: number;
          r: number;
          class?: string;
          fill?: string;
          stroke?: string;
          strokeWidth?: number;
          pointerEvents?: string;
          onClick?: () => void;
      }
    | {
          type: "rect";
          x: number;
          y: number;
          width: number;
          height: number;
          class?: string;
          fill?: string;
          stroke?: string;
          strokeWidth?: number;
          onClick?: () => void;
      }
    | { type: "path"; d: string; class?: string; onClick?: () => void }
    | { type: "text"; x: number; y: number; class?: string; textAnchor?: string; transform?: string; content: string }
    | { type: "line"; x1: number; y1: number; x2: number; y2: number; stroke?: string; strokeWidth?: number }
    | {
          type: "use";
          href: string;
          x: number;
          y: number;
          width: number;
          height: number;
          style?: Record<string, string>;
      }
    | { type: "div"; class?: string; textContent?: string; onClick?: () => void; children?: RenderNode[] }
    | { type: "svgButton"; class: string; label: string; xPos: number; xSize: number; onClick: () => void };

// Arc math — D3 convention: angle 0 = 12 o'clock, clockwise.
// SVG coords: x = sin(a) * r,  y = -cos(a) * r

export function arcPath(innerR: number, outerR: number, startAngle: number, endAngle: number, padAngle = 0): string {
    const sa = startAngle + padAngle / 2;
    const ea = endAngle - padAngle / 2;
    const x1 = Math.sin(sa) * outerR,
        y1 = -Math.cos(sa) * outerR; // outer start
    const x2 = Math.sin(ea) * outerR,
        y2 = -Math.cos(ea) * outerR; // outer end
    const x3 = Math.sin(ea) * innerR,
        y3 = -Math.cos(ea) * innerR; // inner end
    const x4 = Math.sin(sa) * innerR,
        y4 = -Math.cos(sa) * innerR; // inner start
    const largeArc = ea - sa > Math.PI ? 1 : 0;
    return `M ${x1},${y1} A ${outerR},${outerR} 0 ${largeArc},1 ${x2},${y2} L ${x3},${y3} A ${innerR},${innerR} 0 ${largeArc},0 ${x4},${y4} Z`;
}

export function arcCentroid(innerR: number, outerR: number, startAngle: number, endAngle: number): [number, number] {
    const midAngle = (startAngle + endAngle) / 2;
    const midR = (innerR + outerR) / 2;
    return [Math.sin(midAngle) * midR, -Math.cos(midAngle) * midR];
}

// Reconciler — full rebuild strategy: clear container, recreate all elements.

const SVG_NS = "http://www.w3.org/2000/svg";

export function renderToSvg(container: Element, nodes: RenderNode[]): void {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (const node of nodes) {
        container.appendChild(createElement(node));
    }
}

function createElement(node: RenderNode): Element {
    switch (node.type) {
        case "g": {
            const el = document.createElementNS(SVG_NS, "g");
            if (node.transform) {
                el.setAttribute("transform", node.transform);
            }
            for (const child of node.children) {
                el.appendChild(createElement(child));
            }
            return el;
        }
        case "circle": {
            const el = document.createElementNS(SVG_NS, "circle");
            el.setAttribute("cx", String(node.cx));
            el.setAttribute("cy", String(node.cy));
            el.setAttribute("r", String(node.r));
            if (node.class) {
                el.setAttribute("class", node.class);
            }
            if (node.fill) {
                el.setAttribute("fill", node.fill);
            }
            if (node.stroke) {
                el.setAttribute("stroke", node.stroke);
            }
            if (node.strokeWidth != null) {
                el.setAttribute("stroke-width", String(node.strokeWidth));
            }
            if (node.pointerEvents) {
                el.setAttribute("pointer-events", node.pointerEvents);
            }
            if (node.onClick) {
                el.addEventListener("click", node.onClick);
            }
            return el;
        }
        case "rect": {
            const el = document.createElementNS(SVG_NS, "rect");
            el.setAttribute("x", String(node.x));
            el.setAttribute("y", String(node.y));
            el.setAttribute("width", String(node.width));
            el.setAttribute("height", String(node.height));
            if (node.class) {
                el.setAttribute("class", node.class);
            }
            if (node.fill) {
                el.setAttribute("fill", node.fill);
            }
            if (node.stroke) {
                el.setAttribute("stroke", node.stroke);
            }
            if (node.strokeWidth != null) {
                el.setAttribute("stroke-width", String(node.strokeWidth));
            }
            if (node.onClick) {
                el.addEventListener("click", node.onClick);
            }
            return el;
        }
        case "path": {
            const el = document.createElementNS(SVG_NS, "path");
            el.setAttribute("d", node.d);
            if (node.class) {
                el.setAttribute("class", node.class);
            }
            if (node.onClick) {
                el.addEventListener("click", node.onClick);
            }
            return el;
        }
        case "text": {
            const el = document.createElementNS(SVG_NS, "text");
            el.setAttribute("x", String(node.x));
            el.setAttribute("y", String(node.y));
            if (node.class) {
                el.setAttribute("class", node.class);
            }
            if (node.textAnchor) {
                el.setAttribute("text-anchor", node.textAnchor);
            }
            if (node.transform) {
                el.setAttribute("transform", node.transform);
            }
            el.textContent = node.content;
            return el;
        }
        case "line": {
            const el = document.createElementNS(SVG_NS, "line");
            el.setAttribute("x1", String(node.x1));
            el.setAttribute("y1", String(node.y1));
            el.setAttribute("x2", String(node.x2));
            el.setAttribute("y2", String(node.y2));
            if (node.stroke) {
                el.setAttribute("stroke", node.stroke);
            }
            if (node.strokeWidth != null) {
                el.setAttribute("stroke-width", String(node.strokeWidth));
            }
            return el;
        }
        case "use": {
            const el = document.createElementNS(SVG_NS, "use");
            el.setAttribute("href", node.href);
            el.setAttribute("x", String(node.x));
            el.setAttribute("y", String(node.y));
            el.setAttribute("width", String(node.width));
            el.setAttribute("height", String(node.height));
            if (node.style) {
                for (const [key, value] of Object.entries(node.style)) {
                    (el as unknown as HTMLElement).style.setProperty(key, value);
                }
            }
            return el;
        }
        case "div": {
            const el = document.createElement("div");
            if (node.class) {
                el.setAttribute("class", node.class);
            }
            if (node.textContent) {
                el.textContent = node.textContent;
            }
            if (node.onClick) {
                el.addEventListener("click", node.onClick);
            }
            for (const child of node.children ?? []) {
                el.appendChild(createElement(child));
            }
            return el;
        }
        case "svgButton": {
            const pad = 5;
            const xPad = 15;
            const width = 40;
            const buttonNodeTree = {
                type: "g" as const,
                transform: `translate(${node.xPos * (width + xPad)}, 0)`,
                children: [
                    {
                        type: "rect" as const,
                        x: pad,
                        y: 0,
                        width: width * node.xSize + xPad * (node.xSize - 1),
                        height: 25,
                        class: node.class,
                        onClick: node.onClick,
                    },
                    {
                        type: "text" as const,
                        x: pad + 10,
                        y: 17,
                        class: "tonic-text",
                        content: node.label,
                    },
                ],
            };
            return createElement(buttonNodeTree);
        }
        default: {
            const _exhaustiveCheck: never = node;
            return _exhaustiveCheck;
        }
    }
}

// icons references SVG icon ids defined in docs/index.html
export const icons = {
    gear: "#icon-gear",
} as const;

export function settingsIconNodes(svgWidth: number, onClick: () => void): RenderNode[] {
    const size = 25;
    const gearX = svgWidth - 30;
    const gearY = 0;
    return [
        {
            type: "g",
            children: [
                { type: "rect", x: gearX, y: gearY, width: size, height: size, fill: "transparent", onClick },
                {
                    type: "use",
                    href: icons.gear,
                    x: gearX,
                    y: gearY,
                    width: size,
                    height: size,
                    style: { fill: "none", stroke: "black", "pointer-events": "none" },
                },
            ],
        },
    ];
}
