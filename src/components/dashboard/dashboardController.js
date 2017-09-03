module.exports = dashboardModule => {
  dashboardModule.controller('dashboardController',
    function ($rootScope, $scope, $state) {
      $rootScope.userInfo = window._DB.get('userInfo');
      console.log($rootScope);

      $scope.logout = () => {
        localStorage.clear();
        $state.go('login');
      }
    });
};
