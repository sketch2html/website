const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    common: './app/assets/common/index.jsx',
    index: './app/assets/index/index.jsx',
    passport_index: './app/assets/passport_index/index.jsx',
    passport_login: './app/assets/passport_login/index.jsx',
    passport_register: './app/assets/passport_register/index.jsx',
    upload_index: './app/assets/upload_index/index.jsx',
    upload_audio: './app/assets/upload_audio/index.jsx',
  },
  output: {
    path: __dirname + '/app/public',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: ['babel-loader', 'migi-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer("last 100 versions"),
              ],
            }
          },
          'less-loader'
        ],
      },
      {
        test: /(\.jpg)|(\.jpeg)|(\.gif)|(\.png)|(\.ico)|(\.webp)$/i,
        loader: 'url-loader?limit=1024&name=[hash].[ext]'
      },
      {
        test: /(\.html?)|(\.mp\d)$/i,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /(\.woff)|(\.eot)|(\.ttf)|(\.svg)$/i,
        loader: 'file-loader?name=[hash].[ext]'
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
