define('offsetFilter',['app'],function(){
	angular.module('app').filter('offset', function() {
		return function(input, start) {
			start = parseInt(start, 10);
			return input ? input.slice(start) : '';
		};
	});
});