const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },
  output: {
    filename: "[name].[contentHash].js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 3 Creates `style` nodes from JS strings
          //"style-loader", // Inject css into Js
          MiniCssExtractPlugin.loader, // Move css into another file
          // 2 Translates CSS into CommonJS
          "css-loader",
          // 1 Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!favicon.ico"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css",
    }),
  ],
};
