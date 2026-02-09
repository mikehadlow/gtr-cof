import { z } from "zod";

// Elm inspired architectural types

export type Init<TModel> = () => TModel;

export type Update<TModel, TMsg> = (model: TModel, msg: TMsg) => TModel;

export type View<TModel, TMsg, TSvg> = (model: TModel, raise: (msg: TMsg) => void) => TSvg;

// State

export const FretboardLabelTypeSchema = z.enum(["None", "NoteName", "Interval"]);
export type FretboardLabelType = z.infer<typeof FretboardLabelTypeSchema>;

export const StateSchema = z.object({
    index: z.number(),
    naturalIndex: z.number(),
    chordIndex: z.number(),
    chordIntervals: z.array(z.number()),
    toggledIndexes: z.number(),
    scaleFamilyIndex: z.number(),
    modeIndex: z.number(),
    midiToggledIndexes: z.number(),
    isLeftHanded: z.boolean(),
    isNutFlipped: z.boolean(),
    fretboardLabelType: FretboardLabelTypeSchema,
    circleIsCNoon: z.boolean(),
    tuningIndex: z.number(),
});

export type State = z.infer<typeof StateSchema>;
