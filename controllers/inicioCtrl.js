
app.controller('inicioCtrl', ['$scope', '$http', function($scope, $http){
	
	$scope.setActive("mOrders");


	$scope.orders = {};
	$scope.isEnable = false;
	$scope.posicion = 5;
	$scope.dataUser = JSON.parse(localStorage.getItem('user'));		

	
	$http.get('http://localhost/servicerest/public/index.php/api/orders/FindByUserId/' + $scope.dataUser.id).success(function(data){
		$scope.orders = data.data;
		console.log($scope.orders);
	});		

	$scope.siguiente = function(){
		if ($scope.orders.length > $scope.posicion){
			$scope.posicion += 5;
		}
	}

	$scope.anteriores = function(){
		if ($scope.posicion > 5){
			$scope.posicion -= 5;
		}
	}

	$scope.createOrder = function(){
		$scope.isEnable = true;
		$http.post('http://localhost/servicerest/public/index.php/api/orders/create', {"user_id": $scope.dataUser.id, "status": "Open", "date": ""}).success(function(data){
			if (data.status === 201){				
				$http.get('http://localhost/servicerest/public/index.php/api/orders/FindByUserId/' + $scope.dataUser.id).success(function(data){
					$scope.orders = data.data;
					$scope.isEnable = false;					
				});
			}
			else {
				$scope.actualizado = false;
				$scope.isEnable = false;
			}
		});
	}
	



}]);