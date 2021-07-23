var app = angular.module('ordersApp',['ngRoute']);

app.controller('mainCtrl', ['$scope','$http', function($scope,$http){
  
	$scope.menuSuperior = 'pages/menu.html';

	if (localStorage.getItem("user") == null){
		window.location = 'auth/login.html';
	}


	$scope.setActive = function(Opcion){

		$scope.mInicio     = "";
		$scope.mOrders = "";
		$scope.mUsers    = "";

		$scope[Opcion] = "active";

	}

}]);


//Filtro personalizado de telefono
app.filter('telefono', function(){
	return function(numero){
		return numero.substring(0, 4) + "-" + numero.substring(4);
	}
});