import { useTheme } from "../ColorTheme";
import styles from './ColorThemeToggle.module.css';


function ColorThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	
	return (
		<div className={styles.colorToggle} onClick={toggleTheme} title="Change Colour Theme">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-4 h-4">
				<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
			</svg>
			<span>Colour</span>

			{/* Comment for personal reference. */}
			{/* {theme === "dark" ? (
					<span className="material-icons" title="Switch to Light Mode">
						light_mode
					</span>
				) : (
					<span className="material-icons" title="Switch to Dark Mode">
						dark_mode
					</span>
				)} */}
		</div>
	)
}

export default ColorThemeToggle