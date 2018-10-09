const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const express = require('express')
const path = require('path');

module.exports = {


  devServer: {
    setup(app) {
      app.use('/public', express.static(path.join(__dirname, 'src', 'assets')))
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(s*)css$/,
          use: [
              // fallback to style-loader in development
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
          ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "file-loader?name=/public/img/[name].[ext]"
      },
      {
        test: /\.woff$|\.eot$|\.woff2$|\.ttf$|\.svg|\.otf$/i,
        loader: "file-loader?name=/public/fonts/[name].[ext]"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "styles.css"
    })
  ]
}
