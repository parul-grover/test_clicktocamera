define('headerController',['angular','app','roposoService'],function(angular){

	angular.module('roposoApp').controller('headerController',['$scope','$rootScope',
		'roposoService',function($scope, $rootScope, roposoService){
		
		$scope.fnAddCard = function(){
			$rootScope.$broadcast('addCardEvent', []);
		}

		$scope.viewType = roposoService.viewType; 
		$scope.fnSwitchViewType = function(mode){
			roposoService.setViewType(mode);
		}
	}]);
});