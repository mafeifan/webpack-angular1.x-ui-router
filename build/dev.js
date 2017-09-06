const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
require('shelljs/global');

const notifier = require('node-notifier');

// webpackConfig.devtool = 'source-map';

webpackConfig.output.pathinfo = true;
const compiler = webpack(webpackConfig);

rm('-rf', webpackConfig.output.path);
mkdir('-p', webpackConfig.output.path);
cp('-rf', 'src/views', webpackConfig.output.path);


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
