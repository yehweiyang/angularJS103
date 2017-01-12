myApp.controller('MyFile1Controller', [ '$scope', '$rootScope', '$http',
		function($scope, rootScope, $http) {


			var json = {};

			$scope.query = function() {

				$http.get("json/client.json").success(function(response) {
					json = response;
					$scope.status = true;


//					users = users.filter(function(item) {
//		
//					    for(var key in filter) {
//					    	
//					        if(item[key] === undefined || item[key] != filter[key])
//					            return false;
//					       
//					        console.log(' filter[key]');
//					        console.log( filter[key]);
//					        console.log('item[key]');
//					        console.log(item[key]);
//					        console.log('key');
//					    	console.log(key);
//					    }
//					    return true;
//					});
			
					queryMethid(json,$scope.userNumber,$scope.userName,'','');
				});
	

			};

			$scope.reset = function() {
				$scope.status = false;
			};

			var queryMethid=function (data,number,name,level,enterDate){
				var filter = {};
				if(number==''&&name==''&&level==''&&enterDate==''){
					console.log('全部選取');
					console.log(json);
					return
				}
				if (number != '') {
					filter.CUST_ID=$scope.userNumber;
				}
				if (name != '') {
					filter.CUST_NAME=$scope.userName;
				}
				
				data = data.filter(function(item) {

				    for(var key in filter) {

				        if(item[key] === undefined || item[key] != filter[key])
				            return false;

				    }
				    return true;
				});
				console.log('data');
				console.log(data);
				
			};


		} ]);
