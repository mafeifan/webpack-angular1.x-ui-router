module.exports = (ngModule) => {
    ngModule.factory('DialogService', ['$mdDialog', '$mdToast',
        function ($mdDialog, $mdToast) {

            return {
                openToast: openToast,
                showAlert: showAlert,
                showDeleteConfirmation: showDeleteConfirmation,
                confirmDialog: confirmDialog,
            };

            function showAlert(data) {
                if (typeof(data) == 'string') {
                    data = [{
                        field: 'Message',
                        message: data
                    }]
                }
                return $mdDialog.show({
                    parent: angular.element(document.body),
                    templateUrl: "/assets/html/dialog/error.template.html",
                    locals: {
                        data: data
                    },
                    controller: dialogController
                });
                dialogController.$inject = ['$scope', '$mdDialog', 'data'];
                function dialogController($scope, $mdDialog, data) {
                    $scope.data = data;
                    $scope.closeDialog = function () {
                        return $mdDialog.hide();
                    };
                }
            }

            function showDeleteConfirmation(title, id, undone) {
                undone = undone ? true : false;
                var parentEl = angular.element(document.body);
                return $mdDialog.show({
                    parent: parentEl,
                    templateUrl: "/assets/html/dialog/delete.template.html",
                    locals: {
                        Id: id,
                        Title: title,
                        Undone: undone
                    },
                    controller: dialogController
                });
                dialogController.$inject = ['$scope', '$mdDialog', 'Id', 'Title', 'Undone'];
                function dialogController($scope, $mdDialog, Id, Title, Undone) {
                    $scope.Title = Title;
                    $scope.Id = Id;
                    $scope.Undone = Undone;
                    $scope.closeDialog = function () {
                        $mdDialog.cancel();
                    };
                    $scope.Delete = function (id) {
                        $mdDialog.hide(id);
                    };
                }
            }

            function openToast(message) {
                $mdToast.show($mdToast.simple().position(getToastPosition()).content(message));
            }

            function getToastPosition() {
                var toastPosition = {
                    bottom: true,
                    top: false,
                    left: false,
                    right: true
                };
                return Object.keys(toastPosition)
                    .filter(function (pos) {
                        return toastPosition[pos];
                    })
                    .join(' ');
            }

            function confirmDialog(context) {
                var parentEl = angular.element(document.body);
                return $mdDialog.show({
                    parent: parentEl,
                    templateUrl: "/assets/html/dialog/confirm.template.html",
                    locals: {
                        title: context.title ? context.title : 'Confirm',
                        content: context.desc,
                        subContent: context.subContent,
                        isNecessary: typeof context.isNecessary === 'undefined' ? true : context.isNecessary,
                        cancelBtnText: !!context.cancelBtnText ? context.cancelBtnText : 'Cancel',
                        confirmBtnText: !!context.confirmBtnText ? context.confirmBtnText : 'Ok'
                    },
                    controller: dialogController
                });
                dialogController.$inject = ['$scope', '$mdDialog', 'title', 'content', 'subContent', 'isNecessary'];
                function dialogController($scope, $mdDialog, title, content, subContent, isNecessary, cancelBtnText, confirmBtnText) {
                    $scope.title = title;
                    $scope.content = content;
                    $scope.subContent = subContent;
                    $scope.isNecessary = isNecessary;
                    $scope.cancelBtnText = cancelBtnText;
                    $scope.confirmBtnText = confirmBtnText;

                    $scope.closeDialog = function () {
                        $mdDialog.cancel();
                    };
                    $scope.confirm = function () {
                        $mdDialog.hide();
                    };
                }
            }
        }
    ]);
};

