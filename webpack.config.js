const path = require("path")

const { NODE_ENV = "development" } = process.env

module.exports = {
    mode: NODE_ENV,
    devtool: "sourcemap",
    entry: "./src/index.ts",
    stats: "errors-only",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: /src/,
            },
        ],
    },
    resolve: {
        extensions: [".ts"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "docs"),
    },
}
