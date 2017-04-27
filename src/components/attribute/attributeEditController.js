define(['app'], function (app) {

    AttributeEditController.$inject = ['$scope', '$state', '$stateParams', 'AttributeData', 'AttributeEditorService', 'DialogService'];
    function AttributeEditController($scope, $state, $stateParams, AttributeData, AttributeEditorService, DialogService) {
        AttributeEditorService.initEditor($scope);

        $scope.formData.AttributeId = $stateParams.attributeId;

        AttributeEditorService.loadData($scope);

        $scope.LoadAttribute = function (requestData, LanguageCode) {
            if (requestData.AttributeId) {
                return AttributeData.getAttribute(requestData.AttributeId, LanguageCode);
            }
            return false;
        };
        $scope.GetPageTitle = function (requestData, LanguageCode) {
            if (!requestData.AttributeId) {
                return "Create Attribute";
            }
            else {
                return "Modify Attribute";
            }
        };
        $scope.OnCreate = function (requestData, LanguageCode) {
            return AttributeData.createAttribute(requestData)
                .success(function (data, status) {
                    DialogService.openToast("Attribute created.");
                    $state.go('/attributes');
                });
        };
        $scope.OnUpdate = function (requestData, LanguageCode) {
            return AttributeData.editAttribute(requestData, requestData.AttributeId, LanguageCode)
                .success(function (data, status) {
                    DialogService.openToast("Attribute saved.");
                });
        };
        $scope.OnCancel = function (requestData, LanguageCode) {
            $state.go('/attributes');
        };

        // Remove type 'Form' from attributes type list.
        $scope.IsFormTypeEnable = function (attrType) {
            return attrType.Title != 'Form';
        };
    }

    app.register.controller('AttributeEditController', AttributeEditController);
});