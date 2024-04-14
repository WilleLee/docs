const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  // which file to compile
  entry: "./src/shortest_path.ts",
  // what to do with the file
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        // where the typescript files should be
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  // where to put the compiled file
  output: {
    publicPath: "public",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
};
