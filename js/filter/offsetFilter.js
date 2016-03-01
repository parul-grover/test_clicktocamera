define('offsetFilter',['app'],function(){
	angular.module('app').filter('offset', function() {
		return function(input, start) {
			start = parseInt(start, 10);
			return input ? input.slice(start) : '';
		};
	}).filter('timeBasedFilter',function(){
		return function(input, daysOffset){
			
			var prevDate = new Date();
			prevDate.setDate(prevDate.getDate() - daysOffset);
			
			console.log( prevDate );
			var filteredArr = []	

			angular.forEach(input, function(element, index){
				var tempDate = new Date(element.updated_at);
				if(tempDate.getTime() > prevDate.getTime()){
					filteredArr.push(element);
				}
			});
			return filteredArr;
		}
	});
});