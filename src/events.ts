import type { State, FretboardLabelType } from './types';
import * as music from './music';

export class Bus<T> {
    private listeners: Array<(x: T) => void> = [];
    private name: string;

    // name should be the name of the exported variable in 'events' that the bus instance is assigned to.
    constructor(name: string) {
        this.name = name;
    }

    public subscribe(listener: (x: T) => void): void {
        this.listeners.push(listener);
    }

    // first call should be passed index = -1
    public resubscribe(listener: (x: T) => void, index: number): number {
        if (index === -1) {
            return this.listeners.push(listener) - 1;
        }
        this.listeners[index] = listener;
        return index;
    }

    public publish(event: T): void {
        //console.log("Published event: '" + this.name + "'")
        for (const listener of this.listeners) {
            listener(event);
        }
    }
}

export const stateChange: Bus<StateChangedEvent> = new Bus<StateChangedEvent>("stateChange");

export type StateChangedEvent = {
    readonly state: State;
}

export const scaleChange: Bus<ScaleChangedEvent> = new Bus<ScaleChangedEvent>("scaleChange");

export type ScaleChangedEvent = {
    readonly nodes: music.Node[];
    readonly mode: music.Mode;
}

export const tonicChange: Bus<TonicChangedEvent> = new Bus<TonicChangedEvent>("tonicChange");

export type TonicChangedEvent = {
    readonly noteSpec: music.NoteSpec;
}

export const modeChange: Bus<ModeChangedEvent> = new Bus<ModeChangedEvent>("modeChange");

export type ModeChangedEvent = {
    readonly mode: music.Mode;
}

export const chordChange: Bus<ChordChangeEvent> = new Bus<ChordChangeEvent>("chordChange");

export type ChordChangeEvent = {
    readonly chordIndex: number;
}

export const toggle: Bus<ToggleEvent> = new Bus<ToggleEvent>("toggle");

export type ToggleEvent = {
    readonly index: number;
}

export const tuningChange: Bus<TuningChangedEvent> = new Bus<TuningChangedEvent>("tuningChange");

export type TuningChangedEvent = {
    readonly index: number;
}

export const leftHandedChange: Bus<LeftHandedFretboardEvent> = new Bus<LeftHandedFretboardEvent>("leftHandedChange");

export type LeftHandedFretboardEvent = {
    readonly isLeftHanded: boolean;
}

export const flipNutChange: Bus<FlipNutEvent> = new Bus<FlipNutEvent>("flipNutChange");

export type FlipNutEvent = {
    readonly isNutFlipped: boolean;
}

export const fretboardLabelChange: Bus<FretboardLabelChangeEvent> = new Bus<FretboardLabelChangeEvent>("fretboardLabelChange");

export type FretboardLabelChangeEvent = {
    readonly labelType: FretboardLabelType;
}

export const chordIntervalChange: Bus<ChordIntervalChangeEvent> = new Bus<ChordIntervalChangeEvent>("chordIntervalChange");

export type ChordIntervalChangeEvent = {
    readonly chordIntervals: number[];
}

export const scaleFamilyChange: Bus<ScaleFamilyChangeEvent> = new Bus<ScaleFamilyChangeEvent>("scaleFamilyChange");

export type ScaleFamilyChangeEvent = {
    readonly scaleFamily: music.ScaleFamily;
}

export const midiNote: Bus<MidiNoteEvent> = new Bus<MidiNoteEvent>("midiNoteEvent");

export type MidiNoteEvent = {
    readonly toggledIndexes: number;
}

export const setCToNoon: Bus<SetCToNoonEvent> = new Bus<SetCToNoonEvent>("setCToNoonEvent");

export type SetCToNoonEvent = {
    readonly isC: boolean;
}
