


namespace state {

    let currentMode: music.Mode = music.modes[1];

    let currentNoteBase: music.NoteBase = music.noteBases[0];
    let currentIndex: number = 0;
    let currentChordIndex: number = -1

    export function init() {
        let cookieData = readCookie();

        if(cookieData.hasCookie) {
            currentIndex = cookieData.index;
            currentNoteBase = music.noteBases[cookieData.noteBaseIndex];
            currentMode = music.modes.filter((x) => x.index == cookieData.modeIndex)[0];
            currentChordIndex = cookieData.chordIndex;
        }

        events.tonicChange.subscribe(tonicChanged);
        events.modeChange.subscribe(modeChanged);
        events.chordChange.subscribe(chordChanged);

        updateListeners();
    }

    function tonicChanged(tonicChangedEvent: events.TonicChangedEvent): void {
        currentNoteBase = tonicChangedEvent.newNoteBase;
        currentIndex = tonicChangedEvent.index;
        currentChordIndex = -1;
        updateListeners();
    }

    function modeChanged(modeChangedEvent: events.ModeChangedEvent): void {
        currentMode = modeChangedEvent.mode;
        currentChordIndex = -1;
        updateListeners();
    }

    function chordChanged(chordChangedEvent: events.ChordChangeEvent): void {
        if(chordChangedEvent.chordIndex == currentChordIndex) {
            currentChordIndex = -1
        }
        else {
            currentChordIndex = chordChangedEvent.chordIndex;
        }
        updateListeners();
    }

    export function changeChord(chordIndex: number): void {
        events.chordChange.publish({ chordIndex: chordIndex });
    }

    function updateListeners(): void {
        let scale = music.generateScale(currentNoteBase, currentIndex, currentMode);

        if (currentChordIndex != -1) {
            scale = music.appendTriad(scale, currentChordIndex);
        }

        events.scaleChange.publish({
            mode: currentMode,
            noteBase: currentNoteBase,
            index: currentIndex,
            scale2: scale
        });

        bakeCookie();
    }

    function bakeCookie() {
        let cookieExpiryDays = 30;
        let expiryDate = new Date(Date.now() + (cookieExpiryDays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + expiryDate.toUTCString();
        document.cookie = "gtr-cof-state=" + currentIndex + "|" + currentNoteBase.id + "|" + currentMode.index + "|" + currentChordIndex
            + ";" + expires;
    }

    function readCookie(): CookieData {
        let result = document.cookie.match(new RegExp("gtr-cof-state" + '=([^;]+)'));
        if(result != null)
        {
            let items = result[1].split("|");
            if(items.length == 4) {
                return {
                    hasCookie: true,
                    index: Number(items[0]),
                    noteBaseIndex: Number(items[1]),
                    modeIndex: Number(items[2]),
                    chordIndex: Number(items[3])
                };
            }
        }
        return {
            hasCookie: false,
            index: 0,
            noteBaseIndex: 0,
            modeIndex: 0,
            chordIndex: -1
        };
    }

    export interface CookieData {
        readonly hasCookie: boolean;
        readonly index: number;
        readonly noteBaseIndex: number;
        readonly modeIndex: number;
        readonly chordIndex: number;
    }
}
