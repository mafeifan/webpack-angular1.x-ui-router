const baseUrl = require('../../config').api.baseUrl;

module.exports = ngModule => {
  ngModule.factory('apiRequest', ['$http', '$q', '$timeout',
    ($http, $q, $timeout) => {
      return {
        loginUser,
        get,
        post,
        destroy,
        put
      };

      function handleError(e) {
        return $q.reject(e);
      }

      function handleSuccess(response) {
        return $q.resolve(response.data);
      }

      function loginUser(body) {
        const deferred = $q.defer();
        // mock result
        const res = angular.merge(body, {
          state: 200
        });
        $timeout(() => {
          deferred.resolve(res);
        }, 1000);
        return deferred.promise;
      }

      function get(action) {
        return $http({
          method: 'get',
          url: baseUrl + action
        }).then(handleSuccess, handleError);
      }

      function post(action, body) {
        return $http({
          method: 'post',
          url: baseUrl + action,
          data: body
        }).then(handleSuccess, handleError);
      }

      function put(action, body) {
        return $http({
          method: 'put',
          url: baseUrl + action,
          data: body
        }).then(handleSuccess, handleError);
      }

      function destroy(action) {
        return $http({
          method: 'delete',
          url: baseUrl + action
        }).then(handleSuccess, handleError);
      }
    }
  ]);
};
