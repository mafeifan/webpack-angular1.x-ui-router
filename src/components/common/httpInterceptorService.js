module.exports = ngModule => {
    ngModule.factory('httpInterceptorService', ['$q', '$location', 'localStorageService',
		function ($q, $location, localStorageService) {
			return  {
                request:  _request
			};

			function _request(config) {
				config.headers = config.headers || {};
                let authData = localStorageService.get('userInfo');
				if (authData) {
					config.headers['AuthenticationToken'] = authData.AuthenticationToken;
					config.headers['SessionToken'] = authData.SessionToken;
				}

				return config;
			}
		}
	]);
};