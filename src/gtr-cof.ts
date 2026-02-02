import './d3-global.d.ts';

import * as menu from './menu-module';
import * as tonics from './tonics-module';
import * as modes from './modes-module';
import * as chordInterval from './chord-interval-module';
import * as cof from './cof-module';
import * as gtr from './gtr-module';
import * as tuning from './tuning-module';
import * as scaleFamily from './scale-family-module';
import * as settings from './settings-module';
import * as permalink from './permalink-module';
import * as state from './state-module';
import * as cookies from './cookie-module';
import * as music from './music-module';

// Expose modules for HTML onclick handlers
declare global {
    interface Window {
        settings: typeof settings;
        permalink: typeof permalink;
    }
}
window.settings = settings;
window.permalink = permalink;

// Initialize modules
menu.init();
tonics.init();
modes.init(music.scaleFamily[0]);
chordInterval.init();
new cof.NoteCircle(d3.select("#chromatic"), music.chromatic(), "Chromatic");
new cof.NoteCircle(d3.select("#cof"), music.fifths(), "Circle of Fifths");
gtr.init();
tuning.init();
scaleFamily.init();
settings.init();
permalink.init();
state.init();
cookies.init();
