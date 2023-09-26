import styles from './DeleteModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeDelete } from '../store/inputModalSlice';


function DeleteModal(props) {
	const dispatch = useDispatch();
	const { todoId } = useSelector(state => state.input);

	return (
		<div className={styles.container}>
			<section className={styles.modal}>
				<h3>Do you want to delete this task?</h3>
				<div className={styles.buttons}>
					<div className={`${styles.submitButton} ${styles.cancel}`} onClick={() => {
						dispatch(closeDelete());
					}}>Cancel</div>
					<div className={styles.submitButton} onClick={() => {
						props.deleteTodo(todoId);
						dispatch(closeDelete());
					}}>Delete</div>
				</div>
			</section>
		</div>
	)
}

export default DeleteModal