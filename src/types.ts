import { z } from "zod";

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
