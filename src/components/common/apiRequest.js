module.exports = (ngModule) => {
    ngModule.factory('ApiRequest', ['$http', 'ErrorService', '$q', '$timeout',
        function ($http, ErrorService, $q, $timeout) {

            return {
                loginUser: loginUser,
                get: get,
                post: post,
                destroy: destroy,
                delete: destroy,
                put: put
            };

            function handleError(e) {
                return $q.reject(ErrorService.errorCallback(e.data, e.status));
            }

            function handleSuccess(response) {
                return $q.resolve(response.data);
            }

            function loginUser(url, body) {
                deferred = $q.defer();
                // fake result
                let res = angular.merge(body, {
                    state: 200
                });
                $timeout(function () {
                    deferred.resolve(res);
                }, 1000);
                return deferred.promise;
            }

            // return $http({
            //     method: 'put',
            //     url: getUrl(),
            //     headers: {
            //         'SessionToken': "570EF557-9F05-4DD6-89BE-4F0010070340"
            //     },
            //     data: body
            // });

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
