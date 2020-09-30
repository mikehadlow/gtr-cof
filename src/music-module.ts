
namespace music {

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
        readonly colour: number;
    };

    export let getIntervalName: (x: Interval) => string = interval => intervalName[interval.type] + (interval.ord + 1); 

    export let intervals: mod.Mod<Interval[]> = new mod.Mod([
        [{ ord: 0, type: IntervalType.Nat, colour: 0xf44b42 }, { ord: 1, type: IntervalType.Dim, colour: 0xf44b42 }],
        [{ ord: 1, type: IntervalType.Min, colour: 0xf48942 }, { ord: 0, type: IntervalType.Aug, colour: 0xf48942 }],
        [{ ord: 1, type: IntervalType.Maj, colour: 0xf4bf42 }, { ord: 2, type: IntervalType.Dim, colour: 0xf4bf42 }],
        [{ ord: 2, type: IntervalType.Min, colour: 0xf4ee42 }, { ord: 1, type: IntervalType.Aug, colour: 0xf4ee42 }],
        [{ ord: 2, type: IntervalType.Maj, colour: 0x8cf442 }, { ord: 3, type: IntervalType.Dim, colour: 0x8cf442 }],
        [{ ord: 3, type: IntervalType.Nat, colour: 0x42f4bf }, { ord: 2, type: IntervalType.Aug, colour: 0x42f4bf }],
        [{ ord: 4, type: IntervalType.Dim, colour: 0x42d4f4 }, { ord: 3, type: IntervalType.Aug, colour: 0x42d4f4 }],
        [{ ord: 4, type: IntervalType.Nat, colour: 0x429ef4 }, { ord: 5, type: IntervalType.Dim, colour: 0x429ef4 }],
        [{ ord: 5, type: IntervalType.Min, colour: 0xe542f4 }, { ord: 4, type: IntervalType.Aug, colour: 0xe542f4 }],
        [{ ord: 5, type: IntervalType.Maj, colour: 0xf44289 }, { ord: 6, type: IntervalType.Dim, colour: 0xf44289 }],
        [{ ord: 6, type: IntervalType.Min, colour: 0xff8282 }, { ord: 5, type: IntervalType.Aug, colour: 0xff8282 }],
        [{ ord: 6, type: IntervalType.Maj, colour: 0xff82fc }, { ord: 0, type: IntervalType.Dim, colour: 0xff82fc }],
    ]);

    export interface ScaleFamily {
        readonly index: number;
        readonly name: string;
        readonly intervals: mod.Mod<boolean>;
        readonly modes: Mode[];
        readonly defaultModeIndex: number;
    };

    export function notesInScaleFamily(scaleFamily: ScaleFamily): number {
        return scaleFamily.intervals.items.filter(x => x).length;
    }

    let diatonicModes: Mode[] = [
        { name: 'Lydian', index: 5 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 7 },
        { name: 'Dorian', index: 2 },
        { name: 'N Minor / Aeolian', index: 9 },
        { name: 'Phrygian', index: 4 },
        { name: 'Locrian', index: 11 },
    ];

    let harmonicMinorModes: Mode[] = [
        { name: 'Lydian ♯2', index: 5 },
        { name: 'Ionian ♯5', index: 0 },
        { name: 'Superlocrian', index: 8 },
        { name: 'Dorian ♯4', index: 2 },
        { name: 'Harmonic Minor', index: 9 },
        { name: 'Phrygian Dominant', index: 4 },
        { name: 'Locrian ♯6', index: 11 },
    ];

    let jazzMinorModes: Mode[] = [
        { name: 'Lydian Dominant', index: 5 },
        { name: 'Jazz Minor', index: 0 },
        { name: 'Mixolydian ♭6', index: 7 },
        { name: 'Assyrian', index: 2 },
        { name: 'Locrian ♮2', index: 9 },
        { name: 'Lydian Augmented', index: 3 },
        { name: 'Altered scale', index: 11 },
    ];

    export let scaleFamily: ScaleFamily[] = [
        { index: 0, name: "diatonic",       intervals: new mod.Mod([true, false, true, false, true, true, false, true, false, true, false, true]), modes: diatonicModes, defaultModeIndex: 0 },
        { index: 1, name: "harmonic minor", intervals: new mod.Mod([true, false, true, false, true, true, false, false, true, true, false, true]), modes: harmonicMinorModes, defaultModeIndex: 9 },
        { index: 2, name: "jazz minor",     intervals: new mod.Mod([true, false, true, true, false, true, false, true, false, true, false, true]), modes: jazzMinorModes, defaultModeIndex: 0 },
        { index: 3, name: "whole tone",     intervals: new mod.Mod([true, false, true, false, true, false, true, false, true, false, true, false]), modes: [{ name: 'Whole Tone', index: 0}], defaultModeIndex: 0 },
        { index: 4, name: "diminished",     intervals: new mod.Mod([true, false, true, true, false, true, true, false, true, true, false, true]), modes: [{ name: 'Diminished', index: 0}], defaultModeIndex: 0 }
    ];

    // root diatonic scale is major
    export let diatonic: mod.Mod<boolean> = new mod.Mod([true, false, true, false, true, true, false, true, false, true, false, true]);
    export let indexList: mod.Mod<number> = new mod.Mod([0,1,2,3,4,5,6,7,8,9,10,11]);

    export interface NoteSpec {
        readonly natural: Natural;
        readonly index: number;
        readonly offset: number;
        readonly label: string;
    }

    export function createNoteSpec(naturalIndex: number, index: number): NoteSpec {
        let natural = naturals.filter(x => x.index === naturalIndex)[0];
        if(! naturals.some(x => x.index === naturalIndex)) {
            throw "naturalIndex is not valid: " + naturalIndex;
        }

        let offset = mod.diff(12, naturalIndex, index);
        if(Math.abs(offset) > 2) {
            throw "offset between naturalIndex: " + naturalIndex + ", and index: " + index + ", is invalid: " + offset;
        }

        let noteLabel = noteLabels.filter(x => x.offset === offset)[0];

        return {
            natural: natural,
            index: index,
            offset: offset,
            label: natural.label + noteLabel.label 
        };
    }

    export interface Natural {
        id: number, // order of the number in the natural set.
        index: number, // number against the fixed chromatic series
        label: string // the natural name, e.g: 'A'
    }

    // fixed index:
    // 0  1  2  3  4  5  6  7  8  9  10 11 
    // A     B  C     D     E  F     G
    export let naturals: Natural[] = [
        { id: 0, index: 0, label: "A" },
        { id: 1, index: 2, label: "B" },
        { id: 2, index: 3, label: "C" },
        { id: 3, index: 5, label: "D" },
        { id: 4, index: 7, label: "E" },
        { id: 5, index: 8, label: "F" },
        { id: 6, index: 10, label: "G" }
    ];

    let naturalList = new mod.Mod(naturals);

    interface NoteName {
        readonly name: string;
        readonly index: number;
    }

    export let noteNames: NoteName[] = [
        { name: "A", index: 0 },
        { name: "A♯", index: 1 },
        { name: "A♭", index: 11 },

        { name: "B", index: 2 },
        { name: "B♯", index: 3 },
        { name: "B♭", index: 1 },

        { name: "C", index: 3 },
        { name: "C♯", index: 4 },
        { name: "C♭", index: 2 },

        { name: "D", index: 5 },
        { name: "D♯", index: 6 },
        { name: "D♭", index: 4 },

        { name: "E", index: 7 },
        { name: "E♯", index: 8 },
        { name: "E♭", index: 6 },

        { name: "F", index: 8 },
        { name: "F♯", index: 7 },
        { name: "F♭", index: 9 },

        { name: "G", index: 10 },
        { name: "G♯", index: 9 },
        { name: "G♭", index: 11 },
    ];

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

    export interface ScaleSpec {
        noteSpec: NoteSpec;
        mode: Mode;
    }

    export function createScaleSpec(index:number, naturalIndex:number, modeIndex:number): ScaleSpec {
        return {
            noteSpec: createNoteSpec(naturalIndex, index),
            mode: scaleFamily[0].modes[modeIndex]
        };
    }

    export enum ChordType { Major, Minor, Diminished };

    export interface Chord {
        readonly romanNumeral: string;
        readonly type: ChordType;
    }

    export interface ScaleNote {
        readonly note: NoteSpec;
        readonly interval: Interval;
        readonly intervalName: string;
        readonly isScaleNote: boolean;
        readonly noteNumber: number;
        chord?: Chord;
    };

    export interface Node {
        readonly scaleNote: ScaleNote;
        readonly chordInterval: Interval;
        readonly intervalName: string;
        readonly isChordRoot: boolean;
        readonly toggle: boolean;
        readonly midiToggle: boolean;
    }

    export let nullNode: Node = {
        scaleNote: {
            note: {
                natural: {
                    id: 0,
                    index: 0,
                    label: ""
                },
                index: 0,
                offset: 0,
                label: ""
            },
            interval: {
                ord: 0,
                type: 0,
                colour: 0
            },
            intervalName: "",
            isScaleNote: false,
            noteNumber: 0
        },
        chordInterval: {
            ord: 0,
            type: 0,
            colour: 0
        },
        intervalName: "",
        isChordRoot: false,
        toggle: false,
        midiToggle: false
    };

    export function generateScaleShim(
        noteSpec: NoteSpec, 
        mode: Mode, 
        chordIndex: number, 
        chordIntervals: number[], 
        toggledIndexes: number,
        toggledMidiNotes: number,
        scaleFamily: ScaleFamily): Node[] {

        let scale = generateScale(noteSpec, mode, scaleFamily);
        mod.zip(scale, generateChordNumbers(scale, mode, scaleFamily.intervals)).forEach(x => x[0].chord = x[1]);
        if(chordIndex === -1) {
            return generateNodes(scale, mode, scale[0].note.index, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamily.intervals);
        }
        else {
            return generateNodes(scale, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamily.intervals, true);
        }
    }

    export function generateScale(noteSpec: NoteSpec, mode: Mode, scaleFamily: ScaleFamily): ScaleNote[] {
        indexList.setStart(noteSpec.index);
        naturalList.setStart(noteSpec.natural.id);
        scaleFamily.intervals.setStart(mode.index);        
        intervals.setStart(0);
        let workingSet = indexList.merge3(buildScaleCounter(scaleFamily.intervals.toArray()), intervals.toArray());
        let isSevenNoteScale = notesInScaleFamily(scaleFamily) == 7;

        return workingSet.map(item => {
            let index = item[0];
            let isScaleNote = item[1][0];

            let noteNumber:number;
            let natural:Natural;
            let activeInterval:Interval;

            if(isScaleNote &&  isSevenNoteScale) {
                noteNumber = item[1][1];
                natural = naturalList.itemAt(noteNumber);
                activeInterval = item[2].filter(x => x.ord == noteNumber)[0];
                if(activeInterval == null) {
                    activeInterval = item[2][0];
                }
            }
            else {
                activeInterval = item[2][0];
                noteNumber = isScaleNote ? item[1][1] : activeInterval.ord;
                natural = naturalList.itemAt(activeInterval.ord);
            }

            // console.log("index: " + index + ", isScaleNote: " + isScaleNote 
            //     + ", noteNumber: " + noteNumber + ", natural.index: " + natural.index
            //     + ", natural.label: " + natural.label
            //     + ", interval: " + getIntervalName(activeInterval))
            
            return {
                note: createNoteSpec(natural.index, index),
                interval: activeInterval,
                intervalName: getIntervalName(activeInterval),
                isScaleNote: isScaleNote,
                noteNumber: noteNumber
            };
        });
    }

    // generateNodes creates an 'outer' sliding interval ring that can change with
    // chord selections.
    export function generateNodes(
        scaleNotes: ScaleNote[], 
        mode:Mode, 
        chordIndex: number, 
        chordIntervals: number[],
        toggledIndexes: number,
        toggledMidiNotes: number,
        scaleFamily: mod.Mod<boolean>,
        chordSelected: boolean = false
    ): Node[] {
        let chordIndexOffset = ((chordIndex + 12) - scaleNotes[0].note.index) % 12;
        intervals.setStart(12 - chordIndexOffset);
        scaleFamily.setStart(mode.index);
        let startAt = scaleNotes.filter(x => x.note.index === chordIndex)[0].noteNumber;
        let workingSet = intervals.merge3(
            scaleNotes,
            buildScaleCounter(scaleFamily.toArray(), startAt));

        return workingSet.map(item => {
            let chordIntervalCandidates = item[0];
            let scaleNote = item[1];
            let scaleCounter = item[2];
            let activeInterval = scaleNote.isScaleNote
                ? chordIntervalCandidates.filter(x => x.ord === scaleCounter[1])[0]
                : chordIntervalCandidates[0];
            if(activeInterval == null) {
                activeInterval = chordIntervalCandidates[0];
            }

            // if(chordSelected) {
            //     console.log("chordIndex: " + chordIndex + 
            //         ", scaleNote.isScaleNote: " + scaleNote.isScaleNote +
            //         ", scaleNote.notenumber: " + scaleNote.noteNumber +
            //         ", scaleCounter: " + scaleCounter +
            //         ", activeInterval: " + getIntervalName(activeInterval) + 
            //         ", toggle: " + calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals));
            // }

            return {
                scaleNote: scaleNote,
                chordInterval: activeInterval,
                intervalName: getIntervalName(activeInterval),
                isChordRoot: chordSelected && activeInterval.ord === 0 && activeInterval.type === 0,
                toggle: calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals),
                midiToggle: (toggledMidiNotes & (2**scaleNote.note.index)) != 0
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

    let romanNumeral: Array<string> = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];

    export function generateChordNumbers(scaleNotes: ScaleNote[], mode: Mode, scaleFamily: mod.Mod<boolean>): Chord[] {
        return scaleNotes.map((scaleNote, i) => {
            if(scaleNote.isScaleNote) {
                let roman = romanNumeral[scaleNote.noteNumber];
                let nodes = generateNodes(scaleNotes, mode, scaleNote.note.index, [], 0, 0, scaleFamily);
                let diminished = "";
                let seventh = "";
                let type: ChordType = ChordType.Minor;
                // does it have a diminished 5th?
                if(nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 4 && x.chordInterval.type === IntervalType.Dim)) {
                    diminished = "°";
                    type = ChordType.Diminished;
                }
                // does it have a major 3rd?
                if(nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 2 && x.chordInterval.type === IntervalType.Maj)) {
                    roman = roman.toLocaleUpperCase();
                    type = ChordType.Major;
                }
                // does it have a natural 7th?
                if(nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 6 && x.chordInterval.type === IntervalType.Min)) {
                    seventh = "7";
                }
                // does it have a major 7th?
                if(nodes.some(x => x.scaleNote.isScaleNote && x.chordInterval.ord === 6 && x.chordInterval.type === IntervalType.Maj)) {
                    seventh = "^7";
                }
                return {
                    romanNumeral: roman + diminished + seventh,
                    type: type
                };
            }

            return {
                romanNumeral: "",
                type: ChordType.Major
            };
        });
    }

    export function calculateToggle(
        activeInterval: Interval, 
        scaleNote: ScaleNote, 
        chordSelected: boolean, 
        toggledIndexes: number,
        chordIntervals: number[]
    ): boolean {
        if(toggledIndexes === 0) {
            return chordSelected && scaleNote.isScaleNote && chordIntervals.some(x => activeInterval.ord === x);
        }
        return (toggledIndexes & (2**scaleNote.note.index)) != 0;
    }

    export function fifths(): Array<number> {
        let indexes: Array<number> = [];
        let current: number = 0;
        for (let i: number = 0; i < 12; i++) {
            indexes.push(current);
            current = (current + 7) % 12;
        }
        return indexes;
    }

    export function chromatic(): Array<number> {
        let indexes: Array<number> = [];
        for (let i: number = 0; i < 12; i++) {
            indexes.push(i);
        }
        return indexes;
    }
}