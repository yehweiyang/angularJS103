myApp.controller('MyFile1Controller', [
		'$scope',
		'$rootScope',
		'$http',
		'$filter',
		'Service',
		'MyService',
		function($scope, $rootScope, $http, $filter, Service,MyService) {

			$scope.currentPage = 1; // keeps track of the current page
			$scope.pageSize = 10 // holds the number of items per page

			var json = {};


			
			

			$scope.sortType = 'CUST_ID'; // set the default sort type
			$scope.sortReverse = false; // set the default sort order
			$scope.searchFish = ''; // set the default search/filter
			// term

			$scope.setSelected = function(idSelectedVote) {

				$scope.idSelectedVote = idSelectedVote;
				if ($scope.checkboxModel.value1 === true) {
						console.log('123');
						MyService.tempMethod(idSelectedVote);

					Service.foo = idSelectedVote;
					console.log(Service.foo)
					$scope.$broadcast('parentmethod', {
						message : "Hello"
					});
				}
			};

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
				if (localStorage.getItem("fakeData") === null) {
					$http.get("json/client.json").success(
							function(response) {
								localStorage.setItem("fakeData", JSON
										.stringify(response));
								json = response;
								queryMethid(json, $scope.userNumber,
										$scope.userName, $scope.userLv,
										$scope.userDate);
							});
				}
				$scope.status = true;
				queryMethid(JSON.parse(localStorage.getItem("fakeData")),
						$scope.userNumber, $scope.userName, $scope.userLv,
						$scope.userDate);
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
			};
			$("tr").click(function() {
				console.log('oooo');
				// your click time codes...
			});
		} ]);
