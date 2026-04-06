import { Soundfont } from "smplr";
import type { Msg } from "../message";
import type { Model } from "../model";
import type { Service } from "../types";

type Play = Extract<Msg, { id: "Play" }>;

export const create = (): Service<Model, Play, Msg> => {
    let context: AudioContext;
    let soundfont: Soundfont | null = null;

    const play = (midiNode: number) => {
        if (soundfont === null) {
            context = new AudioContext();
            soundfont = new Soundfont(context, { instrument: "acoustic_grand_piano" });
            soundfont.load.then(() => {
                soundfont?.start({ note: midiNode, velocity: 127 });
            });
        } else {
            soundfont?.start({ note: midiNode, velocity: 127 });
        }
    };

    return (_model: Model, { midiNote }: Play, _raise: (msg: Msg) => void): void => {
        play(midiNote);
    };
};
