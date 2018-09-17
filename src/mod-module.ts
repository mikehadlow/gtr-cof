import * as mod from "./mod-module"

export class Mod<T> {
    size: number = 0
    items: T[]
    start: number = 0

    constructor(items: T[]) {
        this.items = items
        this.size = items.length
    }

    setStart(start: number): void {
        this.start = start % this.size
    }

    itemAt(index: number): T {
        return this.items[(this.start + index) % this.size]
    }

    toArray(): T[] {
        const newArray: T[] = []
        for (let i = 0; i < this.size; i++) {
            newArray.push(this.items[(i + this.start) % this.size])
        }
        return newArray
    }

    merge<U>(items: U[]): Array<[T, U]> {
        const theseItems: T[] = this.toArray()
        return zip(theseItems, items)
    }

    merge3<U, V>(items2: U[], items3: V[]): Array<[T, U, V]> {
        const theseItems: T[] = this.toArray()
        return zip3(theseItems, items2, items3)
    }
}

export function zip<A, B>(a: A[], b: B[]): Array<[A, B]> {
    if (a.length !== b.length) {
        throw new Error("Cannot merge arrays of different lengths")
    }
    return a.map((x, i) => [x, b[i]] as [A, B])
}

export function zip3<A, B, C>(a: A[], b: B[], c: C[]): Array<[A, B, C]> {
    if (a.length !== b.length || a.length !== c.length) {
        throw new Error("Cannot merge arrays of different lengths")
    }
    return a.map((x, i) => [x, b[i], c[i]] as [A, B, C])
}

export function diff(size: number, a: number, b: number): number {
    const ax = a % size
    const bx = b % size
    if (ax === bx) {
        return 0
    }

    const d1 = bx - ax
    let d2 = 0

    if (d1 > 0) {
        d2 = -(ax + size - bx)
    } else {
        d2 = bx + size - ax
    }
    return Math.abs(d1) > Math.abs(d2) ? d2 : d1
}

const modTest = new mod.Mod<number>([0, 1, 2, 3, 4, 5])
