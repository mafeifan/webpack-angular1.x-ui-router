module.exports = angular => {
    angular.factory('ApiService', ['$http', 'ErrorService', function ($http, ErrorService) {

        var proxyUrl = '/api/proxy?service=';
        var fileProxyUrl = '/api/file-proxy?service=';
        var currentUrl = proxyUrl;
        var fileInfo = null;
        var fileMode = false;

        return {
            get,
            post,
            destroy,
            delete: destroy,
            put,
            urlMaker,
            switchToFileProxy,
        };

        function resetCurrentUrl() {
            currentUrl = proxyUrl;
            fileInfo = null;
            fileMode = false;
        }

        /**
         ** switch to file proxy, mode param options("download", "view", false(default))
         **/
        function switchToFileProxy(fileInfoParam = null, mode = false) {
            currentUrl = fileProxyUrl;
            fileInfo = fileInfoParam;
            fileMode = mode;
            return this;
        }

        function urlMaker(serviceName, action, wish) {
            if (action[0] !== '/') {
                action = '/' + action;
            }

            var url = currentUrl + encodeURIComponent(serviceName);
            url += '&action=' + encodeURIComponent(action);

            if (wish) {
                url += '&wish=' + wish;
            }

            if (fileInfo) {
                var tempFileInfo = {
                    FileName: fileInfo.FileName,
                    FilePath: fileInfo.FilePath,
                    BaseURI: fileInfo.BaseURI,
                    MimeType: fileInfo.MimeType,
                    FileSize: fileInfo.FileSize,
                };
                url += '&filter-file-info=' + encodeURIComponent(angular.toJson(tempFileInfo));
            }
            if (fileMode != false) {
                url += '&filter-file-mode=' + encodeURIComponent(fileMode);
            }

            resetCurrentUrl();
            return url;
        }

        function get(serviceName, action, wish) {
            var url = urlMaker(serviceName, action, wish);
            return $http.get(url).error(ErrorService.errorCallback);
        }

        function post(serviceName, action, body, wish) {
            var url = urlMaker(serviceName, action, wish);
            return $http.post(url, body).error(ErrorService.errorCallback);
        }

        function destroy(serviceName, action, wish) {
            var url = urlMaker(serviceName, action, wish);
            return $http({
                method: "delete",
                url: url
            }).error(ErrorService.errorCallback);
        }

        function put(serviceName, action, body, wish) {
            var url = urlMaker(serviceName, action, wish);
            return $http.put(url, body).error(ErrorService.errorCallback);
        }
    }]);
};

