///<reference path="../node_modules/@types/d3/index.d.ts" />

tonics.init();
modes.init();
let chromatic = new cof.NoteCircle(d3.select("#chromatic"), music2.chromatic(), "Chromatic");
let circleOfFifths = new cof.NoteCircle(d3.select("#cof"), music2.fifths(), "Circle of Fifths");
gtr.init();
tuning.init();
state.init();
cookies.init();