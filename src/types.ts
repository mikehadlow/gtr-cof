import { z } from "zod";

// Elm inspired architectural types

export type Update<TModel, TMsg> = (model: TModel, msg: TMsg) => TModel;

export type ViewContext = {
    readonly init: boolean;
}

export type View<TModel, TMsg, TSvg> = (model: TModel, ctx: ViewContext, raise: (msg: TMsg) => void) => TSvg;

// State

export const FretboardLabelTypeSchema = z.enum(["None", "NoteName", "Interval"]);
export type FretboardLabelType = z.infer<typeof FretboardLabelTypeSchema>;

export const ModalStateSchema = z.enum(["closed", "guitar-settings", "circle-settings"]);
export type ModalState = z.infer<typeof ModalStateSchema>;

export const StateSchema = z.object({
    index: z.number(),
    naturalIndex: z.number(),
    chordIndex: z.number(),
    chordIntervals: z.array(z.number()),
    toggledNotesBitmask: z.number(),
    scaleFamilyIndex: z.number(),
    modeIndex: z.number(),
    midiToggledNotesBitmask: z.number(),
    isLeftHanded: z.boolean(),
    isNutFlipped: z.boolean(),
    fretboardLabelType: FretboardLabelTypeSchema,
    circleIsCNoon: z.boolean(),
    tuningIndex: z.number(),
    modalState: ModalStateSchema,
});

export type State = z.infer<typeof StateSchema>;

export type Svg = void;
