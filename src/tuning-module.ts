import * as d3 from "d3"
import * as events from "./events-module"
import * as music from "./music-module"

const guitarDots: Array<[number, number]> = [
    [3, 0], // [fret, position]
    [5, 0],
    [7, 0],
    [9, 0],
    [12, -1],
    [12, 1],
    [15, 0],
]

interface TuningInfo {
    readonly tuning: string
    readonly dots: Array<[number, number]>
    readonly description: string
}

const tunings: TuningInfo[] = [
    { tuning: "EADGBE", dots: guitarDots, description: "Guitar Standard" },
    { tuning: "EADGCF", dots: guitarDots, description: "All Fourths" },
    { tuning: "CGDAEB", dots: guitarDots, description: "All Fifths" },
    { tuning: "DADGBE", dots: guitarDots, description: "Guitar Drop D" },
    { tuning: "DADGAD", dots: guitarDots, description: "Celtic Tuning" },
    { tuning: "CGDAEA", dots: guitarDots, description: "Guitar Fripp NST" },
    { tuning: "EADG", dots: guitarDots, description: "Bass Standard" },
    { tuning: "DADG", dots: guitarDots, description: "Bass Drop D" },
    { tuning: "DGBD", dots: guitarDots, description: "Banjo" },
    { tuning: "DGBD", dots: guitarDots, description: "Cavaquinho" },
    { tuning: "GCEA", dots: guitarDots, description: "Ukulele C" },
    { tuning: "CGDA", dots: guitarDots, description: "Cello" },
    { tuning: "GDAE", dots: guitarDots, description: "Violin" },
    { tuning: "CGDA", dots: guitarDots, description: "Viola" },
]

function parseTuning(tuning: string): number[] {
    const result: number[] = []
    for (let i: number = 0; i < tuning.length; i++) {
        const noteChar = tuning.charAt(i)
        const natural = music.naturals.filter(x => x.label === noteChar)
        if (natural.length !== 1) {
            throw new Error("Invalid tuning char")
        }
        result.push(natural[0].index)
    }
    return result
}

export function init() {
    d3.select("#tuning-dropdown")
        .selectAll("div")
        .data(tunings)
        .enter()
        .append("div")
        .attr("class", "dropdown-content-item")
        .on("click", x => raiseTuningChangedEvent(x))
        .text(x => x.tuning + "   " + x.description)

    raiseTuningChangedEvent(tunings[0])
}

function raiseTuningChangedEvent(info: TuningInfo): void {
    const notes = parseTuning(info.tuning)

    events.tuningChange.publish({
        tuning: info.tuning,
        dots: info.dots,
        description: info.description,
        notes,
    })
}
