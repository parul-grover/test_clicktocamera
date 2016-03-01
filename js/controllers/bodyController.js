define('bodyController',['angular','sweet-alert','app','dataFactory',
	'filters'], function(angular, swal){

	angular.module('app').controller('bodyController',['$scope', '$timeout', '$filter' ,'dataFactory',
		 function($scope, $timeout, $filter, dataFactory){
		$scope.currentPage = 1;
		$scope.pageSize = 30;

		// function to post comments
		$scope.fnPostComments = function(issueObj){
			if(issueObj.commentText){
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

		//function to check if comments for an issue are available in localstorage
		$scope.fnCheckLocalStorage = function(issueObj){
			var localComments = localStorage.getItem( issueObj.id)? JSON.parse(localStorage.getItem( issueObj.id)):[] ;
			
			return localComments;

		};

		//funciton to get comments for an issue.
		$scope.fnGetComments = function(issueObj){
			
			var commentsURL = repoIssueURL+'/'+issueObj.number+'/comments';
			dataFactory.getDataFromBackend(commentsURL).then(function(data){
					issueObj.commentsArray = data;
					
				},function(err){
					swal('Error','Error in fetching comments. Try again later','error');
				});
		};

		//function called when page is changed
		$scope.fnChangePage = function(){
			$scope.currentOffset = $scope.pageSize * ($scope.currentPage - 1); 
			window.scrollTo(0,0);
		};

		//function to check for the validity of a url
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
								
								$timeout(function() {
									$scope.inOneDay = $filter('timeBasedFilter')($scope.allIssues,1);
									$scope.in7Days = $filter('timeBasedFilter')($scope.allIssues,7);
								}, 10);
							
							},function(err){
								$scope.dataLoaded = true;
								swal('Error','Something went wrong.','error');
							});
						}
					} else {
						$scope.dataLoaded = true;
						swal('Oops','No open issues for this repo.','message','info');
					}
				},function(err){
					$scope.dataLoaded = true;
					swal('Error','Please enter a valid git url','error');
				});
			} else {
				swal('Error','Please enter a valid git url','error');
			}
		};	

		//funciton to check for enter
		$scope.fnCheckForEnter = function(event){
			if(event.keyCode === 13){
				fnCheckValidURL();
			}
		};

		//funciton to check for enter
		$scope.fnCheckForCommentEnter = function(event, obj){
			if(event.keyCode === 13){
				$scope.fnPostComments(obj);
			}
		};
		//--------END------//
	}]);

	//manual bootstraping of angular app
	angular.element(document).ready(function(){
		angular.bootstrap(document, ['app']);
	});
});