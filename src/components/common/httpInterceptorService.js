/* eslint-disable */

module.exports = ngModule => {
  ngModule.factory('httpInterceptorService', ['$q',
    function ($q) {
      return {
        request(config) {
          config.headers = config.headers || {};
          if (window._DB.get('userInfo')) {
            config.headers['authToken'] = window._DB.get('userInfo').authToken;
          }
          // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          // config.headers['X-CSRF-Token'] = document.head.querySelector('meta[name="csrf-token"]').content || 'demo';
          return config;
        }
      };
    }
  ]);
};
