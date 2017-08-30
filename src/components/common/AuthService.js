module.exports = ngModule => {
  ngModule.factory('AuthService', AuthService);
  AuthService.$inject = ['$rootScope', '$state', 'IdentityService'];
  function AuthService($rootScope, $state, IdentityService) {
    return {
      authorize() {
        return IdentityService.identity()
          .then(() => {
            const isAuthenticated = IdentityService.isAuthenticated();
            if ($rootScope.toState.data.roles &&
              $rootScope.toState.data.roles.length > 0 &&
              !IdentityService.isInAnyRole($rootScope.toState.data.roles)) {
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
