module.exports = ngModule => {
	ngModule.directive('demoDirective', function(){
	    return { 
	        restrict: 'EA', 
	        replace: true, 
	        template: '<a href="https://google.com">Click me to go to Google</a>' 
	    } 
	})
};
