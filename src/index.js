let routeStates, angular, ngDepModules = [];

require('jquery');
angular = require('angular');

function loadBasicModules () {
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

// define one angular module
const ngModule = angular.module('demoApp', ngDepModules);

// 加载核心service

// 拦截器
require('./components/common/httpInterceptorService')(ngModule);
// 错误处理
require('./components/common/ErrorService')(ngModule);
// 权限相关
require('./components/common/IdentityService')(ngModule);
// 登录处理
require('./components/common/AuthService')(ngModule);
// $http简单封装
require('./components/common/apiRequest')(ngModule);

// 工具类库
const LocalStore = require('./utils/LocalStore');

const DB = new LocalStore('__demoDB__');
DB.set('name', 'finley');
console.log(DB.get('name'));

ngModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'cfpLoadingBarProvider', '$ocLazyLoadProvider',
  function ($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, $ocLazyLoadProvider) {
    $httpProvider.interceptors.push('httpInterceptorService');

    //
    cfpLoadingBarProvider.includeBar = false;

    $ocLazyLoadProvider.config({
      debug: true,
      events: true
    });

    // router config
    routeStates = require('router')(angular);

    routeStates.forEach(state => {
      $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').go('login');
    });
  }
]);

ngModule.run(function ($rootScope, $state, AuthService, IdentityService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    $rootScope.toState = toState;
    $rootScope.toStateParams = toParams;

    if (IdentityService.isIdentityResolved()) {
      AuthService.authorize();
    }

    const noNeedAuthStates = ['login', 'reset-password', 'register'];

    if (! noNeedAuthStates.includes(toState.name) && !localStorage.getItem('userInfo')) {
      event.preventDefault();
      $state.go('login');
    }

    console.group('$stateChangeStart');
    console.log('fromState:' + fromState.name);
    console.log('toState:' + toState.name);
    console.groupEnd('$stateChangeStart');
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.group('$stateChangeSuccess');
    console.log('fromState:' + fromState.name);
    console.log('toState:' + toState.name);
    console.groupEnd('$stateChangeSuccess');
  });

  // $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
  //   if (error.notAuthenticated) {
  //       $state.go('login');
  //   }
  // });
});
