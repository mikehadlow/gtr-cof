///<reference path="../node_modules/@types/d3/index.d.ts" />

menu.init();
tonics.init();
modes.init(music.scaleFamily[0]);
chordInterval.init();
let chromatic = new cof.NoteCircle(d3.select("#chromatic"), music.chromatic(), "Chromatic");
let circleOfFifths = new cof.NoteCircle(d3.select("#cof"), music.fifths(), "Circle of Fifths");
gtr.init();
tuning.init();
scaleFamily.init();
settings.init();
permalink.init();
state.init();
cookies.init();