const webpack = require('webpack');
const notifier = require('node-notifier');
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);

require('shelljs/global');

webpackConfig.devtool = 'inline-source-map';
webpackConfig.output.pathinfo = true;

rm('-rf', webpackConfig.output.path);
mkdir('-p', webpackConfig.output.path);
// cp('-rf', 'src/views', webpackConfig.output.path);

compiler.watch({ // watch options:
  aggregateTimeout: 300, // wait so long for more changes
  poll: true // use polling instead of native watchers
  // pass a number to set the polling interval
}, (err, stats) => {
  // Object
  console.log('[webpack:build]', stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true
  }));
  const duration = (stats.endTime - stats.startTime).toString() + ' ms';
  notifier.notify('Build complete in ' + duration);
});
