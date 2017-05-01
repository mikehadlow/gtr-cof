namespace events {
    export class Bus<T> {
        private listeners: Array<(x:T)=>void> = [];

        public subscribe(listener: (x:T)=>void): void {
            this.listeners.push(listener);
        }

        public publish(event: T): void {
            for (let listener of this.listeners) {
                listener(event);
            }
        }
    }

    export let scaleChange: Bus<ScaleChangedEvent> = new Bus<ScaleChangedEvent>();

    export interface ScaleChangedEvent {
        readonly mode: music.Mode;
        readonly noteBase: music.NoteBase;
        readonly index: number;
        readonly scale2: Array<music.ScaleNote>;
    }
}