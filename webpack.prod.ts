const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({ test: /\.js(\?.*)?$/i }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
  ],
};