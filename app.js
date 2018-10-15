'use strict';

module.exports = app => {
  app.beforeStart(function* () {
    if(app.config.hotDeploy) {
      // assets
      const webpack = require('webpack');
      const webpackConfig = require('./webpack.config');
      webpackConfig.mode = 'development';
      let compiler = webpack(webpackConfig);
      compiler.watch({
        ignored: /node_modules/,
      }, function(err, status) {
        // app.logger.info('webpack watch: %s', !!status);
      });
      // migi pre
      const webpackConfig2 = require('./webpack.node');
      webpackConfig2.mode = 'development';
      let compiler2 = webpack(webpackConfig2);
      compiler2.watch({
        ignored: /node_modules/,
      }, function(err, status) {
        // app.logger.info('webpack watch: %s', !!status);
      });
    }
  });
};
