/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const pages = ["index.html", "product.html", "cart.html"];

module.exports = {
  target: 'web',
  // entry: './src/main.tsx',
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    compress: true,
    port: 3000,
    // liveReload: false,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src', 'assets'),
          to: './assets',
        },
      ],
    }),
    ...pages.map((item) => {
     return new HtmlWebpackPlugin({
        template: `src/${item}`,
        filename: `${item}`,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
        },
      });
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules',
      context: 'src',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
};
