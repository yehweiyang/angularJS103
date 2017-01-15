myApp.controller('MyFile3Controller', [
		'$scope',
		'$http',
		'MyService',
		'Scopes',
		'dataShare',
		function($scope, $http, MyService, Scopes, dataShare) {

			$scope.currentPage = 1; // keeps track of the current page
			$scope.pageSize = 10;// holds the number of items per page

			$scope.sortType = 'CUST_ID'; // set the default sort type
			$scope.sortReverse = false; // set the default sort order
			$scope.searchFish = ''; // set the default search/filter

			$scope.setSelected = function(idSelectedVote) {
				$scope.idSelectedVote = idSelectedVote;
				Scopes.store("GET", idSelectedVote);
				if ($scope.checkboxModel.value1 === true
						&& $scope.checkboxModel.value2 === true) {
					MyService.tempMethod(idSelectedVote);
				}
			};

			$scope.$on('data_shared', function() {
				var text = dataShare.getData();
				$scope.text = text;
				if (text.length > 0) {
					$scope.wihtoutResult = false;
					$scope.wihtResult = true;
				} else {
					$scope.wihtoutResult = true;
					$scope.wihtResult = false;
				}
			});
			$scope.$on('reset', function() {
				$scope.wihtoutResult = false;
				$scope.wihtResult = false;
			});

		} ]);
