module.exports = angular => {
  const dashboardModule = angular.module('dashboardModule', []);
  require('./dashboardController')(dashboardModule);
}
