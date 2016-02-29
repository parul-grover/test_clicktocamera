define('bodyController',['angular','sweet-alert','app','roposoService','contenteditableDirective'],function(angular, swal){

	angular.module('roposoApp').controller('bodyController',['$scope','roposoService', function($scope,roposoService){
		
		var fnFetchData = function(){

		};

		$scope.fnCheckForEnter = function(event){
			if(event.keyCode === 13){
				console.log($scope.searchText)
				fnFetchData();
			}
		};

		$scope.allCardsData = JSON.parse(localStorage.getItem('allCardsData')) ? JSON.parse(localStorage.getItem('allCardsData')) : [];
		$scope.viewType = roposoService.viewType;

		$scope.$watch(function () {
	       return roposoService.viewType;
	     },                       
	      function(newVal, oldVal) {
	       	$scope.viewType = newVal;
	    }, true);

		//--------- Edit card functionality start----------/	
		$scope.fnSaveEditedDetails = function(cardNumber,card){
			
			$scope.allCardsData[cardNumber] = {
				title : angular.element('<div>' + card.title + '</div>').text(),
				description : angular.element('<div>'+ card.description +'</div>').text()
			};
			
			localStorage.setItem('allCardsData',JSON.stringify($scope.allCardsData));
			swal("Success!", "Details saved successfully", "success")
		};
		//--------END------//

		//--------- Delete card functionality start----------/	
		$scope.fnDeleteCard = function(cardNumber){
			var cardsData = localStorage.getItem('allCardsData');
			var parsedData = JSON.parse(cardsData);
			
			parsedData.splice(cardNumber,1);

			$scope.allCardsData = parsedData;
			localStorage.setItem('allCardsData',JSON.stringify(parsedData));
		};
		//--------END------//

		//--------- Add card functionality start----------/
		$scope.$on('addCardEvent',function(){
			fnAddCard();
		});

		var fnUpdateScopeVariable = function(variable , value){
			$scope[variable] = value;
		};

		var fnAddCard = function(){
			var dummyObj = {
								title:'Add title',
								description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac eros ante. Ut dapibus enim vel ex porttitor egestas. Nullam maximus mauris pretium, malesuada felis.'
							}
			var cardsData = localStorage.getItem('allCardsData');
			if(cardsData){
				var parsedData = JSON.parse(cardsData);
				parsedData.push(dummyObj);
				localStorage.setItem('allCardsData',JSON.stringify(parsedData));
			} else {
				localStorage.setItem('allCardsData',JSON.stringify([dummyObj]));
			}
			fnUpdateScopeVariable( 'allCardsData' ,JSON.parse(localStorage.getItem('allCardsData')));
		};
		//--------END------//
	}]);

});