module.exports = (ngModule) => {
    ngModule.factory('UtilService', function(){

        return {
            pathAt,
            pathIntegerAt
        };


        function pathAt(index, defaultValue, str) {
            if (!str) {
                str = window.location.pathname;
            }
            var splitArr = str.split('/');
            var rawData = splitArr[index];
            var data = rawData === undefined ? defaultValue : rawData;
            return data;
        }

        function pathIntegerAt(index, defaultValue, str) {
            var rawData = pathAt(index, defaultValue, str);
            var data = isNaN(rawData) ? defaultValue : rawData;
            return parseInt(data);
        }
    })
};

