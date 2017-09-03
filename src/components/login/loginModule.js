module.exports = angular => {
  const loginModule = angular.module('loginModule', []);
  require('./loginController')(loginModule);
  require('../common/identityService')(loginModule);
  // require('../common/apiRequest')(loginModule);
}
