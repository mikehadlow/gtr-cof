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

        diff(a: number, b: number) : number {
            let ax = a % this.size;
            let bx = b % this.size;
            if(ax == bx) return 0;

            let d1 = bx - ax;
            let d2 = 0;

            if(d1 > 0) {
                d2 = -((ax + this.size) - bx);
            }
            else {
                d2 = (bx + this.size) - ax;
            }
            return Math.abs(d1) > Math.abs(d2) ? d2 : d1;
        }
    }
}

let modTest = new mod.Mod<number>([0,1,2,3,4,5]);