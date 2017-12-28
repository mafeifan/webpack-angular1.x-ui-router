const webpack = require('webpack');
const notifier = require('node-notifier');
const webpackConfig = require('../webpack.dev.conf.js');
const compiler = webpack(webpackConfig);

require('shelljs/global');

webpackConfig.debug = false;
webpackConfig.progress = true;
webpackConfig.displayErrorDetails = true;
webpackConfig.optimize = {
    occurrenceOrder: true
};

rm('-rf', webpackConfig.output.path);
mkdir('-p', webpackConfig.output.path);

compiler.run(function (err, stats) {
    console.log('[webpack:build]', stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
    }));
    var duration = (stats.endTime - stats.startTime).toString() + ' ms';
    notifier.notify('Build complete in ' + duration);
});
