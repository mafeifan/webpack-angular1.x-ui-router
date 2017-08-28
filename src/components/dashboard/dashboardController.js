module.exports = dashboardModule => {
    dashboardModule.controller('dashboardController',
        function ($scope, ApiRequest, $state, $stateParams) {
           $scope.username = localStorage.getItem('name');
        });
}
