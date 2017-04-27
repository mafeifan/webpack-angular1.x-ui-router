module.exports = angular => {
    const attributeModule = angular.module('attributeModule', []);
    require('./attributeListController')(attributeModule);
    // require('./attributeEditController')(attributeModule);
    require('./AttributeData')(attributeModule);
}