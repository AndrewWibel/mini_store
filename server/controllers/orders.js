var mongoose = require('mongoose');
var Order = mongoose.model("Order");

module.exports = (function(){
	return{
		add: function(req, res){
			var new_order = new Order(req.body)
			new_order.save(function(err){
				if(err){
					console.log(err);
					console.log("failed to add order to DB!");
				}else{
					res.redirect('/index_orders')
				}
			})
		},
		index: function(req, res){
			Order.find({}, function(err, orders){
				if(err){
					console.log(err);
					console.log("unable to retrieve orders from DB!")
				}else{
					res.json(orders);
				}
			})
		}
	}
})();