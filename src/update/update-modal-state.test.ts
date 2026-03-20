import { describe, expect, test } from "bun:test";
import { defaultState } from "./test-default-state";
import { Update } from "./update-modal-state";
import { updateScale } from "./updateScale";

describe("update-modal-state", () => {
    test("sets modalState to guitar-settings", () => {
        const model = updateScale({ ...defaultState });
        const result = Update(model, { id: "ModalStateChange", modalState: "guitar-settings" });
        expect(result.state.modalState).toBe("guitar-settings");
    });

    test("sets modalState to closed", () => {
        const model = updateScale({ ...defaultState, circleIsCNoon: false });
        const result = Update(model, { id: "ModalStateChange", modalState: "closed" });
        expect(result.state.modalState).toBe("closed");
    });
});
