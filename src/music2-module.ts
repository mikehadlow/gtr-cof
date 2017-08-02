
namespace music2 {

    export enum IntervalType {
        Nat,
        Maj,
        Min,
        Aug,
        Dim
    };

    export let intervalName: {[key: string]: string} = {};
    intervalName[IntervalType.Nat] = "";
    intervalName[IntervalType.Maj] = "M";
    intervalName[IntervalType.Min] = "m";
    intervalName[IntervalType.Aug] = "A";
    intervalName[IntervalType.Dim] = "d";

    export interface Interval {
        readonly ord: number;
        readonly type: IntervalType;
    };

    export let getIntervalName: (x: Interval) => string = interval => intervalName[interval.type] + (interval.ord + 1); 

    export let intervals: mod.Mod<Interval[]> = new mod.Mod([
        [{ ord: 0, type: IntervalType.Nat }, { ord: 1, type: IntervalType.Dim }],
        [{ ord: 1, type: IntervalType.Min }, { ord: 0, type: IntervalType.Aug }],
        [{ ord: 1, type: IntervalType.Maj }, { ord: 2, type: IntervalType.Dim }],
        [{ ord: 2, type: IntervalType.Min }, { ord: 1, type: IntervalType.Aug }],
        [{ ord: 2, type: IntervalType.Maj }, { ord: 3, type: IntervalType.Dim }],
        [{ ord: 3, type: IntervalType.Nat }, { ord: 2, type: IntervalType.Aug }],
        [{ ord: 4, type: IntervalType.Dim }, { ord: 3, type: IntervalType.Aug }],
        [{ ord: 4, type: IntervalType.Nat }, { ord: 5, type: IntervalType.Dim }],
        [{ ord: 5, type: IntervalType.Min }, { ord: 4, type: IntervalType.Aug }],
        [{ ord: 5, type: IntervalType.Maj }, { ord: 6, type: IntervalType.Dim }],
        [{ ord: 6, type: IntervalType.Min }, { ord: 5, type: IntervalType.Aug }],
        [{ ord: 6, type: IntervalType.Maj }, { ord: 0, type: IntervalType.Dim }],
    ]);

    // root diatonic scale is major
    export let diatonic: mod.Mod<boolean> = new mod.Mod([true, false, true, false, true, true, false, true, false, true, false, true]);
    export let indexList: mod.Mod<number> = new mod.Mod([0,1,2,3,4,5,6,7,8,9,10,11]);

    // fixed index:
    // 0  1  2  3  4  5  6  7  8  9  10 11 
    // A     B  C     D     E  F     G
    export enum NoteName { A=0, B=2, C=3, D=5, E=7, F=8, G=10 };

    export let noteList: mod.Mod<NoteName> = new mod.Mod([
        NoteName.A,
        NoteName.B,
        NoteName.C,
        NoteName.D,
        NoteName.E,
        NoteName.F,
        NoteName.G,
    ]);

    export let noteIndex: number[] = [];
    noteIndex[NoteName.A] = 0;
    noteIndex[NoteName.B] = 1;
    noteIndex[NoteName.C] = 2;
    noteIndex[NoteName.D] = 3;
    noteIndex[NoteName.E] = 4;
    noteIndex[NoteName.F] = 5;
    noteIndex[NoteName.G] = 6;

    interface NoteLabel {
        readonly offset: number;
        readonly label: string;
    }

    let noteLabels: Array<NoteLabel> = [
        { offset: 0, label: '' },
        { offset: 1, label: '♯' },
        { offset: 2, label: 'x' },
        { offset: -1, label: '♭' },
        { offset: -2, label: '♭♭' },
    ];

    export interface Mode {
        readonly name: string;
        readonly index: number;
    };

    export let modes: Array<Mode> = [
        { name: 'Lydian', index: 5 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 7 },
        { name: 'Dorian', index: 2 },
        { name: 'N Minor / Aeolian', index: 9 },
        { name: 'Phrygian', index: 4 },
        { name: 'Locrian', index: 11 },
    ];

    export interface ScaleNote {
        readonly index: number;
        readonly label: string;
        readonly interval: Interval;
        readonly intervalName: string;
        readonly isScaleNote: boolean;
        readonly noteNumber: number;
        readonly diatonicOffset: number;
        chordNumber?: string;
    };

    export interface ScaleNoteWithChordNumbers extends ScaleNote {
        readonly chordNumber: string;
    }

    export interface Node {
        readonly scaleNote: ScaleNote;
        readonly chordInterval: Interval;
    }

    export let nullNode: Node = {
        scaleNote: {
            chordNumber: "",
            diatonicOffset: 0,
            index: 0,
            interval: {
                ord: 0,
                type: 0
            },
            intervalName: "",
            isScaleNote: false,
            label: "",
            noteNumber: 0
        },
        chordInterval: {
            ord: 0,
            type: 0
        }
    };

    export function generateScaleShim(noteBase: music.NoteBase, index: number, mode: music.Mode): Node[] {
        let note = (noteBase.index + 3) % 12;
        let newIndex = (index + 3) % 12;
        let newMode = modes.filter(x => x.name === mode.name)[0];

        let scale = generateScale(newIndex, note, newMode);

        console.log(scale.filter(x => x.isScaleNote).map(x => x.label + " ").join())

        let chordNumbers = generateChordNumbers(scale);
        mod.zip(scale, chordNumbers).forEach(x => x[0].chordNumber = x[1]);
        return generateNodes(scale);
    }

    export function generateScale(index: number, note: NoteName, mode: Mode): ScaleNote[] {
        let scale: ScaleNote[] = [];
        indexList.setStart(index);
        diatonic.setStart(mode.index);        
        noteList.setStart(noteIndex[note]);
        intervals.setStart(0);
        let workingSet = indexList.merge3(buildScaleCounter(diatonic.toArray()), intervals.toArray());

        let getLabel = (index:number, noteNum:number) => {
            let noteIndex = noteList.itemAt(noteNum);
            let offset = mod.diff(12, noteIndex, index);
            let noteLabel = noteLabels.filter(x => x.offset === offset)[0];
            return NoteName[noteList.itemAt(noteNum)] + noteLabel.label;
        }

        return workingSet.map(item => {
            let index = item[0];
            let isScaleNote = item[1][0];
            let noteNumber = item[1][1];
            let activeInterval = isScaleNote
                ? item[2].filter(x => x.ord == noteNumber)[0]
                : item[2][0];
            let label = isScaleNote 
                ? getLabel(index, noteNumber) 
                : getLabel(index, activeInterval.ord);

            // console.log("index: " + index + ", isScaleNote: " + isScaleNote + ", scaleCounter: " 
            //     + noteNumber + ", label: " + label + ", interval: " + getIntervalName(activeInterval))

            return {
                index: index,
                label: label,
                interval: activeInterval,
                intervalName: getIntervalName(activeInterval),
                isScaleNote: isScaleNote,
                noteNumber: noteNumber,
                diatonicOffset: mode.index
            };
        });
    }

    // generateNodes creates an 'outer' sliding interval ring that can change with
    // chord selections.
    export function generateNodes(scaleNotes: ScaleNote[], chordIndex: number = 0): Node[] {
        let chordIndexOffset = ((chordIndex + 12) - scaleNotes[0].index) % 12;
        intervals.setStart(12 - chordIndexOffset);
        diatonic.setStart(scaleNotes[0].diatonicOffset);
        let startAt = scaleNotes.filter(x => x.index === chordIndex)[0].noteNumber;
        let workingSet = intervals.merge3(
            scaleNotes,
            buildScaleCounter(diatonic.toArray(), startAt));

        return workingSet.map(item => {
            let chordIntervalCandidates = item[0];
            let scaleNote = item[1];
            let scaleCounter = item[2];
            let activeInterval = scaleNote.isScaleNote
                ? chordIntervalCandidates.filter(x => x.ord === scaleCounter[1])[0]
                : chordIntervalCandidates[0];

            // console.log("index: " + scaleNote.index + ", isScaleNote: " + scaleNote.isScaleNote +
            //     ", note: " + scaleNote.label + ", interval: " + scaleNote.intervalName + " -> " + 
            //     getIntervalName(activeInterval) +
            //     ", scaleCount: " + scaleNote.noteNumber + " -> " + scaleCounter[1]);

            return {
                scaleNote: scaleNote,
                chordInterval: activeInterval
            };
        });
    }

    function buildScaleCounter(diatonic: boolean[], startAt:number = 0): [boolean, number][] {
        let noteCount = diatonic.filter(x => x).length;
        let i=(noteCount - startAt) % noteCount;
        return diatonic.map(isNote => {
            if(isNote) {
                let value = <[boolean, number]>[true, i];
                i = (i+1) % noteCount;
                return value;
            }
            return <[boolean, number]>[false, 0];
        });
    }

    let romanNumeral: Array<string> = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

    export function generateChordNumbers(scaleNotes: ScaleNote[]): string[] {
        return scaleNotes.map((scaleNote, i) => {
            if(scaleNote.isScaleNote) {
                let roman = romanNumeral[scaleNote.noteNumber];
                let nodes = generateNodes(scaleNotes, scaleNote.index);
                let diminished = "";
                let seventh = "";
                // does it have a diminished 5th?
                if(nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 4 && x.chordInterval.type === IntervalType.Dim)) {
                    diminished = "°";
                }
                // does it have a major 3rd?
                if(nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 2 && x.chordInterval.type === IntervalType.Maj)) {
                    roman = roman.toLocaleUpperCase();
                }
                // does it have a natural 7th?
                if(nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 6 && x.chordInterval.type === IntervalType.Min)) {
                    seventh = "7";
                }
                // does it have a major 7th?
                if(nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 6 && x.chordInterval.type === IntervalType.Maj)) {
                    seventh = "maj7";
                }
                return roman + diminished + seventh;
            }

            return "";
        });
    }
}