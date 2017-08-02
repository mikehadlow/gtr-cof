namespace mod {

    export class Mod<T> {

        size: number = 0;
        items: T[];
        start: number = 0;

        constructor(items: T[]) {
            this.items = items;
            this.size = items.length;
        }

        setStart(start: number): void {
            this.start = start % this.size;
        } 

        itemAt(index: number) : T {
            return this.items[(this.start + index) % this.size];
        }

        toArray(): T[] {
            let newArray: T[] = [];
            for(let i=0; i<this.size; i++) {
                newArray.push(this.items[(i + this.start) % this.size]);
            }
            return newArray;
        }

        merge<U>(items: U[]): [T, U][] {
            let theseItems: T[] = this.toArray();
            if(theseItems.length != items.length) {
                throw "Cannot merge arrays of different lengths";
            }
            
            let mergedItems: [T, U][] = [];
            for(let i=0; i<theseItems.length; i++) {
                mergedItems.push([theseItems[i], items[i]]);
            }
            return mergedItems;
        }

        merge3<U, V>(items2: U[], items3: V[]): [T, U, V][] {
            let theseItems: T[] = this.toArray();
            if(theseItems.length != items2.length) {
                throw "Cannot merge arrays of different lengths";
            }
            
            let mergedItems: [T, U, V][] = [];
            for(let i=0; i<theseItems.length; i++) {
                mergedItems.push([theseItems[i], items2[i], items3[i]]);
            }
            return mergedItems;
        }
    }

    export function diff(size: number, a: number, b: number) : number {
        let ax = a % size;
        let bx = b % size;
        if(ax == bx) return 0;

        let d1 = bx - ax;
        let d2 = 0;

        if(d1 > 0) {
            d2 = -((ax + size) - bx);
        }
        else {
            d2 = (bx + size) - ax;
        }
        return Math.abs(d1) > Math.abs(d2) ? d2 : d1;
    }
}

let modTest = new mod.Mod<number>([0,1,2,3,4,5]);