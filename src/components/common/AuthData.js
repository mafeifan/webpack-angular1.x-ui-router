module.exports = (ngModule) => {
    ngModule.factory('authData', ['$http', function ($http) {
		return {
			forgotPassword,
			forgotUsername,
		};

		function forgotPassword(data) {
			return $http.post('/forgot/password', data);
		}

		function forgotUsername(data) {
			return $http.post('/forgot/username', data);
		}
	}]);
}
