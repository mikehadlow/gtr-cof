import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { RenderNode } from "../ui";

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

function isSameNoteAsNatural(noteSpec: music.NoteSpec): boolean {
    return music.naturals.some((x) => x.index === noteSpec.index && x.index !== noteSpec.natural.index);
}
