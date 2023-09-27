import { useDispatch, useSelector } from 'react-redux';
import styles from './TodoList.module.css';
import { setTodos } from '../store/todosSlice';
import { openModal, setModalType, setTodoId, openDelete } from '../store/inputModalSlice';
import { useEffect } from 'react';
import InputModal from './InputModal';
import DeleteModal from './DeleteModal';
import EmptyPage from './EmptyPage';


function TodoList() {
	const dispatch = useDispatch();
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const todos = useSelector((state) => state.todos.todos);
	const { isInputModalOpen, inputText, isDeleteOpen } = useSelector(state => state.input);

	// Function to define the sort order of todo items
	const sortOrder = (a, b) => {
		if (a.complete === false && b.complete === true) {
			return -1; // Incomplete todos come before complete todos
		} else if (a.complete === true && b.complete === false) {
			return 1; // Complete todos come after incomplete todos
		} else if (a.complete === false && b.complete === false) {
			return a._id - b._id; // Sort by _id for incomplete todos
		} else if (a.complete === true && b.complete === true) {
			return new Date(a.updatedAt) - new Date(b.updatedAt); // Sort by updatedAt for complete todos
		}
	}

	// Function to fetch todos from the server
	const getTodos = async () => {
		try {
			const res = await fetch(`${serverUrl}/todos`, { method: "GET" });

			if (!res.ok) {
				console.log("getTodos() api fetch error");
				return;
			}
			
			const data = await res.json();

			data.sort((a, b) => sortOrder(a, b));

			dispatch(setTodos(data));
		} catch (error) {
			console.log("getTodo() catch error", error);
		}
	}

	// Function to mark a todo as complete or incomplete
	const completeTodo = async (id) => {
		try {
			const res = await fetch(`${serverUrl}/todo/complete/` + id, { method: "PUT" });

			if (!res.ok) {
				console.log("completeTodo() api fetch error");
				return;
			}

			const data = await res.json();

			let updatedTodos = (todos?.map((todo) => {
				if (todo._id === data._id) {
					return {
						...todo,
						complete: data.complete,
						updatedAt: data.updatedAt
					}
				}
				return todo;
			}));

			updatedTodos.sort((a, b) => sortOrder(a, b));

			dispatch(setTodos(updatedTodos));
		} catch (error) {
			console.log("completeTodo() catch error", error);
		}
	}

	// Function to delete a todo
	const deleteTodo = async (id) => {
		try {
			const res = await fetch(`${serverUrl}/todo/delete/` + id, { method: "DELETE" });
			
			if (!res.ok) {
				console.log("deleteTodo() api fetch error");
				return;
			}

			const data = await res.json();

			const updatedTodos = todos.filter((todo) => todo._id !== data._id);

			dispatch(setTodos(updatedTodos));
		} catch (error) {
			console.log("deleteTodo() catch error", error);
		}
	}

	// Function to edit a todo
	const editTodo = async (id) => {
		try {
			const res = await fetch(`${serverUrl}/todo/edit/` + id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					text: inputText
				})
			});

			if (!res.ok) {
				console.log("editTodo() api fetch error");
				return;
			}
			
			const data = await res.json();

			const updatedTodos = (todos?.map((todo) => {
				if (todo._id === data._id) {
					return {
						...todo,
						text: data.text
					}
				}
				return todo;
			}));

			dispatch(setTodos(updatedTodos));
		} catch (error) {
			console.log("editTodo() catch error", error);
		}
	}

	// Function to add a new todo
	const addTodo = async () => {
		try {
			const res = await fetch(`${serverUrl}/todo/new`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					text: inputText
				})
			});

			if (!res.ok) {
				console.log("deleteTodo() api fetch error");
				return;
			}

			const data = await res.json();

			dispatch(setTodos([...todos, data]));
		} catch (error) {
			console.log("addTodo() catch error", error);
		}
	}

	useEffect(() => {
		getTodos();
	}, [])


	return (
		<section className={styles.todoList}>
			{todos.length === 0 && <EmptyPage />}
			{todos?.map((todo, i) => {
				return (
					<div className={`${styles.todo} ${(todo.complete) ? styles.isComplete : ""}`} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className={styles.checkbox}></div>
						<p className={styles.text}>{todo.text}</p>
						<div className={styles.actions}>
							<div className={styles.icon} onClick={(e) => {
								e.stopPropagation();
								dispatch(setTodoId(todo._id));
								dispatch(setModalType("edit"));
								dispatch(openModal());
							}}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
								</svg>
							</div>
							<div className={styles.icon} onClick={(e) => {
								e.stopPropagation();
								dispatch(setTodoId(todo._id));
								dispatch(openDelete());
							}}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
								</svg>
							</div>
						</div>
					</div>
				)
			})}
			{isInputModalOpen && <InputModal editTodo={editTodo} addTodo={addTodo} />}
			{isDeleteOpen && <DeleteModal deleteTodo={deleteTodo} />}
		</section>
	)
}

export default TodoList