///<reference path="../node_modules/@types/webmidi/index.d.ts" />

namespace midiControl {

    // bit flag for on/off MIDI notes
    let currentToggledIndexes: number = 0;

    export function init(): void {
        let nav: Navigator = window.navigator;

        if(!nav.requestMIDIAccess) {
            console.log("Browser does not support MIDI.");
            return;
        }

        nav.requestMIDIAccess()
            .then((midiAccess) => {
                console.log("MIDI Ready!");
                for(let entry of midiAccess.inputs) {
                    entry[1].onmidimessage = onMidiMessage;
                }
            })
            .catch((error) => {
                console.log("Error accessing MIDI devices: " + error);
            });
    }

    function onMidiMessage(midiEvent: WebMidi.MIDIMessageEvent): void {
        let data = midiEvent.data;
        if(data.length === 3) {
            let status = data[0];
            // command is the four most significant bits of the status byte.
            let command = status >>> 4;
            //let octave = Math.trunc(data[1] / 12);
            // MIDI starts with C0 = 0, but guitar dashboard index 0 = A, so add three to the midi note number.
            let index = (data[1] + 3) % 12;
            if(command === 0x9) {
                // MIDI note on.
                currentToggledIndexes = currentToggledIndexes | 2**index;
            }
            if(command === 0x8) {
                // MIDI note off.
                currentToggledIndexes = currentToggledIndexes & ~(2**index);
            }
            events.midiNote.publish({ toggledIndexes: currentToggledIndexes });
        }
    }
}