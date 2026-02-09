import { type Update as UpdateModel } from "../types";
import { type Model } from "../model";
import * as music from '../music';
import { updateScale } from "./index";

export const Update: UpdateModel<Model, { id: "TonicChanged", noteSpec: music.NoteSpec }> = (model, msg) => {
    const current = model.state;

    current.index = msg.noteSpec.index;
    current.naturalIndex = msg.noteSpec.natural.index;
    current.chordIndex = -1;
    return updateScale(current);
}
