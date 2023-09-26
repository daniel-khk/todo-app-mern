import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddButton from './components/AddButton';
import ColorThemeToggle from './components/ColorThemeToggle';


function App() {
	return (
		<div className="App">
			<div id="top-border"></div>
			<h1 className="main-title">TodosTodo</h1>
			<div className="wrapper">
				<h2 className="page-title">Your Tasks</h2>
				<ColorThemeToggle />
			</div>
			<BrowserRouter>
				<TodoList />
				<AddButton />
			</BrowserRouter>
		</div>
	);
}

export default App;
