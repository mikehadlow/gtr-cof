import { describe, expect, test } from 'bun:test';
import { Mod, zip, zip3, diff } from './mod';

describe('Mod class', () => {
    describe('constructor', () => {
        test('initializes with items and size', () => {
            const mod = new Mod([1, 2, 3, 4, 5]);
            expect(mod.size).toBe(5);
            expect(mod.items).toEqual([1, 2, 3, 4, 5]);
            expect(mod.start).toBe(0);
        });
    });

    describe('setStart', () => {
        test('sets start position within bounds', () => {
            const mod = new Mod(['a', 'b', 'c', 'd']);
            mod.setStart(2);
            expect(mod.start).toBe(2);
        });

        test('wraps start position using modular arithmetic', () => {
            const mod = new Mod(['a', 'b', 'c', 'd']);
            mod.setStart(6); // 6 % 4 = 2
            expect(mod.start).toBe(2);
        });

        test('handles start of 0', () => {
            const mod = new Mod(['a', 'b', 'c']);
            mod.setStart(0);
            expect(mod.start).toBe(0);
        });
    });

    describe('itemAt', () => {
        test('returns item at index when start is 0', () => {
            const mod = new Mod(['a', 'b', 'c', 'd']);
            expect(mod.itemAt(0)).toBe('a');
            expect(mod.itemAt(1)).toBe('b');
            expect(mod.itemAt(3)).toBe('d');
        });

        test('returns item at offset index when start is set', () => {
            const mod = new Mod(['a', 'b', 'c', 'd']);
            mod.setStart(2);
            expect(mod.itemAt(0)).toBe('c');
            expect(mod.itemAt(1)).toBe('d');
            expect(mod.itemAt(2)).toBe('a');
            expect(mod.itemAt(3)).toBe('b');
        });

        test('wraps around for indices beyond size', () => {
            const mod = new Mod(['a', 'b', 'c']);
            expect(mod.itemAt(3)).toBe('a');
            expect(mod.itemAt(4)).toBe('b');
            expect(mod.itemAt(5)).toBe('c');
        });
    });

    describe('toArray', () => {
        test('returns original array when start is 0', () => {
            const mod = new Mod([1, 2, 3, 4]);
            expect(mod.toArray()).toEqual([1, 2, 3, 4]);
        });

        test('returns rotated array when start is set', () => {
            const mod = new Mod([1, 2, 3, 4]);
            mod.setStart(2);
            expect(mod.toArray()).toEqual([3, 4, 1, 2]);
        });

        test('returns rotated array for start=1', () => {
            const mod = new Mod(['a', 'b', 'c']);
            mod.setStart(1);
            expect(mod.toArray()).toEqual(['b', 'c', 'a']);
        });
    });

    describe('merge', () => {
        test('merges two arrays into tuples', () => {
            const mod = new Mod([1, 2, 3]);
            const result = mod.merge(['a', 'b', 'c']);
            expect(result).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
        });

        test('respects start position when merging', () => {
            const mod = new Mod([1, 2, 3]);
            mod.setStart(1);
            const result = mod.merge(['a', 'b', 'c']);
            expect(result).toEqual([[2, 'a'], [3, 'b'], [1, 'c']]);
        });
    });

    describe('merge3', () => {
        test('merges three arrays into tuples', () => {
            const mod = new Mod([1, 2]);
            const result = mod.merge3(['a', 'b'], [true, false]);
            expect(result).toEqual([[1, 'a', true], [2, 'b', false]]);
        });
    });
});

describe('zip', () => {
    test('zips two arrays of equal length', () => {
        const result = zip([1, 2, 3], ['a', 'b', 'c']);
        expect(result).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
    });

    test('throws for arrays of different lengths', () => {
        expect(() => zip([1, 2], ['a', 'b', 'c'])).toThrow('Cannot merge arrays of different lengths');
    });

    test('handles empty arrays', () => {
        const result = zip([], []);
        expect(result).toEqual([]);
    });
});

describe('zip3', () => {
    test('zips three arrays of equal length', () => {
        const result = zip3([1, 2], ['a', 'b'], [true, false]);
        expect(result).toEqual([[1, 'a', true], [2, 'b', false]]);
    });

    test('throws when first two arrays differ in length', () => {
        expect(() => zip3([1], ['a', 'b'], [true])).toThrow('Cannot merge arrays of different lengths');
    });

    test('throws when first and third arrays differ in length', () => {
        expect(() => zip3([1, 2], ['a', 'b'], [true])).toThrow('Cannot merge arrays of different lengths');
    });

    test('handles empty arrays', () => {
        const result = zip3([], [], []);
        expect(result).toEqual([]);
    });
});

describe('diff', () => {
    test('returns 0 for identical values', () => {
        expect(diff(12, 5, 5)).toBe(0);
    });

    test('returns positive difference when b > a', () => {
        expect(diff(12, 2, 5)).toBe(3);
    });

    test('returns negative difference when a > b', () => {
        expect(diff(12, 5, 2)).toBe(-3);
    });

    test('takes shorter path across wrap boundary (positive)', () => {
        // From 10 to 1: direct is -9, wrapped is +3 (shorter)
        expect(diff(12, 10, 1)).toBe(3);
    });

    test('takes shorter path across wrap boundary (negative)', () => {
        // From 1 to 10: direct is +9, wrapped is -3 (shorter)
        expect(diff(12, 1, 10)).toBe(-3);
    });

    test('handles modular equivalence', () => {
        expect(diff(12, 14, 14)).toBe(0); // 14 % 12 = 2
        expect(diff(12, 2, 14)).toBe(0);  // 14 % 12 = 2
    });

    test('works with different sizes', () => {
        expect(diff(7, 1, 5)).toBe(-3); // shorter path is backwards
        expect(diff(7, 5, 1)).toBe(3);  // shorter path is forwards
    });
});
