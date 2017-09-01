module.exports = dashboardModule => {
  dashboardModule.controller('dashboardController',
    function ($rootScope, $scope, ApiRequest, $state, $stateParams) {
      $rootScope.userInfo = _DB.get('userInfo');
      console.log($rootScope);
    });
};
