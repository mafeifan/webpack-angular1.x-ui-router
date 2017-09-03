module.exports = loginModule => {
  loginModule.controller('loginController',
    function ($rootScope, $scope, $state, $stateParams, identityService) {
      $scope.logIn = () => {
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
      };
    });
};
