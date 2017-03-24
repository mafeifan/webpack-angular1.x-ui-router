const Angular = require('angular');

require('oclazyload');
require('angular-ui-router');

require('./page3/page3Module')(Angular);
//require('./page4Module')(Angular);

require('./styles/main.scss')
const ngModule = Angular.module('myApp', ['ui.router', 'oc.lazyLoad', 'page3App']);

require('./config')(ngModule, Angular);
