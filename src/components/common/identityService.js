module.exports = ngModule => {
  // 身份验证处理
  ngModule.factory('identityService', ['$q', '$http', '$timeout',
    function ($q, $http, $timeout) {
      let _identity,
        _authenticated = false;

      return {
        logout() {
          _identity = null;
        },
        isIdentityResolved() {
          return angular.isDefined(_identity);
        },
        isAuthenticated() {
          return _authenticated;
        },
        isInRole(role) {
          if (!_authenticated || !_identity.roles) {
            return false;
          }
          return _identity.roles.indexOf(role) !== -1;
        },
        isInAnyRole(roles) {
          if (!_authenticated || !_identity.roles) {
            return false;
          }
          for (let i = 0; i < roles.length; i++) {
            if (this.isInRole(roles[i])) return true;
          }
          return false;
        },
        authenticate(identity) {
          _identity = identity;
          _authenticated = identity !== null;

          // for this demo, we'll store the identity in localStorage.
          // For you, it could be a cookie, sessionStorage, whatever
          if (identity) {
            // localStorage.setItem('userInfo', angular.toJson(identity));
            window._DB.set('userInfo', identity);
          } else {
            // localStorage.removeItem('userInfo');
            window._DB.remove('userInfo');
          }
        },
        identity(force) {
          let deferred = $q.defer();

          if (force === true) {
            _identity = undefined;
          }

          // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately
          // resolving
          if (angular.isDefined(_identity)) {
            deferred.resolve(_identity);
            return deferred.promise;
          }

          // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
          //                   $http.get('/svc/account/identity', { ignoreErrors: true })
          //                        .success(function(data) {
          //                            _identity = data;
          //                            _authenticated = true;
          //                            deferred.resolve(_identity);
          //                        })
          //                        .error(function () {
          //                            _identity = null;
          //                            _authenticated = false;
          //                            deferred.resolve(_identity);
          //                        });

          // for the sake of the demo, we'll attempt to read the identity from localStorage. the example above might
          // be a way if you use cookies or need to retrieve the latest identity from an api
          // i put it in a timeout to illustrate deferred resolution
          let self = this;
          $timeout(() => {
            // _identity = angular.fromJson(localStorage.getItem('userInfo'));
            _identity = window._DB.get('userInfo');
            self.authenticate(_identity);
            deferred.resolve(_identity);
          }, 1000);

          return deferred.promise;
        }
      };
    }
  ]);
};
