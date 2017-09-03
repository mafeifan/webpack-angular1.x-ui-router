module.exports = dashboardModule => {
  dashboardModule.controller('dashboardController',
    function ($rootScope, $scope, $state, $stateParams) {
      $rootScope.userInfo = _DB.get('userInfo');
      console.log($rootScope);

      $scope.logout = function () {
        localStorage.clear();
        $state.go('login');
      }
    });
};
