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
      data: {
        roles: []
      },
      template: require('views/login.html'),
      // templateUrl: '../views/login.html',
      controller: 'loginController',
      resolve: {
        '': ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
          return $q(resolve => {
            require.ensure([], () => {
              let loginModule = require('components/login/loginModule.js')(angular);
              $ocLazyLoad.load({
                name: 'loginModule'
              });
              resolve(loginModule);
            });
          })
        }]
      },
    },
    {
      name: 'dashboard',
      url: '/dashboard',
      parent: '',
      data: {
        roles: ['user']
      },
      // template: require('views/dashboard.html'),
      templateUrl: '../views/dashboard.html',
      controller: 'dashboardController',
      resolve: {
        '': ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
          return $q(resolve => {
            require.ensure([], () => {
              let dashboardModule = require('components/dashboard/dashboardModule.js')(angular);
              $ocLazyLoad.load({
                name: 'dashboardModule'
              });
              resolve(dashboardModule);
            });
          })
        }]
      },
    },
    {
      name: 'about',
      url: '/about',
      parent: 'dashboard',
      abstract: false,
      views: {
        dashboard: {
          template: '<h3>this is about page</h3>',
        }
      },
    },
  ];
};
