import styles from './EmptyPage.module.css';


function EmptyPage() {
	return (
		// Page when there are no tasks in the list
		<section className={styles.emptyPage}>
			<h3>You have no tasks in your list.</h3>
		</section>
	)
}

export default EmptyPage