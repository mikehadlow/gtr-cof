import { notes } from "../../music";

const guitarDots: Array<[number, number]> = [
    [3, 0], // [fret, position]
    [5, 0],
    [7, 0],
    [9, 0],
    [12, -1],
    [12, 1],
    [15, 0],
];

// Viola/violin for beginners.
const violaDots: Array<[number, number]> = [
    [2, 0], // 1st finger
    [4, 0], // 2nd finger
    [5, 0], // 3rd finger
    [7, 0], // 4th finger
    [12, -1],
    [12, 1],
];

export type TuningInfo = {
    readonly tuning: string;
    readonly dots: Array<[number, number]>;
    readonly description: string;
    readonly octave?: number[];
};

export type StringInfo = {
    readonly index: number;
    readonly octave: number;
};

export type Tuning = {
    readonly index: number;
    readonly tuning: string;
    readonly dots: Array<[number, number]>;
    readonly description: string;
    readonly notes: Array<StringInfo>;
};

export const tuningInfos: Array<TuningInfo> = [
    { tuning: "EADGBE", dots: guitarDots, description: "Guitar Standard", octave: [2, 2, 3, 3, 3, 4] },
    { tuning: "EADGCF", dots: guitarDots, description: "All Fourths", octave: [2, 2, 3, 3, 4, 4] },
    { tuning: "CGDAEB", dots: guitarDots, description: "All Fifths", octave: [2, 2, 3, 3, 4, 4] },
    { tuning: "BFBFBF", dots: guitarDots, description: "Augmented Fourths", octave: [1, 2, 2, 3, 3, 4] },
    { tuning: "DADGBE", dots: guitarDots, description: "Guitar Drop D", octave: [2, 2, 3, 3, 3, 4] },
    { tuning: "DADGAD", dots: guitarDots, description: "Celtic", octave: [2, 2, 3, 3, 3, 4] },
    { tuning: "CGDAEG", dots: guitarDots, description: "Guitar Fripp NST", octave: [2, 2, 3, 3, 4, 4] },
    { tuning: "BEADGBE", dots: guitarDots, description: "Guitar 7 string", octave: [1, 2, 2, 3, 3, 3, 4] },
    { tuning: "DABEAB", dots: guitarDots, description: "Guitar Portuguese" },
    { tuning: "DGDGBD", dots: guitarDots, description: "Guitar Open G", octave: [2, 2, 3, 3, 3, 4] },
    { tuning: "EADGDG", dots: guitarDots, description: "Guitar Convert", octave: [2, 2, 3, 3, 4, 4] },
    { tuning: "E♭A♭D♭G♭B♭E♭", dots: guitarDots, description: "Guitar E♭ (Hendrix)", octave: [2, 2, 3, 3, 3, 4] },
    { tuning: "CFA♯D♯GC", dots: guitarDots, description: "C Standard", octave: [2, 2, 2, 3, 3, 4] },

    { tuning: "BEADF♯B", dots: guitarDots, description: "Baritone B", octave: [1, 2, 2, 3, 3, 3] },
    { tuning: "ADGCEA", dots: guitarDots, description: "Baritone A", octave: [1, 2, 2, 3, 3, 3] },

    { tuning: "EADG", dots: guitarDots, description: "Bass Standard", octave: [1, 1, 2, 2] },
    { tuning: "DADG", dots: guitarDots, description: "Bass Drop D", octave: [1, 1, 2, 2] },
    { tuning: "EADGC", dots: guitarDots, description: "Bass 5 Strings Standard High", octave: [1, 1, 2, 2, 3] },
    { tuning: "BEADG", dots: guitarDots, description: "Bass 5 Strings Standard Low", octave: [0, 1, 1, 2, 2] },
    { tuning: "BEADGC", dots: guitarDots, description: "Bass 6 Strings Standard", octave: [0, 1, 1, 2, 2, 3] },
    { tuning: "BEADGCF", dots: guitarDots, description: "Bass 7 Strings Standard", octave: [0, 1, 1, 2, 2, 3, 3] },

    { tuning: "DGBD", dots: guitarDots, description: "Banjo", octave: [3, 3, 3, 4] },
    { tuning: "DGBD", dots: guitarDots, description: "Cavaquinho" },
    { tuning: "GCEA", dots: guitarDots, description: "Ukulele C", octave: [4, 4, 4, 4] },
    { tuning: "CGDA", dots: violaDots, description: "Cello", octave: [2, 2, 3, 3] },
    { tuning: "GDAE", dots: violaDots, description: "Violin", octave: [3, 4, 4, 5] },
    { tuning: "CGDA", dots: violaDots, description: "Viola", octave: [3, 3, 4, 4] },
];

export const tunings: Array<Tuning> = buildTunings();

export function parseTuning(info: TuningInfo): Array<StringInfo> {
    const tokens: Array<string> = [];
    const result: Array<StringInfo> = [];

    let tokenIndex = 0;
    let lastWasChar = false;

    for (let i: number = 0; i < info.tuning.length; i++) {
        const noteChar = info.tuning.charAt(i);
        if ("ABCDEFG".indexOf(noteChar) >= 0) {
            tokens[tokenIndex] = noteChar;
            tokenIndex++;
            lastWasChar = true;
        } else if ("♯♭".indexOf(noteChar) >= 0 && lastWasChar) {
            tokens[tokenIndex - 1] = tokens[tokenIndex - 1] + noteChar;
            lastWasChar = false;
        } else {
            throw new Error("Invalid tuning char");
        }
    }

    if (info.octave !== undefined && info.octave.length !== tokens.length) {
        throw new Error("octave length must match number of strings");
    }

    for (let i = 0; i < tokens.length; i++) {
        const noteName = notes.filter((x) => x.name === tokens[i]);
        if (noteName.length !== 1) {
            throw new Error("Invalid token");
        }
        result.push({ index: noteName[0].index, octave: info.octave?.[i] ?? 3 });
    }

    return result;
}

function buildTunings(): Tuning[] {
    const tunings: Tuning[] = [];
    let index: number = 0;
    for (const info of tuningInfos) {
        const tuning: Tuning = {
            index: index,
            tuning: info.tuning,
            dots: info.dots,
            description: info.description,
            notes: parseTuning(info),
        };
        tunings.push(tuning);
        index++;
    }
    return tunings;
}
