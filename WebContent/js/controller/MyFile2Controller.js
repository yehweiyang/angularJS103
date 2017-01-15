myApp
		.controller(
				'MyFile2Controller',
				[
						'$scope',
						'$rootScope',
						'$http',
						'Scopes',
						'$templateCache',
						'$window',
						'$filter',
						'dataShare',
						function($scope, $rootScope, $http, Scopes,
								$templateCache, $window, $filter, dataShare) {

							$scope
									.$on(
											'FirstCtrlMethod',
											function() {

												$scope.userNumber2 = Scopes
														.get("GET").CUST_ID;
												$scope.userName2 = Scopes
														.get("GET").CUST_NAME;
												$scope.userLv2 = Scopes
														.get("GET").VIP_CODE;
												$scope.userDeposit2 = Scopes
														.get("GET").DEPOSIT;
												$scope.userDate2 = new Date(
														Scopes.get("GET").ENTRY_DATE);
											});

							$scope.edit = function() {
								if ($scope.userDate2 == undefined
										|| $scope.userDate2 == null
										|| $scope.userDate2 == '') {
									$scope.userDate2 = '';
								} else {
									alert('修改');
									var bdata = $filter('date')(
											new Date($scope.userDate2),
											'yyyy-MM-dd');
									$scope.userDate2 = bdata;
								}
								var editObj = {
									"CUST_ID" : $scope.userNumber2,
									"CUST_NAME" : $scope.userName2,
									"VIP_CODE" : $scope.userLv2,
									"DEPOSIT" : $scope.userDeposit2,
									"ENTRY_DATE" : $scope.userDate2
								};
								var response = updateJSON(
										JSON.parse(localStorage
												.getItem("fakeData")), editObj);
								localStorage.setItem("fakeData", JSON
										.stringify(response));
								var reQuery = {
									"CUST_ID" : $scope.userNumber2,
									"CUST_NAME" : $scope.userName2,
									"VIP_CODE" : $scope.userLv2,
									"ENTRY_DATE" : $scope.userDate2
								};
								dataShare.setData(reQuery);
							};
							$scope.myFunc = function($event) {

								if ($scope.userNumber2 != undefined
										&& $scope.userName2 != undefined) {
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
															queryMethod(
																	response,
																	$scope.userNumber2,
																	$scope.userName2);
														});
									}
									queryMethod(JSON.parse(localStorage
											.getItem("fakeData")),
											$scope.userNumber2,
											$scope.userName2);

								}
							};

							function updateJSON(src, newRecord) {
								return src
										.map(function(item) {
											return (item.CUST_ID === newRecord.CUST_ID && item.CUST_NAME === newRecord.CUST_NAME) ? newRecord
													: item;
										});
							}

							var queryMethod = function(data, number, name) {
								var filter = {};
								filter.CUST_ID = $scope.userNumber2;
								filter.CUST_NAME = $scope.userName2;
								data = data.filter(function(item) {

									for ( var key in filter) {

										if (item[key] === undefined
												|| item[key] != filter[key])
											return false;
									}
									return true;
								});
								$scope.userLv2 = data[0].VIP_CODE;
								$scope.userDate2 = new Date(data[0].ENTRY_DATE);
								$scope.userDeposit2 = data[0].DEPOSIT;
							};

							$scope.reset = function() {
								$scope.userNumber2 = '';
								$scope.userName2 = '';
								$scope.userDate2 = '';
								$scope.userLv2 = '';
								$scope.userDeposit2 = '';
							};
						} ]);
