module.exports = ngModule => {
  ngModule.factory('authService', authService);
  authService.$inject = ['$rootScope', '$state', 'identityService'];
  function authService($rootScope, $state, identityService) {
    return {
      authorize() {
        return identityService.identity()
          .then(() => {
            const isAuthenticated = identityService.isAuthenticated();
            if ($rootScope.toState.data.roles &&
              $rootScope.toState.data.roles.length > 0 &&
              !identityService.isInAnyRole($rootScope.toState.data.roles)) {
              // user is signed in but not authorized for denied state
              if (isAuthenticated) {
                $state.go('access_denied');
              } else {
                // user is not authenticated. remember the state they wanted to go
                $rootScope.returnToState = $rootScope.toState;
                $rootScope.returnToStateParams = $rootScope.toStateParams;

                // redirect to login state
                $state.go('login');
              }
            }
          });
      }
    };
  }
};
