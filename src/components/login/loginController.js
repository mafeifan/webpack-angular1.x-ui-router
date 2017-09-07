module.exports = loginModule => {
  loginModule.controller('loginController',
    function ($rootScope, $scope, $state, $stateParams, identityService, apiRequest) {
      $scope.logIn = () => {
        const loginInfo = {
          username: $scope.username,
          password: $scope.password,
          roles: ['user']
        };
        apiRequest
          .put('login', loginInfo)
          .then(res => identityService
            .authenticate(Object.assign({username: $scope.username}, res.data)))
          .then(() => {
            if ($scope.returnToState) {
              $state.go($scope.returnToState.name, $scope.returnToStateParams);
            } else {
              $state.go('dashboard');
            }
          });
      };
    });
};
