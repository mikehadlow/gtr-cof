import type { Msg } from "../message";
import type { Model } from "../model";
import { getNodeAtIndex } from "../music";
import type { Service } from "../types";

type Toggle = Extract<Msg, { id: "Toggle" }>;

const defaultOctave = 3;

export const service: Service<Model, Toggle, Msg> = (model: Model, msg: Toggle, raise: (msg: Msg) => void): void => {
    console.log(`Toggle message: ${msg.id}, index: ${msg.index}`);
    const node = getNodeAtIndex(model.music.nodes, msg.index);
    if (node.toggle) {
        // toggling on note, so it should be played
        console.log(`ON  node ${node.scaleNote.note.label}`);
        raise({
            id: "Play",
            index: msg.index,
            octave: defaultOctave,
        });
    } else {
        console.log(`OFF node ${node.scaleNote.note.label}`);
    }
};
