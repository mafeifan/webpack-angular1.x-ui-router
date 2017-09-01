module.exports = angular => {
  return [
    {
      name: 'access_denied',
      url: '/denied',
      template: '<h3>Access Denied!</h3>',
    },
    {
      name: 'login',
      url: '/login',
      template: require('views/login.html'),
      controller: 'loginController',
      resolve: {
        '': ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let loginModule = require('components/login/loginModule.js')(angular);
            $ocLazyLoad.load({
              name: 'loginModule'
            });
            deferred.resolve(loginModule);
          });
          return deferred.promise;
        }]
      },
    },
    {
      name: 'dashboard',
      url: '/dashboard',
      parent  : '',
      data: {
        roles: ['User']
      },
      template: require('views/dashboard.html'),
      controller: 'dashboardController',
      resolve: {
        '': ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let dashboardModule = require('components/dashboard/dashboardModule.js')(angular);
            $ocLazyLoad.load({
              name: 'dashboardModule'
            });
            deferred.resolve(dashboardModule);
          });
          return deferred.promise;
        }]
      },
    },
    {
      name: 'about',
      url: '/about',
      parent: 'dashboard',
      abstract: false,
      views: {
        'dashboard': {
          template: '<h3>this is about page</h3>',
        }
      },
    },
  ];
};
