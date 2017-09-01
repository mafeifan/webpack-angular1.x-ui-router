module.exports = ngModule => {
	ngModule.directive('copyRight', function(){
    return {
      restrict: 'EA',
      replace: true,
      template: '<p class="pull-right">&copy;  2017</p>'
    }
	})
};
