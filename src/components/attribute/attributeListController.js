module.exports = attributeModule => {

    attributeListController.$inject = ['$scope', '$compile', 'AttributeData', 'DialogService', 'DTOptionsBuilder', 'DTColumnBuilder', 'ApiRequest'];
    attributeModule.controller('attributeListController', attributeListController);

    function attributeListController($scope, $compile, AttributeData, DialogService, DTOptionsBuilder, DTColumnBuilder, ApiRequest) {
        var vm = this;

        vm.fieldTypes = [];
        vm.dataTypes = [];
        vm.sysLanguageCode = 'en';
        vm.$rows = {};
        vm.AttributeTypes = [];

        allFieldTypes();
        allAttributeTypes();

        var pagePreference = JSON.parse(localStorage.getItem('AttributeListPreference'));
        var tablePreference = !!pagePreference ? pagePreference : initPreference();

        vm.selectedAttributeType = tablePreference.selectedAttributeType;

        // Pagination settings
        vm.disableAddBtn = false;
        vm.dtInstance = {};
        vm.dtOptions = DTOptionsBuilder.fromSource("")
            .withDataProp('PersonAttributes')
            .withPaginationType('full_numbers')
            .withDisplayLength(tablePreference.pageLength)
            .withOption('rowId', "AttributeId")
            .withOption('createdRow', createdRow)
            .withOption('lengthMenu', [5, 10, 25, 50, 100])
            .withOption('initComplete', function (settings, json) {
            if (!!tablePreference) {
                angular.element('table#attributeList').DataTable().page(tablePreference.currentPage).draw(false);
            }
            settings.oInstance.on('length.dt', function (e, dtSettings, len) {
                updateAttributeListPreference({
                    pageLength : len,
                    currentPage: angular.element('table#attributeList').DataTable().page()
                });
            });
        });
        vm.dtColumns = [
            DTColumnBuilder.newColumn('Title').withTitle('Title').renderWith(titleHtml),
            DTColumnBuilder.newColumn('HintText').withTitle('Hint Text').renderWith(hintTextHtml),
            DTColumnBuilder.newColumn('FieldTypeId').withTitle('Field Type').renderWith(fieldTypeHtml),
            // DTColumnBuilder.newColumn('CreatedOn').withTitle('Created On').renderWith(dateHtml),
            // DTColumnBuilder.newColumn('UpdatedOn').withTitle('Updated On').renderWith(dateHtml),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)];

        angular.element('table#attributeList').on('page.dt', function () {
            var table = angular.element('table#attributeList').DataTable();
            var info = table.page.info();
            updateAttributeListPreference({
                currentPage: info.page
            });
        });

        function titleHtml(data, type, full, meta) {
            var title = '', html = '';
            if (full.Languages[vm.selectedLangCode]) {
                title = full.Languages[vm.selectedLangCode].Title;
            } else {
                title = "&nbsp;";
            }
            html = '<span>' + title + '</span>';
            html += '<p class="subtext" ng-if="sysLanguageCode != selectedLangCode">' + full.Languages[vm.sysLanguageCode].Title + '</p>';
            return html;
        }

        function hintTextHtml(data, type, full, meta) {
            var hintText = '', html = '';
            if (full.Languages[vm.selectedLangCode]) {
                hintText = full.Languages[vm.selectedLangCode].HintText;
            } else {
                hintText = "&nbsp;";
            }
            html = '<span>' + hintText + '</span>';
            html += '<p class="subtext" ng-if="sysLanguageCode != selectedLangCode">' + full.Languages[vm.sysLanguageCode].HintText + '</p>';
            return html;
        }

        function createdRow(row, data, dataIndex) {
            vm.$rows[data.AttributeId] = data;
            $compile(angular.element(row).contents())($scope);
        }

        function fieldTypeHtml(data, type, full, meta) {
            return vm.getFieldTypeName(full.FieldTypeId);
        }

        function dateHtml(data, type, full, meta) {
            if (!data) {
                return "";
            }
            return "{{ '" + data + "' | date:(MM/DD/YYYY) }}";
        }

        function actionsHtml(data, type, full, meta) {
            return '<md-button aria-label="Edit" ui-sref="attribute-edit({attributeId: ' + full.AttributeId + '})" class="edit">' + '<md-icon class="editIcon edit" md-svg-src="editor:mode_edit"></md-icon></md-button>' + '<md-button aria-label="Delete" ng-click="DeleteAttribute(' + full.AttributeId + ', $event)" class="delete">' + '<md-icon class="deleteIcon delete" md-svg-src="actions:delete">' + '</md-icon>' + '</md-button>';
        }

        /**
         * Trash button clicked
         * @param row
         * @param $event
         */
        vm.DeleteAttribute = function (row, $event) {
            var AttributeInfo = getAttributeByRow(row);
            var title = AttributeInfo.Languages[vm.selectedLangCode].Title;
            DialogService.showDeleteConfirmation(title, AttributeInfo.AttributeId).then(function (id) {
                return AttributeData.deleteAttribute(id);
            }).then(function (result) {
                getDataTableRow(row).remove().draw('page');
                DialogService.openToast('Attribute ' + title + ' was deleted successfully. ');
            });
        };

        //change attribute type.
        vm.changeAttributeType = function () {
            if (angular.isDefined(vm.selectedAttributeType)) {
                var queryParam = '';
                var selectedAttrLength = vm.selectedAttributeType.length;
                vm.disableAddBtn = vm.selectedAttributeType.indexOf(4) != -1;
                if (selectedAttrLength > 1) {
                    for (var i = 0; i < selectedAttrLength; i++) {
                        queryParam += '&attributeTypeFilter=' + vm.selectedAttributeType[i];
                    }
                    queryParam = '?' + queryParam.substring(1);
                } else if (selectedAttrLength == 1) {
                    queryParam = '?attributeTypeFilter=' + vm.selectedAttributeType;
                } else {
                    queryParam = '?';
                }
                vm.newSource = '/api/attributes' + queryParam + '&languageCode=' + vm.selectedLangCode + '&languageCode=' + vm.sysLanguageCode;


                vm.dtInstance.changeData(vm.newSource);

                updateAttributeListPreference({
                    selectedAttributeType: vm.selectedAttributeType
                });
            }
        };

        function initPreference() {
            var preference = {
                pageLength           : 10,
                selectedAttributeType: [1],
                currentPage          : 0
            };
            localStorage.setItem('AttributeListPreference', JSON.stringify(preference));
            return preference;
        }

        function updateAttributeListPreference(obj) {
            tablePreference = JSON.parse(localStorage.getItem('AttributeListPreference'));
            if (!!tablePreference) {
                angular.extend(tablePreference, obj);
                localStorage.setItem('AttributeListPreference', JSON.stringify(tablePreference));
            } else {
                tablePreference = initPreference();
            }
        }

        function getAttributeByRow(row) {
            return getDataTableRow(row).data();
        }

        function getDataTableRow(row) {
            return getDataTable().row('#' + row);
        }

        function getDataTable() {
            return vm.dtInstance.DataTable;
        }

        vm.getFieldTypeName = function (fieldTypeId) {
            for (var i = 0; i < vm.fieldTypes.length; i++) {
                if (vm.fieldTypes[i].FieldTypeId == fieldTypeId) {
                    return vm.fieldTypes[i].Title;
                }
            }
            return "";
        };

        function allAttributeTypes() {
            AttributeData.getAllAttributeTypes().then(function (data, status) {
                vm.AttributeTypes = data;
            });
        }

        function allFieldTypes() {
            AttributeData.getAllFieldTypes().then(function (data, status) {
                vm.fieldTypes = data;
            });
        }
    }


};