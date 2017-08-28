module.exports = ngModule => {
    ngModule.factory('httpInterceptorService', ['$q',
		function ($q) {
			return  {
                request:  function() {
					config.headers = config.headers || {};
					if (authData) {
						config.headers['AuthenticationToken'] = 'your_token_from_server';
					}

					return config;	
                }
			};
		}
	]);
};