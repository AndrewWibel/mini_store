var mongoose = require('mongoose');
var Customer = mongoose.model("Customer");

module.exports = (function(){
	return{
		add: function(req, res){
			var new_customer = new Customer(req.body)
			new_customer.save(function(err){
				if(err){
					console.log(err);
					console.log("failed to add customer to DB");	
				}else{
					res.redirect('/index_customers')
				}
			})
		},
		index: function(req, res){
			Customer.find({}, function(err, customers){
				if(err){
					console.log(err);
					console.log("unable to retrieve customers from DB");
				}else{
					res.json(customers);
				}
			})
		}
	}
})();