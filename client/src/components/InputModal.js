import styles from './InputModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setInputText } from '../store/inputModalSlice';
import { useEffect, useState } from 'react';


function InputModal(props) {
	const dispatch = useDispatch();
	const { inputText, modalType, todoId } = useSelector(state => state.input);
	const [modalTitle, setModalTitle] = useState("");
	const [buttonText, setButtonText] = useState("");
	const [isFilled, setIsFilled] = useState(true);

	// Function to set modal title and button text based on modal type
	const textForType = () => {
		if (modalType === "edit") {
			setModalTitle("Edit Task");
			setButtonText("Edit");
		}
		else if (modalType === "add") {
			setModalTitle("Add Task");
			setButtonText("Add");
		}
	}

	useEffect(() => {
		textForType();
	}, []);

	return (
		<div className={styles.container}>
			<section className={styles.modal}>
				<div className={styles.closeButton} onClick={() => {
					dispatch(closeModal());
					dispatch(setInputText(""));
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
				<div className={styles.content}>
					<h3>{modalTitle}</h3>
					<input type="text" name="content" className={styles.todoInput}
						onChange={e => { dispatch(setInputText(e.target.value)) }}
						value={inputText} />
					<div className={`${styles.message} ${isFilled === false ? styles.show : ""}`}>* Please fill out this field.</div>
					<div className={styles.submitButton} onClick={() => {
						if (inputText.trim() !== "") {
							if (modalType === "edit") {
								props.editTodo(todoId);
								dispatch(closeModal());
								dispatch(setInputText(""));
							}
							else if (modalType === "add") {
								props.addTodo();
								dispatch(closeModal());
								dispatch(setInputText(""));
							}
						}
						else {
							setIsFilled(false)

						}
					}}>{buttonText}</div>
				</div>
			</section>
		</div>
	)
}

export default InputModal