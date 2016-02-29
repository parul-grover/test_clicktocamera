define('roposoService',['app'],function(){
	angular.module('app').service('roposoService', function(){
		this.viewType = 'gridView',
		this.setViewType = function(mode) {
	        this.viewType = mode;
	    };
	});
});