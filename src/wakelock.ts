let lock!: WakeLockSentinel;

export function setWakeLock(): void {
    if (!('wakeLock' in navigator)) {
        return
    }

    tryAcquireWakeLock();

    document.addEventListener("visibilitychange", async () => {
        if (lock !== null && document.visibilityState === "visible") {
            tryAcquireWakeLock()
        }
    });
}

function tryAcquireWakeLock(): void {
    try {
        navigator.wakeLock.request("screen").then(l => lock = l);
    } catch (e) {
        console.log("Could not aquire wake lock")
    }
}
