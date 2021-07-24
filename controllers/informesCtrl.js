app.controller('informesCtrl', ['$scope', '$http', function($scope, $http){
    $scope.setActive("mUsers");

    $scope.listClients = {};
    $scope.listOrders = {};
    $scope.orders = {};
    $scope.payments = {};
    $scope.userId = 0;
    $scope.orderId = 0;
    $scope.order_Id = '';
    $scope.isPayment = false;


    $scope.allClient = function(){
        
        $http.get('http://localhost/servicerest/public/index.php/api/users').success(function(data){
		    if (data.status == 200)  {
                $scope.listClients = data.data;                
            }else {
                alert('Ha ocurrido un error');
            }
	    });
    }

    $scope.ordresByUserId = function(IdUser){                
        $http.get('http://localhost/servicerest/public/index.php/api/orders/FindByUserId/' + IdUser).success(function(data){
		    if (data.status == 200)  {                
                $scope.listOrders = data.data;
                console.log($scope.listOrders);
            }else {
                $scope.listOrders = {};
            }
	    });
    }

    $scope.generateReportbyUser = function() {

        if ($scope.orderId == 0){
            $http.get('http://localhost/servicerest/public/index.php/api/orders/FindByUserIdAndOrders/' + $scope.userId).success(function(data){
                if (data.status == 200)  {                
                    $scope.orders = data.data;
                }else {
                    $scope.listOrders = {};
                }
	        });
        } else {
            $http.get('http://localhost/servicerest/public/index.php/api/orders/FindByOrderId/' + $scope.orderId).success(function(data){
                if (data.status == 200)  {                
                    $scope.orders = data.data;
                }else {
                    $scope.listOrders = {};
                }
	        });
        }
    }

    $scope.viewPayments = function(invoice_id, order_id) {
        $scope.order_Id = order_id;
        $http.get('http://localhost/servicerest/public/index.php/api/payments/FindById/' + invoice_id).success(function(data){
        debugger;    
        if (data.status == 200)  {                   
                //$scope.orders = data.data;
                $scope.payments = data.data;
                $scope.isPayment = true;
            }else {
                $scope.isPayment = false;
                $scope.payments = {};
                alert('The Order has no assigned payments');
            }
        });
    }

}]);