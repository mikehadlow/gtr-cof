import * as music from './music';
import type { State } from './types';

export type Model = {
    music: {
        readonly nodes: music.Node[];
        readonly mode: music.Mode;
    },
    state: State
}
