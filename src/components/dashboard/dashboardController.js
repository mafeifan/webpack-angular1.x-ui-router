module.exports = dashboardModule => {
  dashboardModule.controller('dashboardController',
    function ($rootScope, $scope, ApiRequest, $state, $stateParams) {
      console.log($rootScope);
      $scope.username = localStorage.getItem('name');
    });
};
