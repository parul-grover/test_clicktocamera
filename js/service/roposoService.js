define('roposoService',['app'],function(){
	angular.module('roposoApp').service('roposoService', function(){
		this.viewType = 'gridView',
		this.setViewType = function(mode) {
	        this.viewType = mode;
	    };
	});
});