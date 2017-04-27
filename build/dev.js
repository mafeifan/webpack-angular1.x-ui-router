var webpack = require("webpack");
var webpackConfig = require('../webpack.config.js');
require('shelljs/global');

var notifier = require('node-notifier');

// dev 不用生成source-map
//webpackConfig.devtool = 'source-map';
 
webpackConfig.output.pathinfo = true;

rm('-rf',  webpackConfig.output.path);
mkdir('-p',  webpackConfig.output.path);
cp('-rf', 'src/assets', webpackConfig.output.path);

var compiler = webpack(webpackConfig);

compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll            : true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function (err, stats) {
    // Object
    console.log('[webpack:build]', stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
    }));
    var duration = (stats.endTime - stats.startTime).toString() + ' ms';
    notifier.notify('Build complete in ' + duration);
});
