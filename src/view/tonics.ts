import d3 from "d3";
import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { Svg, View, ViewContext } from "../types";
import type { RenderNode } from "../ui";

export const view: View<Model, Msg, Svg> = (model: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    if (ctx.init) {
        const pad = 5;
        const buttonHeight = 25;
        const svg = d3.select("#modes");

        const tonics = svg.append("g");

        const gs = tonics
            .selectAll("g")
            .data(music.naturals)
            .enter()
            .append("g")
            .attr("transform", (_d, i) => `translate(0, ${i * (buttonHeight + pad) + pad})`)
            .selectAll("g")
            .data((d) => bg(d), indexer)
            .enter()
            .append("g")
            .attr("transform", (_d, i) => `translate(${i * 55}, 0)`);

        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("strokeWidth", 2)
            .attr("width", 40)
            .attr("height", 25)
            .attr("class", (d) => (isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button"))
            .on("click", (d) => raise({ id: "TonicChanged", noteSpec: d.noteSpec }));

        gs.append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text((x) => x.noteSpec.label)
            .attr("class", "tonic-text");
    }

    const ds: Array<ButtonData> = [
        {
            noteSpec: music.createNoteSpec(model.state.naturalIndex, model.state.index),
        },
    ];
    buttons
        .data(ds, indexer)
        .attr("class", "tonic-button tonic-button-selected")
        .exit()
        .attr("class", (d) => (isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button"));
};

let buttons: d3.Selection<ButtonData>;

export function tonicsNodes(model: Model, raise: (msg: Msg) => void): RenderNode[] {
    const pad = 5;
    const buttonHeight = 25;
    const selectedNoteSpec = music.createNoteSpec(model.state.naturalIndex, model.state.index);

    const children: RenderNode[] = music.naturals.map((natural, i) => ({
        type: "g" as const,
        transform: `translate(0, ${i * (buttonHeight + pad) + pad})`,
        children: bg(natural).map((data, j) => ({
            type: "g" as const,
            transform: `translate(${j * 55}, 0)`,
            children: [
                {
                    type: "rect" as const,
                    x: pad,
                    y: 0,
                    width: 40,
                    height: buttonHeight,
                    class: tonicButtonClass(data.noteSpec, selectedNoteSpec),
                    onClick: () => raise({ id: "TonicChanged", noteSpec: data.noteSpec }),
                },
                {
                    type: "text" as const,
                    x: pad + 10,
                    y: 17,
                    class: "tonic-text",
                    content: data.noteSpec.label,
                },
            ],
        })),
    }));

    return [{ type: "g", children }];
}

function tonicButtonClass(noteSpec: music.NoteSpec, selectedNoteSpec: music.NoteSpec): string {
    if (noteSpec.label === selectedNoteSpec.label) return "tonic-button tonic-button-selected";
    if (isSameNoteAsNatural(noteSpec)) return "tonic-button tonic-button-grey";
    return "tonic-button";
}

type ButtonData = {
    readonly noteSpec: music.NoteSpec;
};

function bg(natural: music.Natural): Array<ButtonData> {
    const flatIndex = natural.index === 0 ? 11 : natural.index - 1;
    const sharpIndex = (natural.index + 1) % 12;
    return [
        { noteSpec: music.createNoteSpec(natural.index, flatIndex) },
        { noteSpec: music.createNoteSpec(natural.index, natural.index) },
        { noteSpec: music.createNoteSpec(natural.index, sharpIndex) },
    ];
}

function indexer(d: ButtonData): string {
    return d.noteSpec.label;
}

function isSameNoteAsNatural(noteSpec: music.NoteSpec): boolean {
    return music.naturals.some((x) => x.index === noteSpec.index && x.index !== noteSpec.natural.index);
}
