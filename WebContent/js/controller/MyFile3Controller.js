myApp.controller('MyFile3Controller', [ '$scope', '$http', 'MyService',
		'Scopes', 'dataShare',
		function($scope, $http, MyService, Scopes, dataShare) {

			$scope.text = '';
			$scope.$on('data_shared', function() {
				console.log('get.........');
				var text = dataShare.getData();
				$scope.text = text;
				console.log(text);
			});

		} ]);
