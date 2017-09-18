let routeStates,
  angular,
  ngDepModules = [];

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

/* 工具类库 */
const LocalStore = require('./utils/LocalStore');

const _DB = new LocalStore('__demoDB__');
window._DB = _DB;

/* 加载核心service */

// 拦截器
require('./components/common/httpInterceptorService')(ngModule);
// 权限相关
require('./components/common/identityService')(ngModule);
// 登录处理
require('./components/common/authService')(ngModule);
// $http简单封装
require('./components/common/apiRequest')(ngModule);

// load common directives
require('./components/common/directive/demoDirective')(ngModule);

ngModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  '$ocLazyLoadProvider', '$compileProvider', 'cfpLoadingBarProvider',
  ($stateProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider, $compileProvider, cfpLoadingBarProvider) => {
    $httpProvider.interceptors.push('httpInterceptorService');

    // https://stackoverflow.com/questions/41116962/directives-passing-parameter-undefined-while-updating-1-5-x-to-1-6-angular/41117676#41117676
    $compileProvider.preAssignBindingsEnabled(true);

    cfpLoadingBarProvider.includeBar = true;

    $ocLazyLoadProvider.config({
      debug: true,
      events: true
    });

    // router config
    routeStates = require('./router')(angular);

    routeStates.forEach(state => {
      $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise($injector => {
      if (window._DB.get('userInfo')) {
        $injector.get('$state').go('dashboard');
      } else {
        $injector.get('$state').go('login');
      }
    });
  }
]);

ngModule.run(function ($rootScope, $state, authService, identityService) {
  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState) => {

    $rootScope.toState = toState;
    $rootScope.toStateParams = toParams;

    if (identityService.isIdentityResolved()) {
      authService.authorize();
    }

    // const noNeedAuthStates = ['reset-password', 'register'];
    //
    // if (!noNeedAuthStates.includes(toState.name) && !window._DB.get('userInfo')) {
    //   event.preventDefault();
    //   $state.go('login');
    // }

    console.group('$stateChangeStart');
    console.log('fromState:' + fromState.name);
    console.log('toState:' + toState.name);
    console.groupEnd('$stateChangeStart');
  });

  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
    console.group('$stateChangeSuccess');
    console.log('fromState:' + fromState.name);
    console.log('toState:' + toState.name);
    console.groupEnd('$stateChangeSuccess');
  });
});

