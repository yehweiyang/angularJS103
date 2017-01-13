myApp
		.controller(
				'MyFile2Controller',
				[
						'$scope',
						'$rootScope',
						'$http',
						'$filter',
						'Service',
						function($scope, $rootScope, $http, $filter, Service) {

							  $scope.invokeFirstCtrl = function() {
								    var Id = '2';
								    MyService.tempMethod(Id);

								  };
							
							
							$scope.foo = Service.foo;
							console.log(2222222);
							console.log($scope.foo);
							$scope.$on('parentmethod', function(event, args) {
								console.log('on............');
								$scope.Message = args.message;
							})
							$scope.userNumber = Service.foo.CUST_ID;
							$scope.userName = Service.foo.CUST_NAME;
							$scope.userLv = Service.foo.VIP_CODE;
							$scope.userDeposit = Service.foo.DEPOSIT;
							$scope.userDate = new Date(Service.foo.ENTRY_DATE);

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

								var editObj = {
									"CUST_ID" : $scope.userNumber,
									"CUST_NAME" : $scope.userName,
									"VIP_CODE" : $scope.userLv,
									"DEPOSIT" : $scope.userDeposit,
									"ENTRY_DATE" : new Date($scope.userDate)
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
