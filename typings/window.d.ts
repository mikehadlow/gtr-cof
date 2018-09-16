interface Navigator {
  /**
   * When invoked, returns a Promise object representing a request for access to MIDI
   * devices on the user's system.
   */
  requestMIDIAccess(options?: WebMidi.MIDIOptions): Promise<WebMidi.MIDIAccess>
}
