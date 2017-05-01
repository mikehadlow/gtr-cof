
namespace music {

    export interface NoteBase {
        readonly id: number;
        readonly index: number;
        readonly name: string;
    }

    export let noteBases: Array<NoteBase> = [
        { id: 0, index: 0, name: 'C' },
        { id: 1, index: 2, name: 'D' },
        { id: 2, index: 4, name: 'E' },
        { id: 3, index: 5, name: 'F' },
        { id: 4, index: 7, name: 'G' },
        { id: 5, index: 9, name: 'A' },
        { id: 6, index: 11, name: 'B' }
    ];

    export let notes : { [id: string]: number } = {};
    notes["C"] = 0;
    notes["D"] = 2;
    notes["E"] = 4;
    notes["F"] = 5;
    notes["G"] = 7;
    notes["A"] = 9;
    notes["B"] = 11;

    interface NoteLabel {
        readonly offset: number;
        readonly label: string;
    }

    let noteLabels: Array<NoteLabel> = [
        { offset: 0, label: '' },
        { offset: 1, label: '♯' },
        { offset: 2, label: '♯♯' },
        { offset: -1, label: '♭' },
        { offset: -2, label: '♭♭' },
    ];

    export interface Mode {
        readonly name: string;
        readonly index: number;
    }

    export let modes: Array<Mode> = [
        { name: 'Lydian', index: 3 },
        { name: 'Major / Ionian', index: 0 },
        { name: 'Mixolydian', index: 4 },
        { name: 'Dorian', index: 1 },
        { name: 'N Minor / Aeolian', index: 5 },
        { name: 'Phrygian', index: 2 },
        { name: 'Locrian', index: 6 },
    ];

    let scaleTones: Array<number> = [2, 2, 1, 2, 2, 2, 1];

    let romanNumeral: Array<string> = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

    export type Triad = [number, number, number];

    export enum ChordType { Major, Minor, Diminished };

    export interface ScaleNote {
        readonly index: number;
        readonly degree: number;
        readonly noteName: string;
        readonly chord: Chord;
        readonly noteBase: NoteBase;
        readonly canSelect: boolean;
        chordNote?: number;
    };

    export interface Chord {
        readonly romanNumeral: string;
        readonly triad: Triad;
        readonly type: ChordType;
    }

    export function generateScale(noteBase: NoteBase, index: number, mode: Mode): Array<ScaleNote> {
        let scale: Array<ScaleNote> = [];

        let currentIndex = index;
        let currentNoteBase = noteBase;
        for (let i = 0; i < 7; i++) {

            let offset = currentIndex - currentNoteBase.index;
            if (Math.abs(offset) > 2) {
                offset = (currentIndex < currentNoteBase.index)
                    ? (currentIndex + 12) - currentNoteBase.index
                    : currentIndex - (currentNoteBase.index + 12);
            }
            // lookup noteLabel with offset
            let noteLabel: NoteLabel = noteLabels.filter(function (n: NoteLabel) { return n.offset == offset; })[0];
            // add new ScaleNote to scale
            scale.push({
                index: currentIndex,
                degree: i,
                noteName: currentNoteBase.name + noteLabel.label,
                noteBase: currentNoteBase,
                canSelect: Math.abs(offset) < 2,
                chord: null
            })

            let interval = scaleTones[(mode.index + i) % 7];
            currentIndex = (currentIndex + interval) % 12;
            currentNoteBase = noteBases[(currentNoteBase.id + 1) % 7]
        }

        let scalePlusChord: Array<ScaleNote> = [];

        for (let note of scale) {
            scalePlusChord.push({
                index: note.index,
                degree: note.degree,
                noteName: note.noteName,
                noteBase: note.noteBase,
                canSelect: note.canSelect,
                chord: generateChord(scale, note)
            });
        }

        return scalePlusChord;
    }

    function generateChord(scale: Array<ScaleNote>, root: ScaleNote): Chord {
        let triad: Triad = [
            root.index,
            scale[(root.degree + 2) % 7].index,
            scale[(root.degree + 4) % 7].index
        ];
        let chordType = getChordType(triad);
        let roman = romanNumeral[root.degree];
        if (chordType === ChordType.Major) {
            roman = roman.toLocaleUpperCase();
        }
        if (chordType === ChordType.Diminished) {
            roman = roman + "°";
        }

        return {
            romanNumeral: roman,
            triad: triad,
            type: chordType
        };
    }

    export function appendTriad(scale: Array<ScaleNote>, chordIndex: number): Array<ScaleNote> {
        let chord = scale.filter((x) => x.index == chordIndex)[0].chord;
        for (let note of scale) {
            for (let i = 0; i < 3; i++) {
                if (note.index === chord.triad[i]) {
                    note.chordNote = i;
                }
            }
        }
        return scale;
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

    function getChordType(triad: Triad): ChordType {
        // check for diminished
        if (interval(triad[0], triad[2]) === 6) return ChordType.Diminished;
        // check for minor
        if (interval(triad[0], triad[1]) === 3) return ChordType.Minor;
        // must be Major
        return ChordType.Major;
    }

    function interval(a: number, b: number): number {
        return (a <= b) ? b - a : (b + 12) - a;
    }

    export function indexIsNatural(index: number): boolean {
        return noteBases.filter(function (noteBase, i, a) {
            return noteBase.index == index;
        }).length != 0;
    }
}
