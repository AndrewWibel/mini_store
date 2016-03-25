var mongoose = require('mongoose');
var Product = mongoose.model("Product");

module.exports = (function(){
	return{
		add: function(req, res){
			var new_product = new Product(req.body)
			new_product.save(function(err){
				if(err){
					console.log(err);
					console.log("falled to add product to DB");
				}else{
					res.redirect('/index_products')
				}
			})
		},
		index: function(req, res){
			Product.find({}, function(err, products){
				if(err){
					console.log(err);
					console.log("unable to retrieve products from DB")
				}else{
					res.json(products);
				}
			})
		}
	}
})();