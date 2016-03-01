define('bodyController',['angular','sweet-alert','app','dataFactory',
	'offsetFilter'], function(angular, swal){

	angular.module('app').controller('bodyController',['$scope','dataFactory',
		 function($scope, dataFactory){
		$scope.currentPage = 1;
		$scope.pageSize = 30;

		// localStorage.setItem('allCardsData',JSON.stringify($scope.allCardsData));
		// JSON.parse(localStorage.getItem('allCardsData')) 
		$scope.fnPostComments = function(issueObj){
			console.log('inside');
			// console.log(issueObj.id, issueObj.test);
			if(issueObj.commentText){
				debugger;
				var localComments = localStorage.getItem( issueObj.id)? JSON.parse(localStorage.getItem( issueObj.id)):[] ;
				var commentObj = {
					'user':{ 
						'login':'localUser',
						'avatar_url': 'https://avatars.githubusercontent.com/u/14919965?v=3'
						},
					'body': issueObj.commentText};

				issueObj.comments++;

				if(issueObj.localComments){
					issueObj.localComments.push(commentObj);
				} else {
					issueObj.localComments = [commentObj];
				}
				
				issueObj.commentText = '';
				
				localComments.push(commentObj);
				localStorage.setItem(issueObj.id, JSON.stringify(localComments));
			}
		};
		$scope.fnCheckLocalStorage = function(issueObj){
			// console.log('inside teejjrjr',issueObj)
			var localComments = localStorage.getItem( issueObj.id)? JSON.parse(localStorage.getItem( issueObj.id)):[] ;
			
			return localComments;

			// return true;
		};

		$scope.fnGetComments = function(issueObj){
			
			var commentsURL = repoIssueURL+'/'+issueObj.number+'/comments';
			dataFactory.getDataFromBackend(commentsURL).then(function(data){
					console.log(data);
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
				var repoURL = 'http://api.github.com/repos/' + partURL;
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
				},function(err){
					$scope.dataLoaded = true;
					console.log(err);
					swal('Error','Please enter a valid git url','error');
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