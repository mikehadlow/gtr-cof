let lock!: WakeLockSentinel;

export function setWakeLock(): void {
    if (!("wakeLock" in navigator)) {
        return;
    }

    if (document.visibilityState === "visible") {
        void tryAcquireWakeLock();
    }

    document.addEventListener("visibilitychange", async () => {
        if (lock !== null && document.visibilityState === "visible") {
            await tryAcquireWakeLock();
        }
    });
}

async function tryAcquireWakeLock(): Promise<void> {
    try {
        lock = await navigator.wakeLock.request("screen");
    } catch (_e) {
        console.log("Could not aquire wake lock");
    }
}
