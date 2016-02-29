define('dataFactory',['app'],function(){
	
	angular.module('app').factory('dataFactory', ['$http', '$q', function($http, $q){
		var obj = {
			data: {},
			getDataFromBackend: function(url,sortObj,filterObj){
				
				obj.data.loading = true;
				var deferred = $q.defer(),
					config = {
						method: 'GET',
						url: url
					};
				$http(config).then(function(data){
					// console.log(data);
					deferred.resolve(data.data);
					obj.data.loading = false;
				},function(error){
					deferred.reject(error);
					obj.data.loading = false;
				});
				return deferred.promise;
			}
		};
		return obj;
	}]);
});