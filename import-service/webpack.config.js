const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: [/node_modules/],
      },
    ],
  },
};
