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

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// let mode = "development";
// let target = "web";

// if (process.env.NODE_ENV == "production") {
//   mode = "production";
//   target = "browserslist";
// }

// module.exports = {
//   mode: mode,
//   target: target,

//   entry: "./src/js/controller.js",

// output: {
//   path: path.resolve(__dirname, "dist"),
//   filename: "main.[contenthash].js",
//   assetModuleFilename: "images/[hash][ext][query]",
// },

//   module: {
//     rules: [
//       {
//         test: /\.(png|jpe?g|svg|webp|gif)$/i,
//         type: "asset",
//       },
//       {
//         test: /\.(s[ac]|c)ss$/i,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//           },
//           "css-loader",
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.js$/i,
//         exclude: /node_modules/,
//         use: [{ loader: "babel-loader" }],
//       },

//       {
//         test: /\.html$/i,
//         loader: "html-loader",
//       },
//     ],
//   },

//   /* add filename to mini-css-extract-plugin below to avoid caching in production mode.
//     If used in dev mode hot module not works! Add this when uploading site to the live server.
//     {
//       filename: "main.[contenthash].css",
//     }
//   */

//   plugins: [
//     new CleanWebpackPlugin(),
//     new MiniCssExtractPlugin({
//       filename: "main.[contenthash].css",
//     }),
//     new HtmlWebpackPlugin({
//       template: "index.html",
//     }),
//   ],

//   // Use only if necessary because map increases file size (Don't upload to production)
//   // devtool: 'source-map',

//   devServer: {
//     contentBase: "./dist",
//     hot: true,
//   },
// };
