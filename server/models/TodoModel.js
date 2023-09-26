const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: function () {
			return new Date().toISOString();
		}
	}
})

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;