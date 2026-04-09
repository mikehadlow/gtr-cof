import type * as music from "./music";
import type { FretboardLabelType, ModalState } from "./types";

export type SequenceEvent = {
    timestamp: number; // miliseconds
    midiNotes: number[];
};

export type Msg =
    | {
          id: "TonicChanged";
          noteSpec: music.NoteSpec;
      }
    | {
          id: "ModeChanged";
          mode: music.Mode;
      }
    | {
          id: "ChordChanged";
          chordIndex: number;
      }
    | {
          id: "Toggle";
          index: number;
      }
    | {
          id: "ChordIntervalChange";
          chordIntervals: number[];
      }
    | {
          id: "ScaleFamilyChange";
          scaleFamily: music.ScaleFamily;
      }
    | {
          // Fretboard only messages
          id: "TuningChanged";
          index: number;
      }
    | {
          id: "LeftHandedFretboard";
          isLeftHanded: boolean;
      }
    | {
          id: "FlipNut";
          isNutFlipped: boolean;
      }
    | {
          id: "FretboardLabelChange";
          labelType: FretboardLabelType;
      }
    | {
          // CoF only message
          id: "SetCToNoon";
          isC: boolean;
      }
    | {
          id: "ModalStateChange";
          modalState: ModalState;
      }
    | {
          id: "Play";
          sequence: SequenceEvent[];
      }
    | {
          id: "ToggleSound";
      };
