var customers = require('./../server/controllers/customers.js');
var products = require('./../server/controllers/products.js');
var orders = require('./../server/controllers/orders.js');

module.exports = function(app){
	app.post('/add_customer', function(req, res){
		customers.add(req, res);
	});
	app.get('/index_customers', function(req, res){
		customers.index(req, res);
	});
	app.post('/add_product', function(req, res){
		products.add(req, res);
	});
	app.get('/index_products', function(req, res){
		products.index(req, res);
	});
	app.post('/add_order', function(req, res){
		orders.add(req, res);
	});
	app.get('/index_orders', function(req, res){
		orders.index(req, res);
	});
};