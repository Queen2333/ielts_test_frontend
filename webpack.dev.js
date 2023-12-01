const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "static/js/[name].[contenthash].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: false,
  cache: true,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader", // 或 'file-loader'
            options: {
              limit: 8192, // 小于 8KB 的图片将转为 base64 格式
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({ path: `./.env.dev` }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/*.html"],
          },
        },
      ],
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map", // 指定生成的源映射文件的名称
      // exclude: ['vendor.js'], // 可选，排除特定的文件不生成源映射
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    hot: true,
    compress: true,
    port: 8087,
    client: {
      logging: "verbose", // 设置为 'info' 或 'verbose'，以启用模块名称输出
    },
    proxy: {
      "/form_web": {
        target: process.env.FE_C_URL,
        changeOrigin: true,
        pathRewrite: { "^/form_web": "/form_web" },
      },
    },
  },
};