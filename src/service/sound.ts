import { Soundfont } from "smplr";
import type { Msg } from "../message";
import type { Model } from "../model";
import type { Service } from "../types";

type Play = Extract<Msg, { id: "Play" }>;

export const create = (): Service<Model, Play, Msg> => {
    let context: AudioContext;
    let soundfont: Soundfont | null = null;

    const play = (midiNotes: number[]) => {
        if (soundfont === null) {
            context = new AudioContext();
            soundfont = new Soundfont(context, { instrument: "acoustic_grand_piano" });
            soundfont.load.then(() => {
                midiNotes.forEach((midiNote) => {
                    soundfont?.start({ note: midiNote, velocity: 127 });
                });
            });
            return;
        }
        midiNotes.forEach((midiNote) => {
            soundfont?.start({ note: midiNote, velocity: 127 });
        });
    };

    return (_model: Model, { midiNotes }: Play, _raise: (msg: Msg) => void): void => {
        play(midiNotes);
    };
};
