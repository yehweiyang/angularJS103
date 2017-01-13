var myApp = angular.module("myApp", [ 'ui.bootstrap' ]).filter('start',
		function() {
			return function(input, start) {
				if (!input || !input.length) {
					return;
				}

				start = +start;
				return input.slice(start);
			};
		}).filter('lv', function() {
	return function(number) {
		if (number === 'N') {
			return '一般';
		} else if (number === 'G') {
			return '黃金';
		} else if (number === 'D') {
			return '鑽石';
		}

	};
});

myApp.service('MyService', function($rootScope) {
	var Messenger = {
		tempMethod : function() {
			$rootScope.$broadcast('FirstCtrlMethod');
		},
		queryMethod : function() {
			console.log('temp.........33');
			$rootScope.$broadcast('SecondCtrlMethod');
		}
	};
	return Messenger;
});

myApp.factory('Scopes', function($rootScope) {
	var mem = {};

	return {
		store : function(key, value) {
			mem[key] = value;
		},
		get : function(key) {
			return mem[key];
		}
	};
});

myApp.factory('dataShare',function($rootScope){
	  var service = {};
	  service.data = false;
	  service.sendData = function(data){
	      this.data = data;
	      $rootScope.$broadcast('data_shared');
	  };
	  service.getData = function(){
	    return this.data;
	  };
	  return service;
	});


myApp.controller('AppController3', [ '$scope', '$http',
		function($scope, $http) {
	
	$scope.queryPanel = function(){
		console.log(123456789);
	}
	$scope.editPanel = function(){
		console.log('abcdefghijk');
	}
	
	$scope.$on('SecondCtrlMethod', function() {
		$scope.value3 = true;
	})
			$http.get('json/level.json').success(function(data) {
				// you can do some processing here
				$scope.userLevel = data;
			});

		} ]);
