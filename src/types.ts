import { z } from "zod";

// Elm inspired architectural types

// Takes a message and the existing model, returns an updated model.
export type Update<TModel, TMsg> = (model: TModel, msg: TMsg) => TModel;

// Takes the model and a function to raise a message and outputs TRenderNodes that represent the UI.
export type View<TModel, TMsg, TRenderNode> = (model: TModel, raise: (msg: TMsg) => void) => TRenderNode[];

// Takes a message and the existing model, raises new messages via the raise function
// Does not modify the model.
export type Service<TModel, TMsg, TRaiseMsg> = (model: TModel, msg: TMsg, raise: (msg: TRaiseMsg) => void) => void;

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
    sound: z.boolean(),
});

export type State = z.infer<typeof StateSchema>;

export type Svg = undefined;
