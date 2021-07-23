app.config( function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl: 'pages/home.html',
			controller: 'inicioCtrl'
		})		
		//Para mandar varios parámetros
		//.when('/alumno/:codigo/:parametro2/:parametro3',{
		.when('/users',{
			templateUrl: 'pages/users.html',
			controller: 'usersCtrl'
		})				
		.otherwise({
			redirectTo: '/'
		});


});