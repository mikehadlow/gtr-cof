import * as d3 from 'd3';
import * as menu from './menu';
import * as tonics from './tonics';
import * as modes from './modes';
import * as chordInterval from './chord-interval';
import * as cof from './cof';
import * as gtr from './gtr';
import * as tuning from './tuning';
import * as scaleFamily from './scale-family';
import * as settings from './settings';
import * as permalink from './permalink';
import * as state from './state';
import * as cookies from './cookie';
import * as music from './music';

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
