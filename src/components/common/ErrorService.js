module.exports = ngModule => {
    ngModule.factory('ErrorService', ['DialogService', '$state', function (DialogService, $state) {

        return {
            errorManager,
            handleUnauthorized,
            errorCallback
        };

        function errorManager(e, status) {
            let messages = [];
            if (status == 422) {
                for (var key in e) {
                    if (e.hasOwnProperty(key)) {
                        var obj = e[key];
                        for (var prop in obj) {
                            // important check that this is objects own property
                            // not from prototype prop inherited
                            if (obj.hasOwnProperty(prop)) {
                                var msg = {"field": key, "message": obj[prop]};
                                messages.push(msg);
                            }
                        }
                    }
                }
            }
            else if (status >= 400 && status < 500) {
                if (e.messages) {
                    messages = e.messages;
                }
                else if (e.Message) {
                    messages = e.Message;
                }
                else if (e.errors.messages) {
                    messages = e.errors.messages;
                }
                else if (e.errors.Message) {
                    messages = e.errors.Message;
                }
            } else if (e.errors && e.errors.messages) {
                messages = e.errors.messages;
            }
            else if (e.errors && e.errors.Message) {
                messages = e.errors.Message;
            }
            return messages;
        }

        function handleUnauthorized(status) {
            if (status === 401) {
                localStorage.clear();
                $state.go('login');
            }
        }

        function errorCallback(e, status) {
            handleUnauthorized(status);
            let messages = errorManager(e, status);
            return DialogService.showAlert(messages);
        }
    }]);
};



