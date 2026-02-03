var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/menu-module.ts
function init() {
  let menuItems = document.getElementsByClassName("menu");
  for (let menuItem of menuItems) {
    menuItem.addEventListener("click", onMenuClick);
  }
  document.addEventListener("mouseup", (event) => {
    let targetElement = event.target;
    if (targetElement.closest(".dropdown-content") === null && targetElement.closest(".menu") === null) {
      let contentElements = document.getElementsByClassName("dropdown-content");
      for (let contentElement of contentElements) {
        if (contentElement.classList.contains("dropdown-content-visible")) {
          contentElement.classList.remove("dropdown-content-visible");
        }
      }
    }
  });
}
function onMenuClick(event) {
  let menuElement = event.target;
  let currentContentElement = menuElement.parentElement.querySelector(".dropdown-content");
  let contentElements = document.getElementsByClassName("dropdown-content");
  for (let contentElement of contentElements) {
    if (contentElement === currentContentElement) {
      currentContentElement.classList.toggle("dropdown-content-visible");
    } else {
      contentElement.classList.remove("dropdown-content-visible");
    }
  }
}

// src/events-module.ts
class Bus {
  listeners = [];
  name;
  constructor(name) {
    this.name = name;
  }
  subscribe(listener) {
    this.listeners.push(listener);
  }
  resubscribe(listener, index) {
    if (index === -1) {
      return this.listeners.push(listener) - 1;
    }
    this.listeners[index] = listener;
    return index;
  }
  publish(event) {
    for (let listener of this.listeners) {
      listener(event);
    }
  }
}
var stateChange = new Bus("stateChange");
var scaleChange = new Bus("scaleChange");
var tonicChange = new Bus("tonicChange");
var modeChange = new Bus("modeChange");
var chordChange = new Bus("chordChange");
var toggle = new Bus("toggle");
var tuningChange = new Bus("tuningChange");
var leftHandedChange = new Bus("leftHandedChange");
var flipNutChange = new Bus("flipNutChange");
var fretboardLabelChange = new Bus("fretboardLabelChange");
var chordIntervalChange = new Bus("chordIntervalChange");
var scaleFamilyChange = new Bus("scaleFamilyChange");
var midiNote = new Bus("midiNoteEvent");
var setCToNoon = new Bus("setCToNoonEvent");

// src/mod-module.ts
class Mod {
  size = 0;
  items;
  start = 0;
  constructor(items) {
    this.items = items;
    this.size = items.length;
  }
  setStart(start) {
    this.start = start % this.size;
  }
  itemAt(index) {
    return this.items[(this.start + index) % this.size];
  }
  toArray() {
    let newArray = [];
    for (let i = 0;i < this.size; i++) {
      newArray.push(this.items[(i + this.start) % this.size]);
    }
    return newArray;
  }
  merge(items) {
    let theseItems = this.toArray();
    return zip(theseItems, items);
  }
  merge3(items2, items3) {
    let theseItems = this.toArray();
    return zip3(theseItems, items2, items3);
  }
}
function zip(a, b) {
  if (a.length != b.length) {
    throw "Cannot merge arrays of different lengths";
  }
  return a.map((x, i) => [x, b[i]]);
}
function zip3(a, b, c) {
  if (a.length != b.length || a.length != c.length) {
    throw "Cannot merge arrays of different lengths";
  }
  return a.map((x, i) => [x, b[i], c[i]]);
}
function diff(size, a, b) {
  let ax = a % size;
  let bx = b % size;
  if (ax == bx)
    return 0;
  let d1 = bx - ax;
  let d2 = 0;
  if (d1 > 0) {
    d2 = -(ax + size - bx);
  } else {
    d2 = bx + size - ax;
  }
  return Math.abs(d1) > Math.abs(d2) ? d2 : d1;
}

// src/music-module.ts
var intervalName = {};
intervalName[0 /* Nat */] = "";
intervalName[1 /* Maj */] = "M";
intervalName[2 /* Min */] = "m";
intervalName[3 /* Aug */] = "A";
intervalName[4 /* Dim */] = "d";
var getIntervalName = (interval) => intervalName[interval.type] + (interval.ord + 1);
var intervals = new Mod([
  [{ ord: 0, type: 0 /* Nat */, colour: 16010050 }, { ord: 1, type: 4 /* Dim */, colour: 16010050 }],
  [{ ord: 1, type: 2 /* Min */, colour: 16025922 }, { ord: 0, type: 3 /* Aug */, colour: 16025922 }],
  [{ ord: 1, type: 1 /* Maj */, colour: 16039746 }, { ord: 2, type: 4 /* Dim */, colour: 16039746 }],
  [{ ord: 2, type: 2 /* Min */, colour: 16051778 }, { ord: 1, type: 3 /* Aug */, colour: 16051778 }],
  [{ ord: 2, type: 1 /* Maj */, colour: 9237570 }, { ord: 3, type: 4 /* Dim */, colour: 9237570 }],
  [{ ord: 3, type: 0 /* Nat */, colour: 4388031 }, { ord: 2, type: 3 /* Aug */, colour: 4388031 }],
  [{ ord: 4, type: 4 /* Dim */, colour: 4379892 }, { ord: 3, type: 3 /* Aug */, colour: 4379892 }],
  [{ ord: 4, type: 0 /* Nat */, colour: 4366068 }, { ord: 5, type: 4 /* Dim */, colour: 4366068 }],
  [{ ord: 5, type: 2 /* Min */, colour: 15024884 }, { ord: 4, type: 3 /* Aug */, colour: 15024884 }],
  [{ ord: 5, type: 1 /* Maj */, colour: 16007817 }, { ord: 6, type: 4 /* Dim */, colour: 16007817 }],
  [{ ord: 6, type: 2 /* Min */, colour: 16745090 }, { ord: 5, type: 3 /* Aug */, colour: 16745090 }],
  [{ ord: 6, type: 1 /* Maj */, colour: 16745212 }, { ord: 0, type: 4 /* Dim */, colour: 16745212 }]
]);
function notesInScaleFamily(scaleFamily) {
  return scaleFamily.intervals.items.filter((x) => x).length;
}
var diatonicModes = [
  { name: "Lydian", index: 5 },
  { name: "Major / Ionian", index: 0 },
  { name: "Mixolydian", index: 7 },
  { name: "Dorian", index: 2 },
  { name: "N Minor / Aeolian", index: 9 },
  { name: "Phrygian", index: 4 },
  { name: "Locrian", index: 11 }
];
var harmonicMinorModes = [
  { name: "Lydian ♯2", index: 5 },
  { name: "Ionian ♯5", index: 0 },
  { name: "Superlocrian", index: 8 },
  { name: "Dorian ♯4", index: 2 },
  { name: "Harmonic Minor", index: 9 },
  { name: "Phrygian Dominant", index: 4 },
  { name: "Locrian ♯6", index: 11 }
];
var jazzMinorModes = [
  { name: "Lydian Dominant", index: 5 },
  { name: "Jazz Minor", index: 0 },
  { name: "Mixolydian ♭6", index: 7 },
  { name: "Assyrian", index: 2 },
  { name: "Locrian ♮2", index: 9 },
  { name: "Lydian Augmented", index: 3 },
  { name: "Altered scale", index: 11 }
];
var scaleFamily = [
  { index: 0, name: "diatonic", intervals: new Mod([true, false, true, false, true, true, false, true, false, true, false, true]), modes: diatonicModes, defaultModeIndex: 0 },
  { index: 1, name: "harmonic minor", intervals: new Mod([true, false, true, false, true, true, false, false, true, true, false, true]), modes: harmonicMinorModes, defaultModeIndex: 9 },
  { index: 2, name: "jazz minor", intervals: new Mod([true, false, true, true, false, true, false, true, false, true, false, true]), modes: jazzMinorModes, defaultModeIndex: 0 },
  { index: 3, name: "whole tone", intervals: new Mod([true, false, true, false, true, false, true, false, true, false, true, false]), modes: [{ name: "Whole Tone", index: 0 }], defaultModeIndex: 0 },
  { index: 4, name: "diminished", intervals: new Mod([true, false, true, true, false, true, true, false, true, true, false, true]), modes: [{ name: "Diminished", index: 0 }], defaultModeIndex: 0 }
];
var diatonic = new Mod([true, false, true, false, true, true, false, true, false, true, false, true]);
var indexList = new Mod([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
function createNoteSpec(naturalIndex, index) {
  let natural = naturals.filter((x) => x.index === naturalIndex)[0];
  if (!naturals.some((x) => x.index === naturalIndex)) {
    throw "naturalIndex is not valid: " + naturalIndex;
  }
  let offset = diff(12, naturalIndex, index);
  if (Math.abs(offset) > 2) {
    throw "offset between naturalIndex: " + naturalIndex + ", and index: " + index + ", is invalid: " + offset;
  }
  let noteLabel = noteLabels.filter((x) => x.offset === offset)[0];
  return {
    natural,
    index,
    offset,
    label: natural.label + noteLabel.label
  };
}
var naturals = [
  { id: 0, index: 0, label: "A" },
  { id: 1, index: 2, label: "B" },
  { id: 2, index: 3, label: "C" },
  { id: 3, index: 5, label: "D" },
  { id: 4, index: 7, label: "E" },
  { id: 5, index: 8, label: "F" },
  { id: 6, index: 10, label: "G" }
];
var naturalList = new Mod(naturals);
var noteNames = [
  { name: "A", index: 0 },
  { name: "A♯", index: 1 },
  { name: "A♭", index: 11 },
  { name: "B", index: 2 },
  { name: "B♯", index: 3 },
  { name: "B♭", index: 1 },
  { name: "C", index: 3 },
  { name: "C♯", index: 4 },
  { name: "C♭", index: 2 },
  { name: "D", index: 5 },
  { name: "D♯", index: 6 },
  { name: "D♭", index: 4 },
  { name: "E", index: 7 },
  { name: "E♯", index: 8 },
  { name: "E♭", index: 6 },
  { name: "F", index: 8 },
  { name: "F♯", index: 9 },
  { name: "F♭", index: 7 },
  { name: "G", index: 10 },
  { name: "G♯", index: 11 },
  { name: "G♭", index: 9 }
];
var noteLabels = [
  { offset: 0, label: "" },
  { offset: 1, label: "♯" },
  { offset: 2, label: "x" },
  { offset: -1, label: "♭" },
  { offset: -2, label: "♭♭" }
];
var nullNode = {
  scaleNote: {
    note: {
      natural: {
        id: 0,
        index: 0,
        label: ""
      },
      index: 0,
      offset: 0,
      label: ""
    },
    interval: {
      ord: 0,
      type: 0,
      colour: 0
    },
    intervalName: "",
    isScaleNote: false,
    noteNumber: 0
  },
  chordInterval: {
    ord: 0,
    type: 0,
    colour: 0
  },
  intervalName: "",
  isChordRoot: false,
  toggle: false,
  midiToggle: false
};
function generateScaleShim(noteSpec, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamilyArg) {
  let scale = generateScale(noteSpec, mode, scaleFamilyArg);
  zip(scale, generateChordNumbers(scale, mode, scaleFamilyArg.intervals)).forEach((x) => x[0].chord = x[1]);
  if (chordIndex === -1) {
    return generateNodes(scale, mode, scale[0].note.index, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamilyArg.intervals);
  } else {
    return generateNodes(scale, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamilyArg.intervals, true);
  }
}
function generateScale(noteSpec, mode, scaleFamilyArg) {
  indexList.setStart(noteSpec.index);
  naturalList.setStart(noteSpec.natural.id);
  scaleFamilyArg.intervals.setStart(mode.index);
  intervals.setStart(0);
  let workingSet = indexList.merge3(buildScaleCounter(scaleFamilyArg.intervals.toArray()), intervals.toArray());
  let isSevenNoteScale = notesInScaleFamily(scaleFamilyArg) == 7;
  return workingSet.map((item) => {
    let index = item[0];
    let isScaleNote = item[1][0];
    let noteNumber;
    let natural;
    let activeInterval;
    if (isScaleNote && isSevenNoteScale) {
      noteNumber = item[1][1];
      natural = naturalList.itemAt(noteNumber);
      activeInterval = item[2].filter((x) => x.ord == noteNumber)[0];
      if (activeInterval == null) {
        activeInterval = item[2][0];
      }
    } else {
      activeInterval = item[2][0];
      noteNumber = isScaleNote ? item[1][1] : activeInterval.ord;
      natural = naturalList.itemAt(activeInterval.ord);
    }
    return {
      note: createNoteSpec(natural.index, index),
      interval: activeInterval,
      intervalName: getIntervalName(activeInterval),
      isScaleNote,
      noteNumber
    };
  });
}
function generateNodes(scaleNotes, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamilyIntervals, chordSelected = false) {
  let chordIndexOffset = (chordIndex + 12 - scaleNotes[0].note.index) % 12;
  intervals.setStart(12 - chordIndexOffset);
  scaleFamilyIntervals.setStart(mode.index);
  let startAt = scaleNotes.filter((x) => x.note.index === chordIndex)[0].noteNumber;
  let workingSet = intervals.merge3(scaleNotes, buildScaleCounter(scaleFamilyIntervals.toArray(), startAt));
  return workingSet.map((item) => {
    let chordIntervalCandidates = item[0];
    let scaleNote = item[1];
    let scaleCounter = item[2];
    let activeInterval = scaleNote.isScaleNote ? chordIntervalCandidates.filter((x) => x.ord === scaleCounter[1])[0] : chordIntervalCandidates[0];
    if (activeInterval == null) {
      activeInterval = chordIntervalCandidates[0];
    }
    return {
      scaleNote,
      chordInterval: activeInterval,
      intervalName: getIntervalName(activeInterval),
      isChordRoot: chordSelected && activeInterval.ord === 0 && activeInterval.type === 0,
      toggle: calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals),
      midiToggle: (toggledMidiNotes & 2 ** scaleNote.note.index) != 0
    };
  });
}
function buildScaleCounter(diatonic2, startAt = 0) {
  let noteCount = diatonic2.filter((x) => x).length;
  let i = (noteCount - startAt) % noteCount;
  return diatonic2.map((isNote) => {
    if (isNote) {
      let value = [true, i];
      i = (i + 1) % noteCount;
      return value;
    }
    return [false, 0];
  });
}
var romanNumeral = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
function generateChordNumbers(scaleNotes, mode, scaleFamilyIntervals) {
  return scaleNotes.map((scaleNote, i) => {
    if (scaleNote.isScaleNote) {
      let roman = romanNumeral[scaleNote.noteNumber];
      let nodes = generateNodes(scaleNotes, mode, scaleNote.note.index, [], 0, 0, scaleFamilyIntervals);
      let diminished = "";
      let type = 1 /* Minor */;
      if (nodes.some((x) => x.scaleNote.isScaleNote && x.chordInterval.ord === 4 && x.chordInterval.type === 4 /* Dim */)) {
        diminished = "°";
        type = 2 /* Diminished */;
      } else if (nodes.some((x) => x.scaleNote.isScaleNote && x.chordInterval.ord === 4 && x.chordInterval.type === 3 /* Aug */)) {
        diminished = "+";
        type = 3 /* Augmented */;
      } else if (nodes.some((x) => x.scaleNote.isScaleNote && x.chordInterval.ord === 2 && x.chordInterval.type === 1 /* Maj */)) {
        roman = roman.toLocaleUpperCase();
        type = 0 /* Major */;
      }
      return {
        romanNumeral: roman + diminished,
        type
      };
    }
    return {
      romanNumeral: "",
      type: 0 /* Major */
    };
  });
}
function calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals) {
  if (toggledIndexes === 0) {
    return chordSelected && scaleNote.isScaleNote && chordIntervals.some((x) => activeInterval.ord === x);
  }
  return (toggledIndexes & 2 ** scaleNote.note.index) != 0;
}
function fifths() {
  let indexes = [];
  let current = 0;
  for (let i = 0;i < 12; i++) {
    indexes.push(current);
    current = (current + 7) % 12;
  }
  return indexes;
}
function chromatic() {
  let indexes = [];
  for (let i = 0;i < 12; i++) {
    indexes.push(i);
  }
  return indexes;
}

// src/tonics-module.ts
var buttons;
function bg(natural) {
  let flatIndex = natural.index == 0 ? 11 : natural.index - 1;
  let sharpIndex = (natural.index + 1) % 12;
  return [
    { noteSpec: createNoteSpec(natural.index, flatIndex) },
    { noteSpec: createNoteSpec(natural.index, natural.index) },
    { noteSpec: createNoteSpec(natural.index, sharpIndex) }
  ];
}
function init2() {
  let pad = 5;
  let buttonHeight = 25;
  let svg = d3.select("#modes");
  let tonics = svg.append("g");
  let gs = tonics.selectAll("g").data(naturals).enter().append("g").attr("transform", function(d, i) {
    return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")";
  }).selectAll("g").data((d) => bg(d), indexer).enter().append("g").attr("transform", function(d, i) {
    return "translate(" + i * 55 + ", 0)";
  });
  buttons = gs.append("rect").attr("x", pad).attr("y", 0).attr("strokeWidth", 2).attr("width", 40).attr("height", 25).attr("class", (d) => isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button").on("click", (d) => tonicChange.publish({ noteSpec: d.noteSpec }));
  gs.append("text").attr("x", pad + 10).attr("y", 17).text(function(x) {
    return x.noteSpec.label;
  }).attr("class", "tonic-text");
  tonicChange.subscribe(listener);
}
function listener(tonicChanged) {
  let ds = [{
    noteSpec: tonicChanged.noteSpec
  }];
  buttons.data(ds, indexer).attr("class", "tonic-button tonic-button-selected").exit().attr("class", (d) => isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button");
}
function indexer(d) {
  return d.noteSpec.label;
}
function isSameNoteAsNatural(noteSpec) {
  return naturals.some((x) => x.index === noteSpec.index && x.index != noteSpec.natural.index);
}

// src/modes-module.ts
var buttons2;
var modes;
function init3(scaleFamily2) {
  let svg = d3.select("#modes");
  modes = svg.append("g").attr("transform", "translate(0, 280)");
  drawButtons(scaleFamily2);
  modeChange.subscribe(update);
  scaleFamilyChange.subscribe(handleScaleFamilyChangedEvent);
}
function drawButtons(scaleFamily2) {
  let pad = 5;
  let buttonHeight = 25;
  modes.selectAll("g").remove();
  let gs = modes.selectAll("g").data(scaleFamily2.modes, index);
  gs.exit().remove();
  gs.enter().append("g").attr("transform", (d, i) => "translate(0, " + (i * (buttonHeight + pad) + pad) + ")");
  buttons2 = gs.append("rect").attr("x", pad).attr("y", 0).attr("strokeWidth", 2).attr("width", 150).attr("height", 25).attr("class", "mode-button").on("click", (d) => modeChange.publish({ mode: d }));
  gs.append("text").attr("x", pad + 10).attr("y", 17).text((x) => x.name).attr("class", "mode-text");
  let defaultMode = scaleFamily2.modes.find((x) => x.index == scaleFamily2.defaultModeIndex);
  highlightActiveMode(defaultMode);
}
function update(modeChange2) {
  highlightActiveMode(modeChange2.mode);
}
function highlightActiveMode(mode) {
  let modes2 = [mode];
  buttons2.data(modes2, index).attr("class", "mode-button mode-button-selected").exit().attr("class", "mode-button");
}
function handleScaleFamilyChangedEvent(scaleFamilyChangedEvent) {
  drawButtons(scaleFamilyChangedEvent.scaleFamily);
}
function index(mode) {
  return mode.index.toString();
}

// src/chord-interval-module.ts
var buttons3;
var toggle2 = 0;
function init4() {
  let radius = 10;
  let pad = 2;
  let svg = d3.select("#modes");
  let intervals2 = svg.append("g").attr("transform", "translate(0, 240)");
  let gs = intervals2.selectAll("g").data([0, 1, 2, 3, 4, 5, 6], function(i) {
    return i.toString();
  }).enter().append("g").attr("transform", function(d, i) {
    return "translate(" + (i * (radius * 2 + pad) + pad) + ", 0)";
  });
  buttons3 = gs.append("circle").attr("cx", radius).attr("cy", radius).attr("r", radius).attr("strokeWidth", 2).attr("class", "mode-button").on("click", onClick);
  gs.append("text").attr("x", radius).attr("y", radius + 5).attr("text-anchor", "middle").text(function(x) {
    return x + 1;
  });
  chordIntervalChange.subscribe(update2);
}
function onClick(x) {
  let updatedToggle = toggle2 ^ 2 ** x;
  let chordIntervals = [0, 1, 2, 3, 4, 5, 6].filter((x2) => (2 ** x2 & updatedToggle) === 2 ** x2);
  chordIntervalChange.publish({ chordIntervals });
}
function update2(event) {
  toggle2 = 0;
  event.chordIntervals.forEach((x) => toggle2 = toggle2 + 2 ** x);
  buttons3.data(event.chordIntervals, function(m) {
    return m.toString();
  }).attr("class", "mode-button mode-button-selected").exit().attr("class", "mode-button");
}

// src/cof-module.ts
class NoteCircle {
  indexer = (x) => x.index + "";
  constructor(svg, noteIndexes, label) {
    let state = this.draw(svg, rotate(noteIndexes, 3), label);
    let setCToNoonSubscriptionIndex = -1;
    scaleChange.subscribe((scaleChnaged) => {
      this.update(scaleChnaged, state);
      setCToNoonSubscriptionIndex = setCToNoon.resubscribe((setCToNoonEvent) => {
        let offset = setCToNoonEvent.isC ? 3 : 0;
        svg.selectAll("*").remove();
        state = this.draw(svg, rotate(noteIndexes, offset), label);
        this.update(scaleChnaged, state);
      }, setCToNoonSubscriptionIndex);
    });
  }
  draw(svg, noteIndexes, label) {
    let pad = 50;
    let chordRadius = 240;
    let noteRadius = 200;
    let degreeRadius = 135;
    let innerRadius = 90;
    let cof = svg.append("g").attr("transform", "translate(" + (noteRadius + pad) + ", " + (noteRadius + pad) + ")");
    cof.append("text").attr("text-anchor", "middle").attr("x", 0).attr("y", 0).text(label);
    let segments = generateSegments(noteIndexes);
    let noteArc = d3.svg.arc().innerRadius(degreeRadius).outerRadius(noteRadius);
    let degreeArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(degreeRadius);
    let chordArc = d3.svg.arc().innerRadius(noteRadius).outerRadius(chordRadius);
    let noteSegments = cof.append("g").selectAll("path").data(segments, this.indexer).enter().append("path").attr("d", noteArc).attr("class", "note-segment").on("click", handleNoteClick);
    let noteText = cof.append("g").selectAll("text").data(segments).enter().append("text").attr("x", function(x) {
      return noteArc.centroid(x)[0];
    }).attr("y", function(x) {
      return noteArc.centroid(x)[1] + 11;
    }).text("").attr("class", "note-segment-text");
    let intervalSegments = cof.append("g").selectAll("path").data(segments, this.indexer).enter().append("path").attr("d", degreeArc).attr("class", "interval-segment").on("click", handleIntervalClick);
    let intervalNotes = cof.append("g").selectAll("circle").data(segments, this.indexer).enter().append("circle").style("pointer-events", "none").attr("r", 25).attr("cx", function(x) {
      return degreeArc.centroid(x)[0];
    }).attr("cy", function(x) {
      return degreeArc.centroid(x)[1];
    }).attr("class", "interval-note");
    let intervalText = cof.append("g").selectAll("text").data(segments, this.indexer).enter().append("text").attr("x", function(x) {
      return degreeArc.centroid(x)[0];
    }).attr("y", function(x) {
      return degreeArc.centroid(x)[1] + 8;
    }).text("").attr("class", "degree-segment-text");
    let chordSegments = cof.append("g").selectAll("path").data(segments, this.indexer).enter().append("path").attr("d", chordArc).attr("class", "chord-segment").on("click", handleChordClick);
    let chordNotes = cof.append("g").selectAll("circle").data(segments, this.indexer).enter().append("circle").style("pointer-events", "none").attr("r", 28).attr("cx", function(x) {
      return chordArc.centroid(x)[0];
    }).attr("cy", function(x) {
      return chordArc.centroid(x)[1];
    }).attr("class", "chord-segment-note");
    let chordText = cof.append("g").selectAll("text").data(segments, this.indexer).enter().append("text").attr("x", function(x) {
      return chordArc.centroid(x)[0];
    }).attr("y", function(x) {
      return chordArc.centroid(x)[1] + 8;
    }).text("").attr("class", "degree-segment-text");
    return {
      noteSegments,
      noteText,
      intervalSegments,
      intervalNotes,
      intervalText,
      chordSegments,
      chordNotes,
      chordText
    };
  }
  update(scaleChnaged, state) {
    let data = scaleChnaged.nodes.map((node) => ({
      startAngle: 0,
      endAngle: 0,
      scaleNote: {},
      index: node.scaleNote.note.index,
      node
    }));
    state.noteSegments.data(data, this.indexer).attr("class", (d, i) => "note-segment " + (d.node.scaleNote.isScaleNote ? i === 0 ? "note-segment-tonic" : "note-segment-scale" : ""));
    state.noteText.data(data, this.indexer).text((d) => d.node.scaleNote.note.label);
    state.intervalSegments.data(data, this.indexer).attr("class", (d) => d.node.scaleNote.isScaleNote ? "degree-segment-selected" : "interval-segment");
    state.intervalText.data(data, this.indexer).text((d) => d.node.intervalName);
    state.intervalNotes.data(data, this.indexer).attr("class", (d) => d.node.toggle ? "interval-note-selected" : "interval-note").style("fill", (d) => d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16) : "none").style("stroke-width", (d) => d.node.midiToggle ? "20px" : "2px").style("stroke", (d) => d.node.midiToggle ? "OrangeRed" : d.node.toggle ? "black" : "none");
    state.chordText.data(data, this.indexer).text((d) => d.node.scaleNote.chord.romanNumeral + "");
    state.chordSegments.data(data, this.indexer).attr("class", (d) => d.node.scaleNote.isScaleNote ? getChordSegmentClass(d.node.scaleNote.chord) : "chord-segment");
    state.chordNotes.data(data, this.indexer).attr("class", (d) => d.node.isChordRoot ? getChordSegmentClass(d.node.scaleNote.chord) : "chord-segment-note");
  }
}
function getChordSegmentClass(chord) {
  if (chord.type === 2 /* Diminished */)
    return "chord-segment-dim";
  if (chord.type === 3 /* Augmented */)
    return "chord-segment-aug";
  if (chord.type === 1 /* Minor */)
    return "chord-segment-minor";
  if (chord.type === 0 /* Major */)
    return "chord-segment-major";
  throw "Unexpected ChordType";
}
function generateSegments(fifths2) {
  let count = fifths2.length;
  let items = [];
  let angle = Math.PI * (2 / count);
  for (let i = 0;i < count; i++) {
    let itemAngle = angle * i - angle / 2;
    items.push({
      startAngle: itemAngle,
      endAngle: itemAngle + angle,
      index: fifths2[i],
      node: nullNode
    });
  }
  return items;
}
function handleNoteClick(segment, i) {
  tonicChange.publish({
    noteSpec: replaceDoubleSharpsAndFlatsWithEquivalentNote(segment.node.scaleNote.note)
  });
}
function replaceDoubleSharpsAndFlatsWithEquivalentNote(noteSpec) {
  if (Math.abs(noteSpec.offset) > 1) {
    let naturalId = noteSpec.natural.id;
    let newNaturalId = noteSpec.offset > 0 ? naturalId + 1 % 7 : naturalId == 0 ? 6 : naturalId - 1;
    let newNatural = naturals.filter((x) => x.id === newNaturalId)[0];
    return createNoteSpec(newNatural.index, noteSpec.index);
  }
  return noteSpec;
}
function handleChordClick(segment, i) {
  chordChange.publish({ chordIndex: segment.node.scaleNote.note.index });
}
function handleIntervalClick(segment, i) {
  toggle.publish({ index: segment.node.scaleNote.note.index });
}
function rotate(array, offset) {
  let newArray = [];
  for (let item of array) {
    newArray.push((item + offset) % 12);
  }
  return newArray;
}

// src/tuning-module.ts
var guitarDots = [
  [3, 0],
  [5, 0],
  [7, 0],
  [9, 0],
  [12, -1],
  [12, 1],
  [15, 0]
];
var violaDots = [
  [2, 0],
  [4, 0],
  [5, 0],
  [7, 0],
  [12, -1],
  [12, 1]
];
var tuningInfos = [
  { tuning: "EADGBE", dots: guitarDots, description: "Guitar Standard" },
  { tuning: "EADGCF", dots: guitarDots, description: "All Fourths" },
  { tuning: "CGDAEB", dots: guitarDots, description: "All Fifths" },
  { tuning: "BFBFBF", dots: guitarDots, description: "Augmented Fourths" },
  { tuning: "DADGBE", dots: guitarDots, description: "Guitar Drop D" },
  { tuning: "DADGAD", dots: guitarDots, description: "Celtic" },
  { tuning: "CGDAEG", dots: guitarDots, description: "Guitar Fripp NST" },
  { tuning: "BEADGBE", dots: guitarDots, description: "Guitar 7 string" },
  { tuning: "DABEAB", dots: guitarDots, description: "Guitar Portuguese" },
  { tuning: "DGDGBD", dots: guitarDots, description: "Guitar Open G" },
  { tuning: "EADGDG", dots: guitarDots, description: "Guitar Convert" },
  { tuning: "E♭A♭D♭G♭B♭E♭", dots: guitarDots, description: "Guitar E♭ (Hendrix)" },
  { tuning: "BEADF♯B", dots: guitarDots, description: "Baritone B" },
  { tuning: "ADGCEA", dots: guitarDots, description: "Baritone A" },
  { tuning: "EADG", dots: guitarDots, description: "Bass Standard" },
  { tuning: "DADG", dots: guitarDots, description: "Bass Drop D" },
  { tuning: "EADGC", dots: guitarDots, description: "Bass 5 Strings Standard High" },
  { tuning: "BEADG", dots: guitarDots, description: "Bass 5 Strings Standard Low" },
  { tuning: "BEADGC", dots: guitarDots, description: "Bass 6 Strings Standard" },
  { tuning: "BEADGCF", dots: guitarDots, description: "Bass 7 Strings Standard" },
  { tuning: "DGBD", dots: guitarDots, description: "Banjo" },
  { tuning: "DGBD", dots: guitarDots, description: "Cavaquinho" },
  { tuning: "GCEA", dots: guitarDots, description: "Ukulele C" },
  { tuning: "CGDA", dots: violaDots, description: "Cello" },
  { tuning: "GDAE", dots: violaDots, description: "Violin" },
  { tuning: "CGDA", dots: violaDots, description: "Viola" }
];
var tunings = [];
function parseTuning(tuning) {
  let tokens = [];
  let result = [];
  let tokenIndex = 0;
  let lastWasChar = false;
  for (let i = 0;i < tuning.length; i++) {
    let noteChar = tuning.charAt(i);
    if ("ABCDEFG".indexOf(noteChar) >= 0) {
      tokens[tokenIndex] = noteChar;
      tokenIndex++;
      lastWasChar = true;
    } else if ("♯♭".indexOf(noteChar) >= 0 && lastWasChar) {
      tokens[tokenIndex - 1] = tokens[tokenIndex - 1] + noteChar;
      lastWasChar = false;
    } else {
      throw "Invalid tuning char";
    }
  }
  for (let token of tokens) {
    let noteName = noteNames.filter((x) => x.name === token);
    if (noteName.length != 1) {
      throw "Invalid token";
    }
    result.push(noteName[0].index);
  }
  return result;
}
function init5() {
  let index2 = 0;
  for (let info of tuningInfos) {
    let tuning = {
      index: index2,
      tuning: info.tuning,
      dots: info.dots,
      description: info.description,
      notes: parseTuning(info.tuning)
    };
    tunings.push(tuning);
    index2++;
  }
  d3.select("#tuning-dropdown").selectAll("div").data(tunings).enter().append("div").attr("class", "dropdown-content-item").on("click", (x) => raiseTuningChangedEvent(x)).text((x) => x.tuning + "   " + x.description);
  raiseTuningChangedEvent(tunings[0]);
}
function raiseTuningChangedEvent(tuning) {
  tuningChange.publish({
    index: tuning.index
  });
}

// src/gtr-module.ts
var currentTuning;
var currentState;
var notes;
var noteLabels2;
var numberOfFrets = 16;
var fretboardElement;
var isLeftHanded = false;
var isNutFlipped = false;
var fretboardLabelType = 1 /* NoteName */;
var stringGap = 40;
var fretGap = 70;
var fretWidth = 5;
var noteRadius = 15;
var pad = 20;
function indexer2(stringNote) {
  return stringNote.index + "_" + stringNote.octave;
}
function init6() {
  tuningChange.subscribe(handleTuningChange);
  scaleChange.subscribe(update3);
  leftHandedChange.subscribe(handleLeftHandedChanged);
  flipNutChange.subscribe(handleFlipNutChanged);
  fretboardLabelChange.subscribe(handleLabelChange);
}
function handleTuningChange(tuningChangedEvent) {
  let newTuning = tunings.find((x) => x.index == tuningChangedEvent.index);
  updateFretboard(newTuning);
}
function handleLeftHandedChanged(lhEvent) {
  isLeftHanded = lhEvent.isLeftHanded;
  if (currentTuning != null) {
    updateFretboard(currentTuning);
  }
}
function setHandedness() {
  if (isLeftHanded) {
    fretboardElement.transform.baseVal.getItem(0).setTranslate(1200, 0);
    fretboardElement.transform.baseVal.getItem(1).setScale(-1, 1);
    noteLabels2.attr("transform", (d, i) => "translate(0, 0) scale(-1, 1)").attr("x", (d, i) => -(i * fretGap + pad + 30));
  } else {
    fretboardElement.transform.baseVal.getItem(0).setTranslate(0, 0);
    fretboardElement.transform.baseVal.getItem(1).setScale(1, 1);
    noteLabels2.attr("transform", (d, i) => "translate(0, 0) scale(1, 1)").attr("x", (d, i) => i * fretGap + pad + 30);
  }
}
function handleFlipNutChanged(fnEvent) {
  isNutFlipped = fnEvent.isNutFlipped;
  if (currentTuning != null) {
    updateFretboard(currentTuning);
  }
}
function handleLabelChange(lcEvent) {
  fretboardLabelType = lcEvent.labelType;
  setLabels();
}
function setLabels() {
  function setNoteName(note) {
    return note.node.scaleNote.isScaleNote || note.node.toggle ? note.node.scaleNote.note.label : "";
  }
  function setInterval(note) {
    return note.node.scaleNote.isScaleNote || note.node.toggle ? note.node.intervalName : "";
  }
  switch (fretboardLabelType) {
    case 0 /* None */:
      noteLabels2.text("");
      break;
    case 1 /* NoteName */:
      noteLabels2.text(setNoteName);
      break;
    case 2 /* Interval */:
      noteLabels2.text(setInterval);
      break;
  }
}
function updateFretboard(tuningInfo) {
  currentTuning = tuningInfo;
  let fretData = getFretData(numberOfFrets);
  let dots = tuningInfo.dots;
  d3.selectAll("#gtr > *").remove();
  let svg = d3.select("#gtr");
  svg.append("text").attr("class", "mode-text").attr("x", 30).attr("y", 11).text(tuningInfo.tuning + " " + tuningInfo.description + (isLeftHanded ? ", Left Handed" : "") + (isNutFlipped ? ", Nut Flipped" : ""));
  let gtr = svg.append("g").attr("transform", "translate(0, 0) scale(1, 1)");
  fretboardElement = gtr.node();
  gtr.append("g").selectAll("rect").data(fretData).enter().append("rect").attr("x", function(d, i) {
    return (i + 1) * fretGap + pad - fretWidth;
  }).attr("y", pad + stringGap / 2 - fretWidth).attr("width", fretWidth).attr("height", stringGap * (tuningInfo.notes.length - 1) + fretWidth * 2).attr("fill", function(d, i) {
    return i === 0 ? "black" : "none";
  }).attr("stroke", "grey").attr("stroke-width", 1);
  gtr.append("g").selectAll("circle").data(dots).enter().append("circle").attr("r", 10).attr("cx", function(d) {
    return d[0] * fretGap + pad + 30 + d[1] * 10;
  }).attr("cy", function(d) {
    return tuningInfo.notes.length * stringGap + pad + 15;
  }).attr("fill", "lightgrey").attr("stroke", "none");
  let strings = gtr.append("g").selectAll("g").data(isNutFlipped ? tuningInfo.notes.slice() : tuningInfo.notes.slice().reverse(), (_, i) => i + "").enter().append("g").attr("transform", function(d, i) {
    return "translate(0, " + (i * stringGap + pad) + ")";
  });
  strings.append("line").attr("x1", pad + fretGap).attr("y1", stringGap / 2).attr("x2", pad + fretGap * numberOfFrets + 20).attr("y2", stringGap / 2).attr("stroke", "black").attr("stroke-width", 2);
  notes = strings.selectAll("circle").data(function(d) {
    return allNotesFrom(d, numberOfFrets);
  }, indexer2).enter().append("circle").attr("r", noteRadius).attr("cy", stringGap / 2).attr("cx", function(d, i) {
    return i * fretGap + pad + 30;
  }).on("click", (d) => toggle.publish({ index: d.index }));
  noteLabels2 = strings.selectAll("text").data(function(d) {
    return allNotesFrom(d, numberOfFrets);
  }, indexer2).enter().append("text").attr("transform", "translate(0, 0) scale(1, 1)").attr("text-anchor", "middle").attr("x", (d, i) => i * fretGap + pad + 30).attr("y", stringGap / 2 + 5).text("");
  setHandedness();
  if (currentState != null) {
    update3(currentState);
  }
}
function update3(stateChange2) {
  let hasToggledNotes = stateChange2.nodes.some((x) => x.toggle);
  let fill = function(d) {
    return d.node.toggle ? "white" : d.node.scaleNote.isScaleNote ? d.node.scaleNote.noteNumber === 0 ? hasToggledNotes ? "white" : "yellow" : "white" : "rgba(255, 255, 255, 0.01)";
  };
  let stroke = function(d) {
    return d.node.midiToggle ? "OrangeRed" : d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16) : hasToggledNotes ? "none" : d.node.scaleNote.isScaleNote ? "grey" : "none";
  };
  let strokeWidth = function(d) {
    return d.node.midiToggle ? 10 : d.node.toggle ? 4 : d.node.scaleNote.isScaleNote ? 2 : 0;
  };
  let data = repeatTo(stateChange2.nodes, numberOfFrets);
  notes.data(data, indexer2).attr("fill", fill).attr("stroke", stroke).attr("stroke-width", strokeWidth);
  noteLabels2.data(data, indexer2);
  setLabels();
  currentState = stateChange2;
}
function allNotesFrom(index2, numberOfNotes) {
  let items = [];
  for (let i = 0;i < numberOfNotes; i++) {
    items.push({
      octave: Math.floor((i + 1) / 12),
      index: (i + index2) % 12,
      node: nullNode
    });
  }
  return items;
}
function getFretData(numberOfFrets2) {
  let data = [];
  for (let i = 0;i < numberOfFrets2; i++) {
    data.push(i);
  }
  return data;
}
function repeatTo(nodes, count) {
  let stringNotes = [];
  for (let i = 0;i <= Math.floor(count / 12); i++) {
    stringNotes = stringNotes.concat(nodes.map((x) => ({
      octave: i,
      index: x.scaleNote.note.index,
      node: x
    })));
  }
  return stringNotes;
}

// src/scale-family-module.ts
function init7() {
  d3.select("#scale-dropdown").selectAll("div").data(scaleFamily).enter().append("div").attr("class", "dropdown-content-item").on("click", (x) => raiseScaleFamilyChangedEvent(x)).text((x) => x.name);
}
function raiseScaleFamilyChangedEvent(scaleFamily2) {
  scaleFamilyChange.publish({
    scaleFamily: scaleFamily2
  });
}

// src/settings-module.ts
var exports_settings_module = {};
__export(exports_settings_module, {
  onSetCToNoon: () => onSetCToNoon,
  onLeftHandedClick: () => onLeftHandedClick,
  onFlipNut: () => onFlipNut,
  onFbNoteTextClick: () => onFbNoteTextClick,
  init: () => init8
});
function init8() {
  leftHandedChange.subscribe((e) => {
    let checkbox = document.getElementById("left-handed-checkbox");
    checkbox.checked = e.isLeftHanded;
  });
  flipNutChange.subscribe((e) => {
    let checkbox = document.getElementById("flip-nut-checkbox");
    checkbox.checked = e.isNutFlipped;
  });
  setCToNoon.subscribe((e) => {
    let checkbox = document.getElementById("set-c-to-noon-checkbox");
    checkbox.checked = e.isC;
  });
  fretboardLabelChange.subscribe((e) => {
    let selected = "fb-note-text" + String(e.labelType);
    let radio = document.getElementById(selected);
    radio.checked = true;
  });
}
function onLeftHandedClick(e) {
  leftHandedChange.publish({ isLeftHanded: e.checked });
}
function onFlipNut(e) {
  flipNutChange.publish({ isNutFlipped: e.checked });
}
function onSetCToNoon(e) {
  setCToNoon.publish({ isC: e.checked });
}
function onFbNoteTextClick(e) {
  fretboardLabelChange.publish({ labelType: parseInt(e.value) });
}

// src/permalink-module.ts
var exports_permalink_module = {};
__export(exports_permalink_module, {
  populatePermalinkText: () => populatePermalinkText,
  init: () => init11,
  getState: () => getState,
  getCurrentState: () => getCurrentState,
  generatePermalink: () => generatePermalink
});

// src/cookie-module.ts
var cookieName = "gtr-cof-state-v4";
function init9() {
  stateChange.subscribe(bakeCookie2);
}
function bakeCookie2(stateChange2) {
  let json = JSON.stringify(stateChange2.state);
  document.cookie = cookieName + "=" + json + ";";
}
function readCookie2() {
  let result = document.cookie.match(new RegExp(cookieName + "=([^;]+)"));
  if (result != null) {
    let state = JSON.parse(result[1]);
    return state;
  }
  return null;
}

// src/state-module.ts
var defaultState = {
  index: 3,
  naturalIndex: 3,
  chordIndex: -1,
  chordIntervals: [0, 2, 4],
  toggledIndexes: 0,
  scaleFamilyIndex: 0,
  modeIndex: 0,
  midiToggledIndexes: 0,
  isLeftHanded: false,
  isNutFlipped: false,
  fretboardLabelType: 1 /* NoteName */,
  circleIsCNoon: true,
  tuningIndex: 0
};
var current = {
  index: defaultState.index,
  naturalIndex: defaultState.naturalIndex,
  chordIndex: defaultState.chordIndex,
  chordIntervals: defaultState.chordIntervals,
  toggledIndexes: defaultState.toggledIndexes,
  scaleFamilyIndex: defaultState.scaleFamilyIndex,
  modeIndex: defaultState.modeIndex,
  midiToggledIndexes: defaultState.midiToggledIndexes,
  isLeftHanded: defaultState.isLeftHanded,
  isNutFlipped: defaultState.isNutFlipped,
  fretboardLabelType: defaultState.fretboardLabelType,
  circleIsCNoon: defaultState.circleIsCNoon,
  tuningIndex: defaultState.tuningIndex
};
function init10() {
  try {
    let cookieState = readCookie2();
    if (cookieState !== null) {
      current = cookieState;
    }
  } catch (e) {}
  current = getState(current);
  let tempChordIndex = current.chordIndex;
  let tempToggledIndexes = current.toggledIndexes;
  let scaleFamily2 = scaleFamily.find((x) => x.index == current.scaleFamilyIndex);
  if (!scaleFamily2) {
    throw "scaleFamily is " + scaleFamily2 + ", current.scaleFamilyIndex = " + current.scaleFamilyIndex;
  }
  let mode = scaleFamily2.modes.find((x) => x.index == current.modeIndex);
  if (!mode) {
    throw "mode is " + mode + "current.modeIndex" + current.modeIndex;
  }
  scaleFamilyChange.publish({ scaleFamily: scaleFamily2 });
  modeChange.publish({ mode });
  chordIntervalChange.publish({ chordIntervals: current.chordIntervals });
  tonicChange.subscribe(tonicChanged);
  modeChange.subscribe(modeChanged);
  chordChange.subscribe(chordChanged);
  toggle.subscribe(toggle3);
  chordIntervalChange.subscribe(chordIntervalChanged);
  scaleFamilyChange.subscribe(scaleFamilyChanged);
  midiNote.subscribe(midiNote2);
  tonicChange.publish({ noteSpec: createNoteSpec(current.naturalIndex, current.index) });
  chordChange.publish({ chordIndex: tempChordIndex });
  current.toggledIndexes = tempToggledIndexes;
  updateScale();
  leftHandedChange.publish({ isLeftHanded: current.isLeftHanded });
  flipNutChange.publish({ isNutFlipped: current.isNutFlipped });
  fretboardLabelChange.publish({ labelType: current.fretboardLabelType });
  setCToNoon.publish({ isC: current.circleIsCNoon });
  tuningChange.publish({ index: current.tuningIndex });
  leftHandedChange.subscribe(leftHandedChange2);
  flipNutChange.subscribe(flipNutChange2);
  fretboardLabelChange.subscribe(fretboardLabelChange2);
  setCToNoon.subscribe(setCToNoon2);
  tuningChange.subscribe(tuningChange2);
}
function tonicChanged(tonicChangedEvent) {
  current.index = tonicChangedEvent.noteSpec.index;
  current.naturalIndex = tonicChangedEvent.noteSpec.natural.index;
  current.chordIndex = -1;
  updateScale();
}
function modeChanged(modeChangedEvent) {
  current.modeIndex = modeChangedEvent.mode.index;
  current.chordIndex = -1;
  updateScale();
}
function chordChanged(chordChangedEvent) {
  if (chordChangedEvent.chordIndex === current.chordIndex) {
    current.chordIndex = -1;
  } else {
    current.chordIndex = chordChangedEvent.chordIndex;
  }
  current.toggledIndexes = 0;
  updateScale();
}
function toggle3(toggleEvent) {
  current.toggledIndexes = current.toggledIndexes ^ 2 ** toggleEvent.index;
  updateScale();
}
function chordIntervalChanged(chordIntervalChangedEvent) {
  current.chordIntervals = chordIntervalChangedEvent.chordIntervals;
  current.toggledIndexes = 0;
  updateScale();
}
function scaleFamilyChanged(scaleFamilyChangedEvent) {
  current.scaleFamilyIndex = scaleFamilyChangedEvent.scaleFamily.index;
  current.modeIndex = scaleFamilyChangedEvent.scaleFamily.defaultModeIndex;
  current.chordIndex = -1;
  updateScale();
}
function midiNote2(midiNoteEvent) {
  current.midiToggledIndexes = midiNoteEvent.toggledIndexes;
  updateScale();
}
function leftHandedChange2(leftHandedChangeEvent) {
  current.isLeftHanded = leftHandedChangeEvent.isLeftHanded;
  publishStateChange();
}
function flipNutChange2(flipNutChangeEvent) {
  current.isNutFlipped = flipNutChangeEvent.isNutFlipped;
  publishStateChange();
}
function fretboardLabelChange2(fretboardLabelChangeEvent) {
  current.fretboardLabelType = fretboardLabelChangeEvent.labelType;
  publishStateChange();
}
function setCToNoon2(setCToNoonEvent) {
  current.circleIsCNoon = setCToNoonEvent.isC;
  publishStateChange();
}
function tuningChange2(tuningChangedEvent) {
  current.tuningIndex = tuningChangedEvent.index;
  publishStateChange();
}
function updateScale() {
  let scaleFamily2 = scaleFamily.find((x) => x.index == current.scaleFamilyIndex);
  if (!scaleFamily2) {
    throw "scaleFamily is " + scaleFamily2 + ", current.scaleFamilyIndex = " + current.scaleFamilyIndex;
  }
  let mode = scaleFamily2.modes.find((x) => x.index == current.modeIndex);
  if (!mode) {
    throw "mode is " + mode + "current.modeIndex" + current.modeIndex;
  }
  let noteSpec = createNoteSpec(current.naturalIndex, current.index);
  let nodes = generateScaleShim(noteSpec, mode, current.chordIndex, current.chordIntervals, current.toggledIndexes, current.midiToggledIndexes, scaleFamily2);
  current.toggledIndexes = nodes.filter((x) => x.toggle).map((x) => x.scaleNote.note.index).reduce((a, b) => a + 2 ** b, 0);
  scaleChange.publish({
    nodes,
    mode
  });
  publishStateChange();
}
function publishStateChange() {
  stateChange.publish({
    state: current
  });
}

// src/permalink-module.ts
var currentState2 = null;
function init11() {
  stateChange.subscribe((x) => currentState2 = x.state);
}
function populatePermalinkText() {
  let permalink = generatePermalink();
  let inputbox = document.getElementById("permalink-text");
  inputbox.value = permalink;
  inputbox.focus;
  inputbox.select;
  inputbox.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
function generatePermalink() {
  if (currentState2 === null) {
    throw "No stateChange event published before querystring requested";
  }
  let params = new URLSearchParams;
  Object.keys(currentState2).forEach((key) => {
    if (currentState2[key] !== defaultState[key]) {
      params.append(key, currentState2[key]);
    }
  });
  return `${location.protocol}//${location.host}${location.pathname}?${params.toString()}`;
}
function getState(existingState) {
  let queryString = location.search;
  let params = new URLSearchParams(queryString);
  let mutableState = existingState;
  Object.keys(existingState).forEach((x) => {
    let value = params.get(x);
    if (value == null)
      return;
    switch (typeof mutableState[x]) {
      case "boolean":
        mutableState[x] = value === "true";
        break;
      case "number":
        mutableState[x] = parseInt(value);
        break;
      case "object":
        mutableState[x] = JSON.parse("[" + value + "]");
        break;
      case "string":
        mutableState[x] = value;
        break;
    }
    console.log(`${x} -> ${value}, ${typeof mutableState[x]}, ${mutableState[x]}`);
  });
  return mutableState;
}
function getCurrentState() {
  if (currentState2) {
    getState(currentState2);
  }
}

// src/gtr-cof.ts
window.settings = exports_settings_module;
window.permalink = exports_permalink_module;
init();
init2();
init3(scaleFamily[0]);
init4();
new NoteCircle(d3.select("#chromatic"), chromatic(), "Chromatic");
new NoteCircle(d3.select("#cof"), fifths(), "Circle of Fifths");
init6();
init5();
init7();
init8();
init11();
init10();
init9();
