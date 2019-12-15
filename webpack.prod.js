const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
});