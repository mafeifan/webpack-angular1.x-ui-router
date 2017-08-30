module.exports = (ngModule) => {
  ngModule.factory('ApiRequest', ['$http', '$q', '$timeout',
    function ($http, $q, $timeout) {

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

      function loginUser(url, body) {
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

      function get(url, action) {
        return $http({
          method: 'get',
          url: url + action
        }).then(handleSuccess, handleError);
      }

      function post(url, action, body) {
        return $http({
          method: 'post',
          url: url + action,
          data: body
        }).then(handleSuccess, handleError);
      }

      function put(url, action, body) {
        return $http({
          method: 'put',
          url: url + action,
          data: body
        }).then(handleSuccess, handleError);
      }

      function destroy(url, action) {
        return $http({
          method: 'delete',
          url: url + action
        }).then(handleSuccess, handleError);
      }
    }
  ]);
};
