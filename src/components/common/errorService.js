module.exports = ngModule => {
  ngModule.factory('errorService', ['DialogService', '$state', (DialogService, $state) => {
    return {
      handleUnauthorized,
      errorCallback
    };

    function handleUnauthorized(status) {
      if (status === 401) {
        localStorage.clear();
        $state.go('login');
      }
    }

    function errorCallback(e, status) {
      handleUnauthorized(status);
      return DialogService.showAlert(e.messages);
    }
  }]);
};

