myApp.controller('MyFile1Controller', [
		'$scope',
		'$rootScope',
		'$http',
		'$filter',
		function($scope, rootScope, $http, $filter) {
			// a sample array use for paging
			$scope.list = [];

			$scope.currentPage = 1; // keeps track of the current page
			$scope.pageSize = 10 // holds the number of items per page

			var json = {};

			$scope.sortType = 'CUST_ID'; // set the default sort type
			$scope.sortReverse = false; // set the default sort order
			$scope.searchFish = ''; // set the default search/filter
			// term

			$scope.query = function() {
				if ($scope.userDate == undefined || $scope.userDate == null
						|| $scope.userDate == '') {
					$scope.userDate = '';
				} else {
					var bdata = $filter('date')(new Date($scope.userDate),
							'yyyy-MM-dd');
					$scope.userDate = bdata;
				}
				if ($scope.userLv === undefined) {
					$scope.userLv = '';
				}
				$http.get("json/client.json").success(
						function(response) {
							json = response;
							$scope.status = true;
							queryMethid(json, $scope.userNumber,
									$scope.userName, $scope.userLv,
									$scope.userDate);
						});

			};

			$scope.reset = function() {
				$scope.status = false;
				$scope.userNumber = '';
				$scope.userName = '';
				$scope.userDate = '';
				$scope.userLv = '';
			};

			var queryMethid = function(data, number, name, level, enterDate) {
				var filter = {};
				if (number != '') {
					filter.CUST_ID = $scope.userNumber;
				}
				if (name != '') {
					filter.CUST_NAME = $scope.userName;
				}
				if (level != '') {
					filter.VIP_CODE = $scope.userLv;
				}
				if (enterDate != '') {
					filter.ENTRY_DATE = $scope.userDate;
				}
				data = data
						.filter(function(item) {

							for ( var key in filter) {

								if (item[key] === undefined
										|| item[key] != filter[key])
									return false;

							}
							return true;
						});
				$scope.datas = data;
				$scope.total = data.length;
			};

		} ]);
