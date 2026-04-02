module.exports = {
  forbidden: [
    // update/ and view/ must never import each other (test files excluded)
    {
      name: "no-update-imports-view",
      severity: "error",
      from: { path: "^src/update/", pathNot: "\\.test\\.ts$" },
      to:   { path: "^src/view/" }
    },
    {
      name: "no-view-imports-update",
      severity: "error",
      from: { path: "^src/view/", pathNot: "\\.test\\.ts$" },
      to:   { path: "^src/update/" }
    },

    // Layer 0 (mod, types, wakelock) must not import anything above it
    {
      name: "no-layer0-upward",
      severity: "error",
      from: { path: "^src/(mod|types|wakelock)\\.ts$" },
      to:   { path: "^src/(music|defaultState|model|message|update|view|index)\\.ts$" }
    },

    // Layer 1 (music, defaultState) must not import model/message or above
    {
      name: "no-layer1-upward",
      severity: "error",
      from: { path: "^src/(music|defaultState)\\.ts$" },
      to:   { path: "^src/(model|message|update|view|index)\\.ts$" }
    },

    // Layer 2 (model, message) must not import update/ or view/
    {
      name: "no-layer2-upward",
      severity: "error",
      from: { path: "^src/(model|message)\\.ts$" },
      to:   { path: "^src/(update|view)/|^src/index\\.ts$" }
    },

    // ui/ must not import update/ or view/
    {
      name: "no-ui-upward",
      severity: "error",
      from: { path: "^src/ui/" },
      to:   { path: "^src/(update|view)/|^src/index\\.ts$" }
    },

    // No circular dependencies in src (node_modules excluded)
    {
      name: "no-circular",
      severity: "error",
      from: { path: "^src/" },
      to:   { circular: true }
    }
  ],
  options: {
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" }
  }
};
