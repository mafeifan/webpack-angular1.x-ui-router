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

    require('angular-material');
    require('angular-material/angular-material.min.css');
    ngDepModules.push('ngMaterial');

    require('angular-messages');
    ngDepModules.push('ngMessages');

    require('angular-animate');
    ngDepModules.push('ngAnimate');

    require('angular-sanitize');
    ngDepModules.push('ngSanitize');

    require('angular-ui-mask');
    ngDepModules.push('ui.mask');

    require('angular-scroll');
    ngDepModules.push('duScroll');

    require('angular-loading-bar');
    require('angular-loading-bar/src/loading-bar.css');
    ngDepModules.push('angular-loading-bar');

    require('angular-local-storage');
    ngDepModules.push('LocalStorageModule');

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


ngModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$mdThemingProvider',
    'cfpLoadingBarProvider', '$mdDateLocaleProvider', '$mdIconProvider', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, cfpLoadingBarProvider,
              $mdDateLocaleProvider, $mdIconProvider, $ocLazyLoadProvider) {

        $httpProvider.interceptors.push('httpInterceptorService');

        $mdIconProvider
            .iconSet('actions', "/assets/img/icons/actions/defs/svg/sprite.defs.svg")
            .iconSet('alert', "/assets/img/icons/alert/defs/svg/sprite.defs.svg")
            .iconSet('av', "/assets/img/icons/av/defs/svg/sprite.defs.svg")
            .iconSet('communication', "/assets/img/icons/communication/defs/svg/sprite.defs.svg")
            .iconSet('content', "/assets/img/icons/content/defs/svg/sprite.defs.svg")
            .iconSet('device', "/assets/img/icons/device/defs/svg/sprite.defs.svg")
            .iconSet('editor', "/assets/img/icons/editor/defs/svg/sprite.defs.svg")
            .iconSet('file', "/assets/img/icons/file/defs/svg/sprite.defs.svg")
            .iconSet('hardware', "/assets/img/icons/hardware/defs/svg/sprite.defs.svg")
            .iconSet('image', "/assets/img/icons/image/defs/svg/sprite.defs.svg")
            .iconSet('maps', "/assets/img/icons/maps/defs/svg/sprite.defs.svg")
            .iconSet('navigation', "/assets/img/icons/navigation/defs/svg/sprite.defs.svg")
            .iconSet('notification', "/assets/img/icons/notification/defs/svg/sprite.defs.svg")
            .iconSet('social', "/assets/img/icons/social/defs/svg/sprite.defs.svg")
            .iconSet('toggle', "/assets/img/icons/toggle/defs/svg/sprite.defs.svg")
            .iconSet('fontawesome', "/assets/img/icons/fontawesome/defs/svg/sprite.defs.svg");

        $mdThemingProvider.theme('green')
            .primaryPalette('blue')
            .accentPalette('red');

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
