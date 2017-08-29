module.exports = loginModule => {
  loginModule.controller('loginController',
    function ($rootScope, $scope, $state, $stateParams, ApiRequest) {
      $scope.logIn = function () {
        ApiRequest.loginUser('/api/login', {
          username: $scope.username,
          password: $scope.password
        }).then(data => {
          $rootScope.isAuthenticated = true;
          $rootScope.userInfo = {
            username: $scope.username
          };
          $state.go('dashboard');
        }).catch(
          res => console.log(res)
        );
      };
    });
};
