namespace tuning {

    export interface TuningInfo {
        readonly tuning: string;
        readonly dots: Array<[number, number]>;
        readonly description: string;
    }

    export let guitarDots: Array<[number, number]> = [
        [3, 0], // [fret, position]
        [5, 0],
        [7, 0],
        [9, 0],
        [12, -1],
        [12, 1],
        [15, 0]
    ];

    export let tunings: Array<TuningInfo> = [
        { tuning: "EADGBE", dots: guitarDots, description: "Guitar Standard" },
        { tuning: "DADGBE", dots: guitarDots, description: "Guitar Drop D" },
        { tuning: "DADGAD", dots: guitarDots, description: "Guitar" },
        { tuning: "EADG", dots: guitarDots, description: "Bass Standard" },
        { tuning: "DADG", dots: guitarDots, description: "Bass Drop D" },
        { tuning: "GCEA", dots: guitarDots, description: "Ukelele C" },
    ]

    export function parseTuning(tuning: string) : Array<number> {
        let result: Array<number> = [];
        for(let i: number = 0; i < tuning.length; i++){
            let noteChar = tuning.charAt(i);
            if(music.notes[noteChar] != null) {
                result.push(music.notes[noteChar]);
            }
        }
        return result;
    }

    export function init() {
        d3.select("#tuning-dropdown")
            .selectAll("div")
            .data(tunings)
            .enter()
            .append("div")
            .attr("class", "dropdown-content-item")
            .on("click", x => gtr.init(x))
            .text(x => x.tuning + "   " + x.description);
    }
}