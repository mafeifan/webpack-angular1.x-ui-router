module.exports = helloModule => {
    helloModule.controller('helloController',
        function ($scope, ApiRequest, $state, $stateParams, localStorageService) {
            $scope.user = localStorageService.get('userInfo');
        });
}
