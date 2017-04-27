module.exports = angular => {
    const helloModule = angular.module('helloModule', []);
    require('./helloController')(helloModule);
}