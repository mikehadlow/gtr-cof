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
    | {
          type: "text";
          x: number;
          y: number;
          class?: string;
          textAnchor?: string;
          dominantBaseline?: string;
          transform?: string;
          content: string;
      }
    | {
          type: "line";
          class?: string;
          x1: number;
          y1: number;
          x2: number;
          y2: number;
          stroke?: string;
          strokeWidth?: number;
      }
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
    // Below are meta-nodes that render low level nodes above
    | { type: "svgButton"; class: string; label: string; xPos: number; xSize: number; onClick: () => void }
    | { type: "buttonRow"; row: number; children: RenderNode[] }
    | {
          type: "segment";
          class: string;
          label: string;
          labelClass: string;
          radius: { inner: number; outer: number };
          angle: { start: number; end: number };
          selection?: { class: string; fill?: string };
          rouding?: CornerRounding;
          onClick: () => void;
      };

export type CornerRounding = {
    outerStart: boolean;
    outerEnd: boolean;
    innerStart: boolean;
    innerEnd: boolean;
};

// Arc math — D3 convention: angle 0 = 12 o'clock, clockwise.
// SVG coords: x = sin(a) * r,  y = -cos(a) * r

export function arcPath(
    innerR: number,
    outerR: number,
    startAngle: number,
    endAngle: number,
    padAngle = 0,
    rounding?: CornerRounding,
): string {
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

    if (!rounding) {
        return `M ${x1},${y1} A ${outerR},${outerR} 0 ${largeArc},1 ${x2},${y2} L ${x3},${y3} A ${innerR},${innerR} 0 ${largeArc},0 ${x4},${y4} Z`;
    }

    // Corner rounding radius in SVG units.
    const cr = 10;

    // Each corner has an incoming and outgoing unit tangent vector along the path.
    // arc_start = corner - cr * t_in  (cr before the corner)
    // arc_end   = corner + cr * t_out (cr after the corner)
    // All four corners turn the same way (cross product = 1), so all corner arcs use sweep=1.
    //
    // Tangent conventions (x = sin(a)*r, y = -cos(a)*r):
    //   CW tangent at a:     ( cos(a),  sin(a))
    //   CCW tangent at a:    (-cos(a), -sin(a))
    //   Outward radial at a: ( sin(a), -cos(a))
    //   Inward radial at a:  (-sin(a),  cos(a))

    // outerStart (x1,y1): incoming = outward radial at sa, outgoing = CW tangent at sa
    const os0x = x1 - cr * Math.sin(sa),
        os0y = y1 + cr * Math.cos(sa); // on close-line, cr before corner
    const os1x = x1 + cr * Math.cos(sa),
        os1y = y1 + cr * Math.sin(sa); // on outer arc,  cr after corner

    // outerEnd (x2,y2): incoming = CW tangent at ea, outgoing = inward radial at ea
    const oe0x = x2 - cr * Math.cos(ea),
        oe0y = y2 - cr * Math.sin(ea); // on outer arc,    cr before corner
    const oe1x = x2 - cr * Math.sin(ea),
        oe1y = y2 + cr * Math.cos(ea); // on radial line,  cr after corner

    // innerEnd (x3,y3): incoming = inward radial at ea, outgoing = CCW tangent at ea
    const ie0x = x3 + cr * Math.sin(ea),
        ie0y = y3 - cr * Math.cos(ea); // on radial line,  cr before corner
    const ie1x = x3 - cr * Math.cos(ea),
        ie1y = y3 - cr * Math.sin(ea); // on inner arc,    cr after corner

    // innerStart (x4,y4): incoming = CCW tangent at sa, outgoing = outward radial at sa
    const is0x = x4 + cr * Math.cos(sa),
        is0y = y4 + cr * Math.sin(sa); // on inner arc,    cr before corner
    const is1x = x4 + cr * Math.sin(sa),
        is1y = y4 - cr * Math.cos(sa); // on close-line,   cr after corner

    const { outerStart, outerEnd, innerStart, innerEnd } = rounding;
    const ca = (r: number, x: number, y: number) => ` A ${r},${r} 0 0,1 ${x},${y}`; // corner arc helper

    // Path starts at outerStart (or its arc-end if rounded), then:
    //   outer arc → outerEnd corner → radial line → innerEnd corner → inner arc → innerStart corner → close line → outerStart corner → Z
    let d = `M ${outerStart ? `${os1x},${os1y}` : `${x1},${y1}`}`;
    d += ` A ${outerR},${outerR} 0 ${largeArc},1 ${outerEnd ? `${oe0x},${oe0y}` : `${x2},${y2}`}`;
    if (outerEnd) {
        d += ca(cr, oe1x, oe1y);
    }
    d += ` L ${innerEnd ? `${ie0x},${ie0y}` : `${x3},${y3}`}`;
    if (innerEnd) {
        d += ca(cr, ie1x, ie1y);
    }
    d += ` A ${innerR},${innerR} 0 ${largeArc},0 ${innerStart ? `${is0x},${is0y}` : `${x4},${y4}`}`;
    if (innerStart) {
        d += ca(cr, is1x, is1y);
    }
    if (outerStart) {
        d += ` L ${os0x},${os0y}${ca(cr, os1x, os1y)}`;
    }
    d += ` Z`;

    return d;
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
        for (const element of createElement(node)) {
            container.appendChild(element);
        }
    }
}

function createElement(node: RenderNode): Element[] {
    switch (node.type) {
        case "g": {
            const el = document.createElementNS(SVG_NS, "g");
            if (node.transform) {
                el.setAttribute("transform", node.transform);
            }
            for (const child of node.children) {
                for (const element of createElement(child)) {
                    el.appendChild(element);
                }
            }
            return [el];
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
            return [el];
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
            return [el];
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
            return [el];
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
            if (node.dominantBaseline) {
                el.setAttribute("dominant-baseline", node.dominantBaseline);
            }
            if (node.transform) {
                el.setAttribute("transform", node.transform);
            }
            el.textContent = node.content;
            return [el];
        }
        case "line": {
            const el = document.createElementNS(SVG_NS, "line");
            el.setAttribute("x1", String(node.x1));
            el.setAttribute("y1", String(node.y1));
            el.setAttribute("x2", String(node.x2));
            el.setAttribute("y2", String(node.y2));
            if (node.class) {
                el.setAttribute("class", node.class);
            }
            if (node.stroke) {
                el.setAttribute("stroke", node.stroke);
            }
            if (node.strokeWidth != null) {
                el.setAttribute("stroke-width", String(node.strokeWidth));
            }
            return [el];
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
            return [el];
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
                for (const element of createElement(child)) {
                    el.appendChild(element);
                }
            }
            return [el];
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
        case "buttonRow": {
            const pad = 5;
            const buttonHeight = 25;
            const buttonRowTree = {
                type: "g" as const,
                transform: `translate(0, ${node.row * (buttonHeight + pad) + pad})`,
                children: node.children,
            };
            return createElement(buttonRowTree);
        }
        case "segment": {
            const [x, y] = arcCentroid(node.radius.inner, node.radius.outer, node.angle.start, node.angle.end);
            const rounding: CornerRounding = node.rouding || {
                outerStart: false,
                outerEnd: false,
                innerEnd: false,
                innerStart: false,
            };
            const path = createElement({
                type: "g" as const,
                children: [
                    {
                        type: "path" as const,
                        d: arcPath(node.radius.inner, node.radius.outer, node.angle.start, node.angle.end, 0, rounding),
                        class: node.class,
                        onClick: node.onClick,
                    },
                ],
            });
            const selectionElements: Element[] = node.selection
                ? createElement({
                      type: "g" as const,
                      children: [
                          {
                              type: "circle" as const,
                              cx: x,
                              cy: y,
                              r: 25,
                              class: node.selection.class,
                              fill: node.selection.fill,
                              stroke: "var(--color-segment-stroke)",
                              strokeWidth: 2,
                              pointerEvents: "none",
                          },
                      ],
                  })
                : [];
            const text = createElement({
                type: "g" as const,
                children: [
                    {
                        type: "text" as const,
                        x,
                        y,
                        class: node.labelClass,
                        textAnchor: "middle",
                        dominantBaseline: "central",
                        content: node.label,
                    },
                ],
            });
            return [...path, ...selectionElements, ...text];
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
                    style: { fill: "none", stroke: "var(--color-segment-stroke)", "pointer-events": "none" },
                },
            ],
        },
    ];
}
