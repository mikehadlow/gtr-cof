namespace cookies {

    export function init(): void {
        events.scaleChange.subscribe(bakeCookie);
    }

    function bakeCookie(scaleChange: events.ScaleChangedEvent): void {
        let cookieExpiryDays = 30;
        let expiryDate = new Date(Date.now() + (cookieExpiryDays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + expiryDate.toUTCString();
        let tonicNode = scaleChange.nodes[0];
        document.cookie = "gtr-cof-state=" 
            + tonicNode.scaleNote.note.index + "|" 
            + tonicNode.scaleNote.note.natural.index + "|" 
            + 0 + "|" // mode index 
            + 0 // chordIndex
            + ";" + expires;
    }

    export function readCookie(): CookieData {
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