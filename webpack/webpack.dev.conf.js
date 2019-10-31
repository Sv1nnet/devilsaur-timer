const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const proxy_headers = {
  'X-Forwarded-For': 'http://192.168.0.10:8081',
};

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    proxy: {
      '/': {
        target: {
          host: '192.168.0.10',
          protocol: 'http:',
        },
      },
    },
    contentBase: baseWebpackConfig.externals.path.dist,
    port: 8081,
    overlay: { warnings: true, errors: true },  // show error message on the screen
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
