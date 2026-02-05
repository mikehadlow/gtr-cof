import { describe, expect, test } from 'bun:test';
import {
    createNoteSpec,
    getIntervalName,
    fifths,
    chromatic,
    generateScale,
    generateChordNumbers,
    notesInScaleFamily,
    scaleFamily,
    naturals,
    ChordType,
} from './music';

describe('createNoteSpec', () => {
    test('creates note spec for natural note A', () => {
        const note = createNoteSpec(0, 0); // A natural
        expect(note.label).toBe('A');
        expect(note.index).toBe(0);
        expect(note.offset).toBe(0);
        expect(note.natural.label).toBe('A');
    });

    test('creates note spec for C natural', () => {
        const note = createNoteSpec(3, 3); // C natural (index 3)
        expect(note.label).toBe('C');
        expect(note.index).toBe(3);
        expect(note.offset).toBe(0);
    });

    test('creates note spec with sharp', () => {
        const note = createNoteSpec(0, 1); // A# (A natural at 0, chromatic index 1)
        expect(note.label).toBe('A♯');
        expect(note.offset).toBe(1);
    });

    test('creates note spec with flat', () => {
        const note = createNoteSpec(2, 1); // Bb (B natural at 2, chromatic index 1)
        expect(note.label).toBe('B♭');
        expect(note.offset).toBe(-1);
    });

    test('creates note spec with double sharp', () => {
        const note = createNoteSpec(0, 2); // Ax (A double sharp)
        expect(note.label).toBe('Ax');
        expect(note.offset).toBe(2);
    });

    test('creates note spec with double flat', () => {
        const note = createNoteSpec(3, 1); // Cbb (C natural at 3, index 1 is 2 semitones down)
        expect(note.label).toBe('C♭♭');
        expect(note.offset).toBe(-2);
    });

    test('throws for invalid natural index', () => {
        expect(() => createNoteSpec(1, 0)).toThrow('naturalIndex is not valid');
    });

    test('throws for offset greater than 2', () => {
        // A natural is at 0, trying to reach index 4 (offset of 4)
        expect(() => createNoteSpec(0, 4)).toThrow('offset between naturalIndex');
    });
});

describe('getIntervalName', () => {
    test('returns correct name for natural intervals', () => {
        expect(getIntervalName({ ord: 0, type: 'Nat', colour: 0 })).toBe('1');
        expect(getIntervalName({ ord: 4, type: 'Nat', colour: 0 })).toBe('5');
    });

    test('returns correct name for major intervals', () => {
        expect(getIntervalName({ ord: 1, type: 'Maj', colour: 0 })).toBe('M2');
        expect(getIntervalName({ ord: 2, type: 'Maj', colour: 0 })).toBe('M3');
        expect(getIntervalName({ ord: 5, type: 'Maj', colour: 0 })).toBe('M6');
    });

    test('returns correct name for minor intervals', () => {
        expect(getIntervalName({ ord: 1, type: 'Min', colour: 0 })).toBe('m2');
        expect(getIntervalName({ ord: 2, type: 'Min', colour: 0 })).toBe('m3');
        expect(getIntervalName({ ord: 6, type: 'Min', colour: 0 })).toBe('m7');
    });

    test('returns correct name for augmented intervals', () => {
        expect(getIntervalName({ ord: 3, type: 'Aug', colour: 0 })).toBe('A4');
        expect(getIntervalName({ ord: 4, type: 'Aug', colour: 0 })).toBe('A5');
    });

    test('returns correct name for diminished intervals', () => {
        expect(getIntervalName({ ord: 4, type: 'Dim', colour: 0 })).toBe('d5');
        expect(getIntervalName({ ord: 6, type: 'Dim', colour: 0 })).toBe('d7');
    });
});

describe('fifths', () => {
    test('returns array of 12 indexes in circle of fifths order', () => {
        const result = fifths();
        expect(result).toHaveLength(12);
        expect(result).toEqual([0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]);
    });

    test('each step is 7 semitones apart (mod 12)', () => {
        const result = fifths();
        for (let i = 1; i < result.length; i++) {
            expect((result[i] - result[i - 1] + 12) % 12).toBe(7);
        }
    });
});

describe('chromatic', () => {
    test('returns array of indexes 0-11', () => {
        const result = chromatic();
        expect(result).toHaveLength(12);
        expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });
});

describe('notesInScaleFamily', () => {
    test('diatonic scale has 7 notes', () => {
        expect(notesInScaleFamily(scaleFamily[0])).toBe(7);
    });

    test('harmonic minor has 7 notes', () => {
        expect(notesInScaleFamily(scaleFamily[1])).toBe(7);
    });

    test('jazz minor has 7 notes', () => {
        expect(notesInScaleFamily(scaleFamily[2])).toBe(7);
    });

    test('whole tone scale has 6 notes', () => {
        expect(notesInScaleFamily(scaleFamily[3])).toBe(6);
    });

    test('diminished scale has 8 notes', () => {
        expect(notesInScaleFamily(scaleFamily[4])).toBe(8);
    });
});

describe('generateScale', () => {
    const diatonicFamily = scaleFamily[0];
    const majorMode = diatonicFamily.modes.find(m => m.name === 'Major / Ionian')!;

    test('generates C major scale', () => {
        const cNatural = createNoteSpec(3, 3); // C natural
        const scale = generateScale(cNatural, majorMode, diatonicFamily);

        expect(scale).toHaveLength(12);

        // Extract only scale notes
        const scaleNotes = scale.filter(n => n.isScaleNote);
        expect(scaleNotes).toHaveLength(7);

        // Check the note labels for C major: C D E F G A B
        const labels = scaleNotes.map(n => n.note.label);
        expect(labels).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    });

    test('generates A major scale', () => {
        const aNatural = createNoteSpec(0, 0); // A natural
        const scale = generateScale(aNatural, majorMode, diatonicFamily);

        const scaleNotes = scale.filter(n => n.isScaleNote);
        expect(scaleNotes).toHaveLength(7);

        // A major: A B C# D E F# G#
        const labels = scaleNotes.map(n => n.note.label);
        expect(labels).toEqual(['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯']);
    });

    test('generates F major scale (has Bb)', () => {
        const fNatural = createNoteSpec(8, 8); // F natural (index 8)
        const scale = generateScale(fNatural, majorMode, diatonicFamily);

        const scaleNotes = scale.filter(n => n.isScaleNote);
        const labels = scaleNotes.map(n => n.note.label);

        // F major: F G A Bb C D E
        expect(labels).toEqual(['F', 'G', 'A', 'B♭', 'C', 'D', 'E']);
    });

    test('generates natural minor scale (Aeolian)', () => {
        const minorMode = diatonicFamily.modes.find(m => m.name === 'N Minor / Aeolian')!;
        const aNatural = createNoteSpec(0, 0); // A natural
        const scale = generateScale(aNatural, minorMode, diatonicFamily);

        const scaleNotes = scale.filter(n => n.isScaleNote);
        const labels = scaleNotes.map(n => n.note.label);

        // A natural minor: A B C D E F G
        expect(labels).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
});

describe('generateChordNumbers', () => {
    const diatonicFamily = scaleFamily[0];
    const majorMode = diatonicFamily.modes.find(m => m.name === 'Major / Ionian')!;

    test('generates correct chord types for major scale', () => {
        const cNatural = createNoteSpec(3, 3);
        const scale = generateScale(cNatural, majorMode, diatonicFamily);
        const chords = generateChordNumbers(scale, majorMode, diatonicFamily.intervals);

        // Get only the chords for scale notes
        const scaleChords = chords.filter((_, i) => scale[i].isScaleNote);

        // Major scale chord pattern: I ii iii IV V vi vii°
        expect(scaleChords[0].romanNumeral).toBe('I');
        expect(scaleChords[0].type).toBe(ChordType.Major);

        expect(scaleChords[1].romanNumeral).toBe('ii');
        expect(scaleChords[1].type).toBe(ChordType.Minor);

        expect(scaleChords[2].romanNumeral).toBe('iii');
        expect(scaleChords[2].type).toBe(ChordType.Minor);

        expect(scaleChords[3].romanNumeral).toBe('IV');
        expect(scaleChords[3].type).toBe(ChordType.Major);

        expect(scaleChords[4].romanNumeral).toBe('V');
        expect(scaleChords[4].type).toBe(ChordType.Major);

        expect(scaleChords[5].romanNumeral).toBe('vi');
        expect(scaleChords[5].type).toBe(ChordType.Minor);

        expect(scaleChords[6].romanNumeral).toBe('vii°');
        expect(scaleChords[6].type).toBe(ChordType.Diminished);
    });

    test('generates correct chord types for natural minor scale', () => {
        const minorMode = diatonicFamily.modes.find(m => m.name === 'N Minor / Aeolian')!;
        const aNatural = createNoteSpec(0, 0);
        const scale = generateScale(aNatural, minorMode, diatonicFamily);
        const chords = generateChordNumbers(scale, minorMode, diatonicFamily.intervals);

        const scaleChords = chords.filter((_, i) => scale[i].isScaleNote);

        // Natural minor chord pattern: i ii° III iv v VI VII
        expect(scaleChords[0].romanNumeral).toBe('i');
        expect(scaleChords[0].type).toBe(ChordType.Minor);

        expect(scaleChords[1].romanNumeral).toBe('ii°');
        expect(scaleChords[1].type).toBe(ChordType.Diminished);

        expect(scaleChords[2].romanNumeral).toBe('III');
        expect(scaleChords[2].type).toBe(ChordType.Major);

        expect(scaleChords[3].romanNumeral).toBe('iv');
        expect(scaleChords[3].type).toBe(ChordType.Minor);

        expect(scaleChords[4].romanNumeral).toBe('v');
        expect(scaleChords[4].type).toBe(ChordType.Minor);

        expect(scaleChords[5].romanNumeral).toBe('VI');
        expect(scaleChords[5].type).toBe(ChordType.Major);

        expect(scaleChords[6].romanNumeral).toBe('VII');
        expect(scaleChords[6].type).toBe(ChordType.Major);
    });
});

describe('naturals array', () => {
    test('contains all 7 natural notes', () => {
        expect(naturals).toHaveLength(7);
    });

    test('natural notes have correct labels', () => {
        const labels = naturals.map(n => n.label);
        expect(labels).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });

    test('natural notes have correct chromatic indexes', () => {
        // A=0, B=2, C=3, D=5, E=7, F=8, G=10
        expect(naturals.map(n => n.index)).toEqual([0, 2, 3, 5, 7, 8, 10]);
    });
});
