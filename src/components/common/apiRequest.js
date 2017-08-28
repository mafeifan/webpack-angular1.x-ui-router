module.exports = (ngModule) => {
    ngModule.factory('ApiRequest', ['$http', '$q', '$timeout',
        function ($http, $q, $timeout) {

            return {
                loginUser: loginUser,
                get: get,
                post: post,
                destroy: destroy,
                delete: destroy,
                put: put
            };

            function handleError(e) {
                return $q.reject(e);
            }

            function handleSuccess(response) {
                return $q.resolve(response.data);
            }

            function loginUser(url, body) {
                deferred = $q.defer();
                // mock result
                let res = angular.merge(body, {
                    state: 200
                });
                $timeout(function () {
                    deferred.resolve(res);
                }, 1000);
                return deferred.promise;
            }

            function get(url, action) {
                return request = $http({
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
    ])
    ;
}
;
