import { Soundfont } from "smplr";
import type { Msg, SequenceEvent } from "../message";
import type { Model } from "../model";
import type { Service } from "../types";

type Play = Extract<Msg, { id: "Play" }>;

export const create = (): Service<Model, Play, Msg> => {
    let context: AudioContext;
    let soundfont: Soundfont | null = null;

    const play = (seqence: SequenceEvent[]) => {
        if (soundfont === null) {
            context = new AudioContext();
            soundfont = new Soundfont(context, { instrument: "acoustic_grand_piano" });
            soundfont.load
                .then(() => {
                    playSequence(seqence);
                })
                .catch((e: unknown) => {
                    console.error("Failed to load soundfont", e);
                });
            return;
        }
        playSequence(seqence);
    };

    const playSequence = (seqence: SequenceEvent[]) => {
        const now = context.currentTime;
        seqence.forEach((event) => {
            event.midiNotes.forEach((midiNote) => {
                soundfont?.start({ note: midiNote, time: now + event.timestamp / 1000, velocity: 127, duration: 0.3 });
            });
        });
    };

    return (_model: Model, { sequence }: Play, _raise: (msg: Msg) => void): void => {
        play(sequence);
    };
};
