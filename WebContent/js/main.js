var myApp = angular.module("myApp", []);

myApp.controller('AppController', [ '$scope', '$rootScope', function($scope) {

	$scope.reset = function() {
		console.log($scope.userName);
		console.log($scope.userNumber);
		$scope.userNumber = '';
		$scope.userName = '';
		alert('clear');
		console.log('reset.......');
	}
	$scope.send = function() {
		alert('查詢條件 : ' + $scope.userNumber + ' ' + $scope.userName);
	};

} ]);

myApp.controller('AppController2', [ '$scope', '$http',
		function($scope, $http) {
			var myObj = [ {
				"number" : '001',
				"name" : '吉米',
				"deposit" : 998
			}, {
				"number" : '002',
				"name" : '肯',
				"deposit" : 780000
			}, {
				"number" : '003',
				"name" : '大衛',
				"deposit" : 200000
			}, {
				"number" : '004',
				"name" : '亞瑟',
				"deposit" : 900000
			}, {
				"number" : '005',
				"name" : '艾倫',
				"deposit" : 5566
			}, {
				"number" : '006',
				"name" : '尚',
				"deposit" : 100000
			} ];
			$scope.myObj = myObj;

		} ]);

myApp.controller('AppController3', [ '$scope', '$http',
		function($scope, $http) {
			
			$scope.change = function() {
				$http.get('json/level.json').success(function(data) {
					// you can do some processing here
					$scope.userLevel = data;
				});
			}

		} ]);
