import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	todos: [],
	isLoading: true
}

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setTodos(state, action) {
			state.todos = action.payload;
		},
	}
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;