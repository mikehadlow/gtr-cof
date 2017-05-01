


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

        updateListeners();
    }

    export function changeTonic(newNoteBase: music.NoteBase, index: number): void {
        currentNoteBase = newNoteBase;
        currentIndex = index;
        currentChordIndex = -1;
        updateListeners();
    }

    export function changeMode(newMode: music.Mode): void {
        currentMode = newMode;
        currentChordIndex = -1;
        updateListeners();
    }

    export function changeChord(chordIndex: number): void {
        if(chordIndex == currentChordIndex) {
            currentChordIndex = -1
        }
        else {
            currentChordIndex = chordIndex;
        }
        updateListeners();
    }

    function updateListeners(): void {
        let scale = music.generateScale(currentNoteBase, currentIndex, currentMode);

        if (currentChordIndex != -1) {
            scale = music.appendTriad(scale, currentChordIndex);
        }

        events.stateChange.publish({
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
