module.exports = dashboardModule => {
  dashboardModule.controller('dashboardController',
    function ($rootScope, $scope, $state, apiRequest, identityService) {
      $scope.userInfo = window._DB.get('userInfo');
      console.log(window._DB.get('userInfo'));
      apiRequest.get('list')
        .then(res => {
          $scope.list = res.data
        });

      $scope.logout = () => {
        window._DB.remove('userInfo');
        localStorage.clear();
        identityService.logout();
        $state.go('login');
      }
    });
};
