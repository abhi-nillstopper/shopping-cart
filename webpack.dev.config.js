const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");

module.exports = {
  entry: path.join(__dirname, "src","client", "index.js"),
  target: "web",
  output: {
    path: path.join(__dirname, "client_build"),
    filename: "index.bundle.js",
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    modules: [path.resolve(__dirname, "src", "client"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "static"),
    hot: true,
  },
  devtool: "source-map",
  // moduleDirectories: ["node_modules", "./utils/test-utils.js"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src","client" , "index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed), // it will automatically pick up key values from .env file
    }),
    // new webpack.EnvironmentPlugin(
    //   ["NODE_ENV", "DEBUG"],
    //   [
    //     "AXIOS_BASE_URL",
    //     process.env.NODE_ENV === "development"
    //       ? "http://localhost:8000"
    //       : "https://express-shopping-app.herokuapp.com",
    //   ]
    // ),
    new webpack.EnvironmentPlugin({
      AXIOS_BASE_URL: "http://localhost:8000",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname + "/static"),
          to: "static/",
        },
      ],
    }),
  ],
};
