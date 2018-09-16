import * as d3 from "d3"
import * as chordInterval from "./chord-interval-module"
import { NoteCircle } from "./cof-module"
import * as cookies from "./cookie-module"
import * as gtr from "./gtr-module"
import * as modes from "./modes-module"
import * as music from "./music-module"
import * as scaleFamily from "./scale-family-module"
import * as state from "./state-module"
import * as tonics from "./tonics-module"
import * as tuning from "./tuning-module"

tonics.init()
modes.init(music.scaleFamily[0])
chordInterval.init()
const chromatic = new NoteCircle(d3.select("#chromatic"), music.chromatic(), "Chromatic")
const circleOfFifths = new NoteCircle(d3.select("#cof"), music.fifths(), "Circle of Fifths")

gtr.init()
tuning.init()
scaleFamily.init()
state.init()
cookies.init()
