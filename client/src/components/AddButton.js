import { useDispatch } from 'react-redux';
import styles from './AddButton.module.css';
import { openModal, setModalType } from '../store/inputModalSlice';


function AddButton() {
	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<div className={styles.addButton} onClick={(e) => {
				e.stopPropagation();
				dispatch(setModalType("add"));
				dispatch(openModal());
			}}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} className="w-12 h-12">
					<path strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</div>
		</div>
	)
}

export default AddButton