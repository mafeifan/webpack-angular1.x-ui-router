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

// load core service
// add AuthenticationToken and SessionToken to header for each request
require('./components/common/httpInterceptorService')(ngModule);
require('./components/common/DialogService')(ngModule);
require('./components/common/ErrorService')(ngModule);
require('./components/common/apiRequest')(ngModule);

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
    });

    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').go('dashboard');
    });
  }
]);

ngModule.run(function ($rootScope, $state, $location) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    if (!$rootScope.isAuthenticated) {
      // event.preventDefault();
      return;
      event.preventDefault();


      // event.preventDefault();
      //
      //$location.url('/login');
      //$state.transitionTo('login');
      //event.preventDefault();
    }

    $state.go('login');

    // console.log('$stateChangeStart');
    // console.log('fromState:' + fromState.name);
    // console.log('toState:' + toState.name);
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log('$stateChangeSuccess');
    console.log('fromState:' + fromState.name);
    console.log('toState:' + toState.name);
  });

  // $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
  //   if (error.notAuthenticated) {
  //       $state.go('login');
  //   }
  // });
});
