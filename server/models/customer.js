var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
	name: {type: String, required: true},
	created_at: {type: Date, default: Date.now}
});

mongoose.model('Customer', CustomerSchema);