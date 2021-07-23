var app = angular.module('loginApp',['ngRoute']);
app.controller('loginCtrl', ['$scope','$http', function($scope,$http){

	$scope.user = {};        

	// $http.get('http://localhost/servicerest/public/index.php/api/users').success(function(data){

    //     if (data.status === 200){
    //         console.log(data);
    //         $scope.users = data.data;
    //     } else{
    //         swal("Orders!", "No results found.!", "info");
    //     }
	// });

    $scope.getLogin = function() {        
        $http.post('http://localhost/servicerest/public/index.php/auth/login', $scope.user).success(function(data){
            //console.log(data);
            if (data['status'] === 200){                
                localStorage.setItem('user', JSON.stringify(data['data']));
                window.location = "/orders";
            } else {
                localStorage.clear();
                swal("Orders!", data.message, "info");
            }
        });
    }

}]);