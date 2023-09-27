const { Router } = require('express');
const TodoModel = require('../models/TodoModel');
const router = Router();


// Error handler middleware
const errorHandler = (res, error) => {
	console.log(error);
	res.status(500).json({ error: 'Internal server error' });
};

// Get all todos
router.get('/todos', async (req, res) => {
	try {
		const todos = await TodoModel.find();
		res.json(todos);
	} catch (error) {
		errorHandler(res, error);
	}
});

// Create a new todo
router.post('/todo/new', async (req, res) => {
	try {
		// Find the last todo to determine the new _id
		const lastTodo = await TodoModel.findOne({}, {}, { sort: { _id: -1 } });
		const lastId = lastTodo ? lastTodo._id : 0;

		// Create a new todo with an incremented _id
		const todo = new TodoModel({
			_id: lastId + 1,
			text: req.body.text,
		});

		await todo.save();
		res.json(todo);
	} catch (error) {
		errorHandler(res, error);
	}
});

// Delete a todo by its _id
router.delete('/todo/delete/:id', async (req, res) => {
	try {
		const result = await TodoModel.findByIdAndDelete(req.params.id);
		res.json(result);
	} catch (error) {
		errorHandler(res, error);
	}
});

// Toggle the completion status of a todo
router.put('/todo/complete/:id', async (req, res) => {
	try {
		const todo = await TodoModel.findById(req.params.id);
		todo.complete = !todo.complete;
		todo.updatedAt = new Date();
		await todo.save();
		res.json(todo);
	} catch (error) {
		errorHandler(res, error);
	}
});

// Edit the text of a todo
router.put('/todo/edit/:id', async (req, res) => {
	try {
		const todo = await TodoModel.findById(req.params.id);
		todo.text = req.body.text;
		await todo.save();
		res.json(todo);
	} catch (error) {
		errorHandler(res, error);
	}
});

module.exports = router;