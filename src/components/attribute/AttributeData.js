module.exports = attributeModule => {
	attributeModule.factory('AttributeData', AttributeData);
	AttributeData.$inject = ['$http', 'DialogService', 'ErrorService', 'ApiRequest'];

	function AttributeData($http, DialogService, ErrorService, ApiRequest) {
		return {
			getAllAttributes,
			getAttribute,
			createAttribute,
			editAttribute,
			showAlert,
			deleteAttribute,
			errorManager,
			handleUnauthorized,
			getAllFieldTypes,
			getAllDataTypes,
			getAllAttributeTypes
		};

		function getAllAttributeTypes() {
			return ApiRequest.get('Form', '/attributetype');
		}

		function getAllFieldTypes() {
			return ApiRequest.get('Form', '/fieldtype');
		}

		function getAllDataTypes() {
			return ApiRequest.get('Application', '/datatype');
		}

		function getAllAttributes() {
			return $http.get('/api/attributes');
		}

		function getAttribute(id, language) {
			return $http.get('/api/attributes/' + id + '?language=' + language).error(ErrorService.errorCallback);
		}

		function createAttribute(data) {
			return $http.post('/api/attributes', data).error(ErrorService.errorCallback);
		}

		function editAttribute(data, id, LanguageCode) {
			return $http.put('/api/attributes/' + id + '/Language/' + LanguageCode, data).error(ErrorService.errorCallback);
		}

		function errorManager(e, status) {
			return ErrorService.errorManager(e, status);
		}

		function showAlert(data) {
			return DialogService.showAlert(data);
		}

		function handleUnauthorized(status) {
			return ErrorService.handleUnauthorized(status);
		}

		function deleteAttribute(id) {
			return $http({
				method: "delete",
				url   : '/api/attributes/' + id
			});
		}
	}
};

