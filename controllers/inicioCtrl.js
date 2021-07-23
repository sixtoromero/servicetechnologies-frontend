app.controller('inicioCtrl', ['$scope', '$http', function($scope, $http){
	
	$scope.setActive("mOrders");


	$scope.orders = {};
	$scope.invoice = {};
	$scope.payments = {};

	$scope.remainamount = 0;
	$scope.amountpaid = 0;
	$scope.amount = '';
	$scope.paymentSum = 0;
	$scope.isEnable = false;
	$scope.isInvoice = false;
	$scope.isPayment = false;
	$scope.posicion = 5;
	$scope.posPayment = 5;
	$scope.orderId = 0;
	$scope.invoiceId = 0;
	$scope.total = 0;
	$scope.dataUser = JSON.parse(localStorage.getItem('user'));		

	
	$http.get('http://localhost/servicerest/public/index.php/api/orders/FindByUserId/' + $scope.dataUser.id).success(function(data){
		$scope.orders = data.data;		
	});			

	$scope.getOrdersByUserId = function(user_id){				
		$http.get('http://localhost/servicerest/public/index.php/api/orders/FindByUserId/' + user_id).success(function(data){			
			$scope.orders = data.data;
		});
	}

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

	$scope.sigPayment = function(){
		if ($scope.payments.length > $scope.posicion){
			$scope.posPayment += 5;
		}
	}

	$scope.antPayment = function(){
		if ($scope.posPayment > 5){
			$scope.posPayment -= 5;
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

	$scope.getInvoicesExists = function(order_id){
		$scope.orderId = order_id;
		$scope.isPayment = false;

		$http.get('http://localhost/servicerest/public/index.php/api/invoices/FindById/' + order_id).success(function(data){			
			if (data.data == null) {
				$scope.createInvoice(order_id);
				$scope.getInvoicesExists(order_id);
			} else {				
				$scope.isInvoice = true;
				$scope.invoice = data.data;
				$scope.remainamount = (+data.data["amounttopay"]) - (+data.data["amountpaid"]);
				$scope.amountpaid = (+data.data["amounttopay"]) - (+$scope.remainamount);				
			}
		});
	}

	$scope.createInvoice = function(order_id){
		$scope.isEnable = true;

		$http.post('http://localhost/servicerest/public/index.php/api/invoices/create', {"order_id": order_id, "amounttopay": 0, "amountpaid": 0}).success(function(data){
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

	$scope.updateInvoice = function(order_id){
		$scope.isEnable = true;

		$http.put('http://localhost/servicerest/public/index.php/api/invoices/update/' + $scope.invoiceId, {"amountpaid": $scope.total }).success(function(data){
			if (data.status === 201){	
								
				console.log('OrderID', order_id);
				console.log('InvoiceId', $scope.invoiceId);

				alert('The payment was successful.');

				$scope.getInvoicesExists(order_id);
				$scope.getPayments($scope.invoiceId);				
			}
			else {
				$scope.actualizado = false;
				$scope.isEnable = false;
			}
		});
	}

	$scope.getPayments = function(invoice_id){
		
		$scope.payments = {};
		$scope.invoiceId = invoice_id;
		$scope.isPayment = true;

		$http.get('http://localhost/servicerest/public/index.php/api/payments/FindById/' + invoice_id).success(function(data){
			if (data.data != null) {
				//$scope.createInvoice(order_id);
				$scope.payments = data.data;
				console.log($scope.payments);
			}
		});
	}

	$scope.addPayment = function(){
		//http://localhost/servicerest/public/index.php/api/invoices/update/1

		var apaid = prompt("Enter the amount to pay");
		
		if (apaid != null) {
			$scope.isEnable = true;
			//$scope.total = $scope.remainamount;
			$scope.total = (+$scope.amountpaid) + (+apaid);

			if ($scope.total > +$scope.invoice["amounttopay"]) {
				alert('Value to pay is greater than the total invoice value.');
				return;
			}
			
			$http.post('http://localhost/servicerest/public/index.php/api/payments/create', {"invoice_id": $scope.invoiceId, "amount": +apaid}).success(function(data){
				if (data.status === 201){
					$scope.updateInvoice($scope.orderId);
				}
				else {
					$scope.actualizado = false;
					$scope.isEnable = false;
				}
			});
		}		

	}

	$scope.deleteOrder = function(order_id) {
		
		$scope.isInvoice = false;
		$scope.isPayment = false;

		var resp = confirm("Are you sure to delete the order?!");
		if (resp) {
			$http.get('http://localhost/servicerest/public/index.php/api/orders/delete/' + order_id).success(function(data){				
				alert(data.message);				
				if (data.status == 200) {
					$scope.getOrdersByUserId($scope.dataUser.id);
				}
			});		
		}
	}
	
}]);