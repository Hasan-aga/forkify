const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/controller.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main[contenthash].js",
    assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        // use babel to transpile js and jsx from es6 to es5
        test: /\.js$/, //find any file that ends with .js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      }, //loaders are used in order from right to left},
      {
        test: /\.(png|jpe?g|svg|webp|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "template.html",
      favicon: "src/img/favicon.png",
    }),
  ],
};
