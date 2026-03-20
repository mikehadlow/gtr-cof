import d3 from "d3";
import type { Msg } from "../message";
import type { Model } from "../model";
import * as music from "../music";
import type { Svg, View, ViewContext } from "../types";

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

type TuningInfo = {
    readonly tuning: string;
    readonly dots: Array<[number, number]>;
    readonly description: string;
};

export type Tuning = {
    readonly index: number;
    readonly tuning: string;
    readonly dots: Array<[number, number]>;
    readonly description: string;
    readonly notes: Array<number>;
};

const tuningInfos: Array<TuningInfo> = [
    { tuning: "EADGBE", dots: guitarDots, description: "Guitar Standard" },
    { tuning: "EADGCF", dots: guitarDots, description: "All Fourths" },
    { tuning: "CGDAEB", dots: guitarDots, description: "All Fifths" },
    { tuning: "BFBFBF", dots: guitarDots, description: "Augmented Fourths" },
    { tuning: "DADGBE", dots: guitarDots, description: "Guitar Drop D" },
    { tuning: "DADGAD", dots: guitarDots, description: "Celtic" },
    { tuning: "CGDAEG", dots: guitarDots, description: "Guitar Fripp NST" },
    { tuning: "BEADGBE", dots: guitarDots, description: "Guitar 7 string" },
    { tuning: "DABEAB", dots: guitarDots, description: "Guitar Portuguese" },
    { tuning: "DGDGBD", dots: guitarDots, description: "Guitar Open G" },
    { tuning: "EADGDG", dots: guitarDots, description: "Guitar Convert" },
    { tuning: "E♭A♭D♭G♭B♭E♭", dots: guitarDots, description: "Guitar E♭ (Hendrix)" },

    { tuning: "BEADF♯B", dots: guitarDots, description: "Baritone B" },
    { tuning: "ADGCEA", dots: guitarDots, description: "Baritone A" },

    { tuning: "EADG", dots: guitarDots, description: "Bass Standard" },
    { tuning: "DADG", dots: guitarDots, description: "Bass Drop D" },
    { tuning: "EADGC", dots: guitarDots, description: "Bass 5 Strings Standard High" },
    { tuning: "BEADG", dots: guitarDots, description: "Bass 5 Strings Standard Low" },
    { tuning: "BEADGC", dots: guitarDots, description: "Bass 6 Strings Standard" },
    { tuning: "BEADGCF", dots: guitarDots, description: "Bass 7 Strings Standard" },

    { tuning: "DGBD", dots: guitarDots, description: "Banjo" },
    { tuning: "DGBD", dots: guitarDots, description: "Cavaquinho" },
    { tuning: "GCEA", dots: guitarDots, description: "Ukulele C" },
    { tuning: "CGDA", dots: violaDots, description: "Cello" },
    { tuning: "GDAE", dots: violaDots, description: "Violin" },
    { tuning: "CGDA", dots: violaDots, description: "Viola" },
];

export const tunings: Array<Tuning> = buildTunings();

function parseTuning(tuning: string): Array<number> {
    const tokens: Array<string> = [];
    const result: Array<number> = [];

    let tokenIndex = 0;
    let lastWasChar = false;

    for (let i: number = 0; i < tuning.length; i++) {
        const noteChar = tuning.charAt(i);
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

    for (const token of tokens) {
        const noteName = music.noteNames.filter((x) => x.name === token);
        if (noteName.length !== 1) {
            throw new Error("Invalid token");
        }
        result.push(noteName[0].index);
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
            notes: parseTuning(info.tuning),
        };
        tunings.push(tuning);
        index++;
    }
    return tunings;
}

export const view: View<Model, Msg, Svg> = (_: Model, ctx: ViewContext, raise: (msg: Msg) => void): Svg => {
    const raiseTuningChangedEvent = (tuning: Tuning): void => {
        raise({
            id: "TuningChanged",
            index: tuning.index,
        });
    };
    if (ctx.init) {
        d3.select("#tuning-dropdown")
            .selectAll("div")
            .data(tunings)
            .enter()
            .append("div")
            .attr("class", "dropdown-content-item")
            .on("click", raiseTuningChangedEvent)
            .text((x) => `${x.tuning}   ${x.description}`);
    }
};
