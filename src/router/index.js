module.exports = angular => {
    return [
        {
            name: 'login',
            url: '/login',
            template: require('views/login.html'),
            controller: 'loginController',
            resolve: {
                "": ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
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
            template: require('views/dashboard.html'),
            controller: 'dashboardController',
            resolve: {
                "": ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
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
            template: '<h3>Its the UI-Router hello world app!</h3>'
        },
    ];
}

