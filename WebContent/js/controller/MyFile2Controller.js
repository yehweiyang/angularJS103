myApp
		.controller(
				'MyFile2Controller',
				[
						'$scope',
						'$rootScope',
						'$http',
						'$filter',
						'Scopes',
						function($scope, $rootScope, $http, $filter, Scopes) {


							$scope.$on('FirstCtrlMethod', function() {

								$scope.userNumber = Scopes.get("GET").CUST_ID;
								$scope.userName = Scopes.get("GET").CUST_NAME;
								$scope.userLv = Scopes.get("GET").VIP_CODE;
								$scope.userDeposit = Scopes.get("GET").DEPOSIT;
								$scope.userDate = new Date(
										Scopes.get("GET").ENTRY_DATE);
							})

							$scope.myFunc = function($event) {

								if ($scope.userNumber != undefined
										&& $scope.userName != undefined) {
									var json = {};

									if (localStorage.getItem("fakeData") === null) {
										$http
												.get("json/client.json")
												.success(
														function(response) {
															localStorage
																	.setItem(
																			"fakeData",
																			JSON
																					.stringify(response));
															queryMethid(
																	response,
																	$scope.userNumber,
																	$scope.userName);
														});
									}
									queryMethid(JSON.parse(localStorage
											.getItem("fakeData")),
											$scope.userNumber, $scope.userName);

								}
							};

							var queryMethid = function(data, number, name) {
								var filter = {};
								filter.CUST_ID = $scope.userNumber;
								filter.CUST_NAME = $scope.userName;
								data = data.filter(function(item) {

									for ( var key in filter) {

										if (item[key] === undefined
												|| item[key] != filter[key])
											return false;
									}
									return true;
								});
								$scope.userLv = data[0].VIP_CODE;
								$scope.userDate = new Date(data[0].ENTRY_DATE);
								$scope.userDeposit = data[0].DEPOSIT;
							};

							$scope.edit = function() {
								if ($scope.userDate == undefined
										|| $scope.userDate == null
										|| $scope.userDate == '') {
									$scope.userDate = '';
								} else {
									var bdata = $filter('date')(
											new Date($scope.userDate),
											'yyyy-MM-dd');
									$scope.userDate = bdata;
								}
								var editObj = {
									"CUST_ID" : $scope.userNumber,
									"CUST_NAME" : $scope.userName,
									"VIP_CODE" : $scope.userLv,
									"DEPOSIT" : $scope.userDeposit,
									"ENTRY_DATE" : $scope.userDate
								};
								var response = updateJSON(
										JSON.parse(localStorage
												.getItem("fakeData")), editObj);
								localStorage.setItem("fakeData", JSON
										.stringify(response));

								function updateJSON(src, newRecord) {
									return src
											.map(function(item) {
												console
														.log((item.CUST_ID === newRecord.CUST_ID && item.CUST_NAME === newRecord.CUST_NAME));
												return (item.CUST_ID === newRecord.CUST_ID && item.CUST_NAME === newRecord.CUST_NAME) ? newRecord
														: item;
											});
								}

							}
						} ]);
