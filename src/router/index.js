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
                        let module = require('components/login/loginModule.js')(angular);
                        $ocLazyLoad.load({
                            name: 'loginModule'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            },
        },
        {
            name: 'hello',
            url: '/hello',
            template: require('views/hello.html'),
            controller: 'helloController',
            resolve: {
                "": ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('components/hello/helloModule.js')(angular);
                        $ocLazyLoad.load({
                            name: 'helloModule'
                        });
                        deferred.resolve(module);
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

