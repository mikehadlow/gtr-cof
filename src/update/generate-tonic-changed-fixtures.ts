import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import * as music from "../music";
import { Update } from "./update-tonic-changed";
import { type State } from "../types";
import { type Model } from "../model";

// Build a fresh input model with diatonic scale family, zero toggles.
function makeInputModel(): Model {
    const state: State = {
        index: 3,
        naturalIndex: 3,
        chordIndex: -1,
        chordIntervals: [0, 2, 4],
        toggledIndexes: 0,
        scaleFamilyIndex: 0, // diatonic
        modeIndex: 0,
        midiToggledIndexes: 0,
        isLeftHanded: false,
        isNutFlipped: false,
        fretboardLabelType: "NoteName",
        circleIsCNoon: true,
        tuningIndex: 0,
    };

    // music field isn't read by the Update function, but we need a valid Model shape.
    // Generate a real one so the type is satisfied.
    const scaleFamily = music.scaleFamily[0];
    const mode = scaleFamily.modes.find(x => x.index === 0)!;
    const noteSpec = music.createNoteSpec(state.naturalIndex, state.index);
    const nodes = music.generateScaleShim(
        noteSpec, mode, state.chordIndex, state.chordIntervals,
        state.toggledIndexes, state.midiToggledIndexes, scaleFamily
    );

    return {
        music: { nodes, mode },
        state,
    };
}

// Every valid TonicChanged message: for each natural A..G, flat/natural/sharp.
const variants: { natural: music.Natural; offset: number; suffix: string }[] = [];
for (const nat of music.naturals) {
    variants.push({ natural: nat, offset: -1, suffix: "flat" });
    variants.push({ natural: nat, offset: 0,  suffix: "natural" });
    variants.push({ natural: nat, offset: 1,  suffix: "sharp" });
}

const outDir = join(import.meta.dir, "test-artifacts", "tonic-changed");
mkdirSync(outDir, { recursive: true });

for (const v of variants) {
    const noteIndex = (v.natural.index + v.offset + 12) % 12;
    const noteSpec = music.createNoteSpec(v.natural.index, noteIndex);

    const msg = { id: "TonicChanged" as const, noteSpec };
    const model = makeInputModel();
    const result = Update(model, msg);

    const filename = `${v.natural.label}-${v.suffix}.json`;
    writeFileSync(join(outDir, filename), JSON.stringify(result, null, 2) + "\n");
    console.log(`wrote ${filename}`);
}

console.log("done – generated", variants.length, "fixtures");
