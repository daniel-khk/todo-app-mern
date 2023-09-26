const { Router } = require('express');
const TodoModel = require('../models/TodoModel');
const router = Router();


// Get all todos
router.get('/todos', async (req, res) => {
	const todos = await TodoModel.find();
	res.json(todos);
})

// Create a new todo
router.post('/todo/new', async (req, res) => {
	// Find the last todo to determine the new _id
	const lastTodo = await TodoModel.findOne({}, {}, { sort: { _id: -1 } });
	const lastId = lastTodo ? lastTodo._id : 0;

	// Create a new todo with an incremented _id
	const todo = new TodoModel({
		_id: lastId + 1,
		text: req.body.text,
	});

	// Save the new todo and respond with it
	todo.save();
	res.json(todo);
})

// Delete a todo by its _id
router.delete('/todo/delete/:id', async (req, res) => {
	const result = await TodoModel.findByIdAndDelete(req.params.id);
	res.json(result);
});

// Toggle the completion status of a todo
router.put('/todo/complete/:id', async (req, res) => {
	const todo = await TodoModel.findById(req.params.id);
	todo.complete = !todo.complete;
	todo.save();
	res.json(todo);
})

// Edit the text of a todo
router.put('/todo/edit/:id', async (req, res) => {
	const todo = await TodoModel.findById(req.params.id);
	todo.text = req.body.text;
	todo.save();
	res.json(todo);
})

module.exports = router;