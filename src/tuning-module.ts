namespace tuning {

    let guitarDots: Array<[number, number]> = [
        [3, 0], // [fret, position]
        [5, 0],
        [7, 0],
        [9, 0],
        [12, -1],
        [12, 1],
        [15, 0]
    ];

    // Viola/violin for beginners.
    let violaDots: Array<[number, number]> = [
        [2, 0],   // 1st finger
        [4, 0],   // 2nd finger
        [5, 0],   // 3rd finger
        [7, 0],   // 4th finger
        [12, -1],
        [12, 1]
    ];

    interface TuningInfo {
        readonly tuning: string;
        readonly dots: Array<[number, number]>;
        readonly description: string;
    }

    export interface Tuning {
        readonly index: number;
        readonly tuning: string;
        readonly dots: Array<[number, number]>;
        readonly description: string;
        readonly notes: Array<number>;
    }

    let tuningInfos: Array<TuningInfo> = [
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

        { tuning: "EADG", dots: guitarDots, description: "Bass Standard" },
        { tuning: "DADG", dots: guitarDots, description: "Bass Drop D" },
        { tuning: "EADGC", dots: guitarDots, description: "Bass 5 Strings Standard High" },
        { tuning: "BEADG", dots: guitarDots, description: "Bass 5 Strings Standard Low" },
        { tuning: "BEADGC", dots: guitarDots, description: "Bass 6 Strings Standard" },

        { tuning: "DGBD", dots: guitarDots, description: "Banjo" },
        { tuning: "DGBD", dots: guitarDots, description: "Cavaquinho"},
        { tuning: "GCEA", dots: guitarDots, description: "Ukulele C" },
        { tuning: "CGDA", dots: violaDots, description: "Cello" },
        { tuning: "GDAE", dots: violaDots, description: "Violin" },
        { tuning: "CGDA", dots: violaDots, description: "Viola" },
    ]

    export let tunings: Array<Tuning> = [];

    export function parseTuning(tuning: string) : Array<number> {
        let tokens: Array<string> = [];
        let result: Array<number> = [];

        let tokenIndex = 0;
        let lastWasChar = false;

        for(let i:number =0; i < tuning.length; i++) {
            let noteChar = tuning.charAt(i);
            if("ABCDEFG".indexOf(noteChar) >= 0) {
                tokens[tokenIndex] = noteChar;
                tokenIndex++;
                lastWasChar = true;
            }
            else if("♯♭".indexOf(noteChar) >= 0 && lastWasChar) {
                tokens[tokenIndex-1] = tokens[tokenIndex-1] + noteChar;
                lastWasChar = false;
            }
            else {
                throw "Invalid tuning char";
            }
        }

        for(let token of tokens){
            let noteName = music.noteNames.filter(x => x.name === token);
            if(noteName.length != 1) {
                throw "Invalid token";
            }
            result.push(noteName[0].index);
        }

        return result;
    }

    export function init() {

        let index: number = 0;
        for(let info of tuningInfos) {
            let tuning: Tuning = {
                index: index,
                tuning: info.tuning,
                dots: info.dots,
                description: info.description,
                notes: parseTuning(info.tuning)
            };
            tunings.push(tuning);
            index++;
        }

        d3.select("#tuning-dropdown")
            .selectAll("div")
            .data(tunings)
            .enter()
            .append("div")
            .attr("class", "dropdown-content-item")
            .on("click", x => raiseTuningChangedEvent(x))
            .text(x => x.tuning + "   " + x.description);
        
        raiseTuningChangedEvent(tunings[0]);
    }

    function raiseTuningChangedEvent(tuning: Tuning): void{
        events.tuningChange.publish({
            tuning: tuning
        });
    }
}
