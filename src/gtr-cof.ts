///<reference path="../node_modules/@types/d3/index.d.ts" />

tonics.init();
modes.init();
let chromatic = new cof.NoteCircle(d3.select("#chromatic"), music.chromatic(), "Chromatic");
let circleOfFifths = new cof.NoteCircle(d3.select("#cof"), music.fifths(), "Circle of Fifths");
gtr.init(tuning.tunings[0]);
tuning.init();
state.init();