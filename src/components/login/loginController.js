module.exports = loginModule => {
    loginModule.controller('loginController',
        function ($scope, ApiRequest, $state, $stateParams, localStorageService) {
            $scope.logIn = function () {
                ApiRequest.loginUser('/api/single-page-login', {
                    username: $scope.username,
                    password: $scope.password
                }).then( data=> {
                    localStorageService.set('userInfo', data);
                    $state.go('hello');
                }).catch(res => console.log(res));
            };
        });
}
