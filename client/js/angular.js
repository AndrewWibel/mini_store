var ministore = angular.module('ministore', ['ngRoute']);

/////PARTIAL ROUTES!!!!//////////

ministore.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/static/partials/dashboard.html'
	})
	.when('/products', {
		templateUrl: '/static/partials/products.html'
	})
	.when('/orders', {
		templateUrl: '/static/partials/orders.html'
	})
	.when('/customers', {
		templateUrl: '/static/partials/customers.html'
	})
	.when('/settings', {
		templateUrl: '/static/partials/settings.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

////////FACTORIES!!!////////////

//////-----customers-----///////
ministore.factory('customerFactory', function($http){
	var customers = [];
	var factory = {};

	factory.addCustomer = function(new_customer, callback){
		$http.post('/add_customer', new_customer).success(function(output){
			callback(output);
		});
	}
	factory.index = function(callback){
		$http.get('/index_customers').success(function(output){
			callback(output);
		})
	}
	return factory;
});

///////------products------////////////
ministore.factory('productFactory', function($http){
	var products = [];
	var factory = {};


	factory.quantity = function(callback){
		var quantity = [];
		for(i = 1; i< 101; i++){
			quantity.push(i);
		};
		callback(quantity);
	}

	factory.addProduct = function(new_product, callback){
		$http.post('/add_product', new_product).success(function(output){
			callback(output);
		});
	}
	factory.index = function(callback){
		$http.get('/index_products').success(function(output){
			callback(output);
		});
	}
	return factory;
});
//////---------orders----------//////////////
ministore.factory('orderFactory', function($http){
	var orders = [];
	var factory = {};

	factory.orderQuantity = function(callback){
		var quantity = [];
		for(i = 1; i< 101; i++){
			quantity.push(i);
		};
		callback(quantity);
	}

	factory.addOrder = function(new_order, callback){
		$http.post('/add_order', new_order).success(function(output){
			callback(output)
		});
	}
	factory.index = function(callback){
		$http.get('/index_orders').success(function(output){
			callback(output);
		});
	}
	return factory;
});

////////CONTROLLERS!!!//////////

//////-----customers-----///////
ministore.controller('customersController', function(customerFactory, $scope){
	$scope.customers = [];
	$scope.duplicate_message = "";

	customerFactory.index(function(data){
		$scope.customers = data;
		console.log($scope.customers)
	});

	$scope.addCustomer = function(){
		if($scope.duplicate()){
			$scope.duplicate_message = "Name already taken!"
		}else{
			$scope.new_customer.created_at = new Date();
			customerFactory.addCustomer($scope.new_customer, function(data){
				$scope.customers = data;
				$scope.new_customer = {};
			});
		}
	}
	$scope.duplicate = function(){
		for(var i = 0; i<$scope.customers.length; i++){
			if($scope.new_customer !== undefined){
				if($scope.new_customer.name == $scope.customers[i].name){
					$scope.duplicate_message = 'Name is already taken!';
					return true;
				}
			}
		}
		return false;
	}

});

/////////------products------///////////////////
ministore.controller('productsController', function(productFactory, $scope){
	$scope.products = [];
	$scope.duplicate_message = "";

	productFactory.quantity(function(data){
		$scope.quantity = data;
	});
	productFactory.index(function(data){
		$scope.products = data;
		console.log($scope.products);
	});

	$scope.duplicate = function(){
		for(var i = 0; i<$scope.products.length; i++){
			if($scope.new_product !== undefined){
				if($scope.new_product.name == $scope.products[i].name){
					$scope.duplicate_message = "Product with that name already exists!"
					return true;
				}
			}
		}
		return false;
	}
	$scope.addProduct = function(){
		if($scope.duplicate()){
			$scope.duplicate_message = "Product with that name already exists!"
		}else{
			$scope.new_product.created_at = new Date();
			productFactory.addProduct($scope.new_product, function(data){
				$scope.products = data;
				$scope.new_product = {};
			});
		}
	}
});

///////--------orders--------//////////////////
ministore.controller('ordersController', function(orderFactory, customerFactory, productFactory, $scope){
	$scope.orders = [];
	$scope.products = [];
	$scope.customers = [];
	$scope.new_order = {};
	$scope.quantity_message = "";
	$scope.quantity_error = false;

	customerFactory.index(function(data){
		$scope.customers = data;
	});
	productFactory.index(function(data){
		$scope.products = data;
	});
	orderFactory.index(function(data){
		$scope.orders = data;
	});
	orderFactory.orderQuantity(function(data){
		$scope.orderQuantity = data;
	});

	$scope.addOrder = function(){
		$scope.new_order.created_at = new Date();
		// $scope.new_order.customer = $scope.new_order.customer.name;
		$scope.new_order.product = $scope.new_order.product.name;
		$scope.quantity = $scope.new_order.product.quantity;
		$scope.new_order.product_id = $scope.new_order.product._id;

		if($scope.new_order.product.quantity <= $scope.new_order.quantity){
			$scope.quantity_error = true;
			$scope.quantity_message = "Unable to order that many!";
		}else{
			orderFactory.addOrder($scope.new_order, function(data){
				$scope.orders = data;
				$scope.new_order = {};
				$scope.quantity_error = false;
			});
		};
	};
});











