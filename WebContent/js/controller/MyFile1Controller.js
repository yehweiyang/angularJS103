myApp.controller('MyFile1Controller', [
		'$scope',
		'$rootScope',
		'$http',
		'$filter',
		'MyService',
		'dataShare',
		function($scope, $rootScope, $http, $filter, MyService, dataShare) {

			var json = {};

			$scope.query = function() {
				reUse();
			};
			var reUse = function() {
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
				queryMethid(JSON.parse(localStorage.getItem("fakeData")),
						$scope.userNumber, $scope.userName, $scope.userLv,
						$scope.userDate);

			};
			;

			$scope.$on('data_send', function() {
				$scope.userNumber = $rootScope.userNumber;
				$scope.userName = $rootScope.userName;
				$scope.userDate = $rootScope.userDate;
				$scope.userLv = $rootScope.userLv;
				reUse();
			});

			$scope.reset = function() {
				dataShare.reset();
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
				MyService.queryMethod();
				if (data.length > 0) {
					$rootScope.userNumber = $scope.userNumber;
					$rootScope.userName = $scope.userName;
					$rootScope.userDate = $scope.userDate;
					$rootScope.userLv = $scope.userLv;
					dataShare.sendData($scope.datas);
				} else {
					dataShare.sendData($scope.datas);
				}
			};
		} ]);
