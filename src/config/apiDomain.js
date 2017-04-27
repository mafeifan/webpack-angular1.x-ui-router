module.exports = {

    'dev.studenttrac.com': {
        'phpApiUrl': 'https://dev.studenttrac.com',
        'Authentication': 'http://dev.authentication.srv.edudyn.com',
        'Authorization': 'http://dev.authorization.srv.edudyn.com',
        'Application': 'http://dev.application.srv.edudyn.com',
        'OldAuthentication': 'http://dev.authentication25.srv.edudyn.com',
        'Files': 'http://dev-stfile.srv.edudyn.com',
        'Person': 'http://dev.person.srv.edudyn.com',
        'Client': 'http://dev.client.srv.edudyn.com',
        'Form': 'http://dev.form.srv.edudyn.com',
        'Address': 'http://dev.address.srv.edudyn.com',
        'Assessment': 'http://dev.assessment.srv.edudyn.com'
    },

    'studenttrac.com': {
        'Authentication': 'http://authentication-srv.edudyn.com',
        'Authorization': 'http://authorization-srv.edudyn.com',
        'Application': 'http://application-srv.edudyn.com',
        'OldAuthentication': 'http://isisauth-srv.edudyn.com',
        'Files': 'http://stfile-srv.edudyn.com',
        'Person': 'http://person-srv.edudyn.com',
        'Client': 'http://client-srv.edudyn.com',
        'Form': 'http://form-srv.edudyn.com',
        'Address': 'http://address-srv.edudyn.com',
        'Assessment': 'http://assessment.srv.edudyn.com'
    },

    'qa.studenttrac.com': {
        'Authentication': 'http://qa.authentication.srv.edudyn.com',
        'Authorization': 'http://qa.authorization.srv.edudyn.com',
        'Application': 'http://qa.application.srv.edudyn.com',
        'OldAuthentication': 'http://qa.authentication25.srv.edudyn.com',
        'Files': 'http://qa-stfile.srv.edudyn.com',
        'Person': 'http://qa.person.srv.edudyn.com',
        'Client': 'http://qa.client.srv.edudyn.com',
        'Form': 'http://qa.form.srv.edudyn.com',
        'Address': 'http://qa.address.srv.edudyn.com',
        'Assessment': 'http://qa.assessment.srv.edudyn.com'
    },

    'stage.studenttrac.com': {
        'Authentication': 'http://stage-authentication-srv.edudyn.com',
        'Authorization': 'http://stage-authorization-srv.edudyn.com',
        'Application': 'http://stage-application-srv.edudyn.com',
        'OldAuthentication': 'http://stage-isistracauth-srv.edudyn.com',
        'Files': 'http://stage-stfile-srv.edudyn.com',
        'Person': 'http://stage-person-srv.edudyn.com',
        'Client': 'http://stage-client-srv.edudyn.com',
        'Form': 'http://stage-form-srv.edudyn.com',
        'Address': 'http://stage-address-srv.edudyn.com',
        'Assessment': 'http://stage-assessment.srv.edudyn.com'
    },

    'training.studenttrac.com': {
        'Authentication': 'http://training-authentication-srv.edudyn.com',
        'Authorization': 'http://training-authorization-srv.edudyn.com',
        'Application': 'http://training-application-srv.edudyn.com',
        'Files': 'http://training-stfile-srv.edudyn.com',
        'Person': 'http://training-person-srv.edudyn.com',
        'Client': 'http://training-client-srv.edudyn.com',
        'Form': 'http://training-form-srv.edudyn.com',
        'Address': 'http://training-address-srv.edudyn.com',
        'Assessment': 'http://training-assessment.srv.edudyn.com',
        'OldAuthentication': 'http://training-isistracauth-srv.edudyn.com'
    },

    extractDomain: function (url) {
        var domain;
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
            domain = domain.split(':')[0];
        }

        return domain;
    },

    getApiUrl: function () {
        var domain = this.extractDomain(document.location.origin);
        util.apiUrl = this[domain] || this['dev.studenttrac.com'];
    }
};
