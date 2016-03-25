var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
	name:{type: String, required: true},
	img:{type: String, required: true},
	description: {type: String, required: true},
	quantity: {type: Number, required: true}
});

mongoose.model('Product', ProductSchema);