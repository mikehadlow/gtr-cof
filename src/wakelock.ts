let lock!: WakeLockSentinel;

export function init(): void {
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
        navigator.wakeLock.request("screen").then(lock => lock = lock);
    } catch (e) { }
}
