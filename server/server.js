const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create an Express application
const app = express();

// Define the port for the server to listen on
const PORT = process.env.PORT;

// Import the routes for the todos
const todoRoute = require('./routes/TodoRoute');

// Use JSON middleware to parse incoming JSON data
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Connect to the MongoDB database
mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to DB"))
	.catch((err) => console.log(err));

// Use the todoRoute for handling todo related routes
app.use(todoRoute);

// Start the server and listen on the specified port
app.listen(PORT, function() {
	console.log(`Listening on port ${PORT}`);
});