var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
	customer:{type: String, required: true},
	quantity:{type: Number, required: true},
	product:{type: String, required: true},
	created_at:{type: Date, default: Date.now}
});

mongoose.model('Order', OrderSchema);