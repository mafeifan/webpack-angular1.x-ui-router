let router, angular, ngDepModules = [];

require('jquery');
angular = require('angular');

function loadBasicModules() {
    require('oclazyload');
    ngDepModules.push('oc.lazyLoad');

    require('angular-ui-router');
    ngDepModules.push('ui.router');

    require('oclazyload');
    ngDepModules.push('oc.lazyLoad');

    require('angular-messages');
    ngDepModules.push('ngMessages');

    require('angular-animate');
    ngDepModules.push('ngAnimate');

    require('angular-sanitize');
    ngDepModules.push('ngSanitize');

    require('angular-loading-bar');
    require('angular-loading-bar/src/loading-bar.css');
    ngDepModules.push('angular-loading-bar');

    require('bootstrap/dist/css/bootstrap.css');
}


loadBasicModules();

//define one angular module
const ngModule = angular.module('demoApp', ngDepModules);


// add AuthenticationToken and SessionToken to header for each request
require('./components/common/httpInterceptorService')(ngModule);
require('./components/common/DialogService')(ngModule);
require('./components/common/ErrorService')(ngModule);
require('./components/common/apiRequest')(ngModule);

// load core service

ngModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'cfpLoadingBarProvider', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, $ocLazyLoadProvider) {

        $httpProvider.interceptors.push('httpInterceptorService');

        cfpLoadingBarProvider.includeBar = false;

        $ocLazyLoadProvider.config({
            debug: true,
            events: true
        });

        // router config
        routeStates = require('router')(angular);

        routeStates.forEach(state => {
            $stateProvider.state(state);
        })

    }]);
