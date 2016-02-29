define('bodyController',['angular','sweet-alert','app','dataFactory',
	'offsetFilter'], function(angular, swal){

	angular.module('app').controller('bodyController',['$scope','dataFactory',
		 function($scope, dataFactory){
		$scope.currentPage = 1;
		$scope.pageSize = 30;
		$scope.fnGetComments = function(issueObj){
			
			var commentsURL = repoIssueURL+'/'+issueObj.number+'/comments';
			dataFactory.getDataFromBackend(commentsURL).then(function(data){
					
					issueObj.commentsArray = data;
					
				},function(err){
					swal('Error','Error in fetching comments. Try again later','error');
				});
		};

		$scope.fnChangePage = function(){
			$scope.currentOffset = $scope.pageSize * ($scope.currentPage - 1); 
			window.scrollTo(0,0);
		};

		var fnCheckValidURL = function(){
			if( $scope.searchText.indexOf('github.com') >-1 && $scope.searchText.split('github.com/')[1]){
				var partURL = $scope.searchText.split('github.com/')[1];
				repoURL = 'http://api.github.com/repos/' + partURL;
				repoIssueURL = repoURL + '/issues' ;
				$scope.dataLoaded = false;
				$scope.allIssues = [];

				dataFactory.getDataFromBackend(repoURL).then(function(data){
					$scope.repoDetails = data;
					if(data.open_issues_count >0){
						for(var i=0 ; i <= parseInt(data.open_issues_count / 100); i++){
							var j = i;
							var filters = '?state=open&per_page=100&page='+ (j+1);
							
							dataFactory.getDataFromBackend(repoIssueURL + filters).then(function(issueData){
							
								$scope.dataLoaded = 'loaded';
								$scope.allIssues = $scope.allIssues.concat(issueData);
								console.log($scope.allIssues);
							},function(err){
								$scope.dataLoaded = true;
								swal('Error','Please enter a valid git url','error');
							});
						}
					}
				});
			} else {
				swal('Error','Please enter a valid git url','error');
			}
		};	

		$scope.fnCheckForEnter = function(event){
			if(event.keyCode === 13){
				// console.log($scope.searchText)
				fnCheckValidURL();
			}
		};
		//--------END------//
	}]);

	angular.element(document).ready(function(){
		angular.bootstrap(document, ['app']);
	});
});