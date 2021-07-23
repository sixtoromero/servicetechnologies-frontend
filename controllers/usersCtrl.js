app.controller('usersCtrl', ['$scope','$http', function($scope,$http){
	
	$scope.setActive("mUsers");

	$scope.users = {};
	$scope.posicion = 5;

	$http.get('http://localhost/servicerest/public/index.php/api/users').success(function(data){
        if (data.status === 200){
            console.log(data);
            $scope.users = data.data;
        }		
	});
	
}]);