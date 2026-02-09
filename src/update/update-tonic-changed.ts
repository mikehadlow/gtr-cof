import { type Update as UpdateModel, State } from "../types";
import { type Model } from "../model";
import * as music from '../music';

export const Update: UpdateModel<Model, { id: "TonicChanged", noteSpec: music.NoteSpec }> = (model, msg) => {
    const current = model.state;

    current.index = msg.noteSpec.index;
    current.naturalIndex = msg.noteSpec.natural.index;
    current.chordIndex = -1;
    return updateScale(current);
}

const updateScale = (current: State): Model => {

    const scaleFamily = music.scaleFamily.find(x => x.index == current.scaleFamilyIndex);
    if (!scaleFamily) {
        throw "scaleFamily is " + scaleFamily + ", current.scaleFamilyIndex = " + current.scaleFamilyIndex;
    }
    const mode = scaleFamily.modes.find(x => x.index == current.modeIndex);
    if (!mode) {
        throw "mode is " + mode + "current.modeIndex" + current.modeIndex;
    }
    const noteSpec = music.createNoteSpec(current.naturalIndex, current.index);

    const nodes = music.generateScaleShim(
        noteSpec,
        mode,
        current.chordIndex,
        current.chordIntervals,
        current.toggledIndexes,
        current.midiToggledIndexes,
        scaleFamily);

    // update togges, because a chord may have been generated.
    current.toggledIndexes = nodes
        .filter(x => x.toggle)
        .map(x => x.scaleNote.note.index)
        .reduce((a, b) => a + 2 ** b, 0);

    return {
        music: {
            nodes: nodes,
            mode: mode
        },
        state: current
    }
}

/*
TonicChangedEvent: {
  "noteSpec": {
    "natural": {
      "id": 0,
      "index": 0,
      "label": "A"
    },
    "index": 11,
    "offset": -1,
    "label": "A♭"
  }
}
TonicChangedEvent: {
  "noteSpec": {
    "natural": {
      "id": 0,
      "index": 0,
      "label": "A"
    },
    "index": 0,
    "offset": 0,
    "label": "A"
  }
}
TonicChangedEvent: {
  "noteSpec": {
    "natural": {
      "id": 0,
      "index": 0,
      "label": "A"
    },
    "index": 1,
    "offset": 1,
    "label": "A♯"
  }
}
TonicChangedEvent: {
  "noteSpec": {
    "natural": {
      "id": 1,
      "index": 2,
      "label": "B"
    },
    "index": 1,
    "offset": -1,
    "label": "B♭"
  }
}
TonicChangedEvent: {
  "noteSpec": {
    "natural": {
      "id": 1,
      "index": 2,
      "label": "B"
    },
    "index": 2,
    "offset": 0,
    "label": "B"
  }
}
TonicChangedEvent: {
  "noteSpec": {
    "natural": {
      "id": 1,
      "index": 2,
      "label": "B"
    },
    "index": 3,
    "offset": 1,
    "label": "B♯"
  }
}
...
TonicChangedEvent: {
  "noteSpec": {
    "natural": {
      "id": 6,
      "index": 10,
      "label": "G"
    },
    "index": 11,
    "offset": 1,
    "label": "G♯"
  }
}
*/
