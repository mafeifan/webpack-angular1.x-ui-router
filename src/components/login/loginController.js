module.exports = loginModule => {
    loginModule.controller('loginController',
        function ($scope, $state, $stateParams, ApiRequest) {
            $scope.logIn = function () {
                ApiRequest.loginUser('/api/login', {
                    username: $scope.username,
                    password: $scope.password
                }).then( data => {
                    localStorage.setItem('name', $scope.username)
                    $state.go('dashboard');
                }).catch(
                    res => console.log(res)
                );
            };
        });
}
