import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import inputModalReducer from './inputModalSlice';


export const store = configureStore({
	reducer: {
		todos: todosReducer,
		input: inputModalReducer
	}
});
