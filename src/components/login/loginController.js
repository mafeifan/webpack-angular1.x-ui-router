module.exports = loginModule => {
  loginModule.controller('loginController',
    function ($rootScope, $scope, $state, $stateParams, identityService) {
      $scope.logIn = function () {
        identityService.authenticate({
          username: $scope.username,
          password: $scope.password,
          roles: ['User']
        });

        if ($scope.returnToState) {
          $state.go($scope.returnToState.name, $scope.returnToStateParams);
        } else {
          $state.go('dashboard');
        }
        //   .then(data => {
        //     $rootScope.isAuthenticated = true;
        //     $rootScope.userInfo = {
        //       username: $scope.username
        //     };
        //     $state.go('dashboard');
        //   })
        //   .catch(
        //   res => console.log(res)
        // );
      };
    });
};
