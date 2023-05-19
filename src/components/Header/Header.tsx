import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import styles from './Header.module.css'

const Header = () => {
	return (
		<header >
			<div className={styles.container}>				
				<img className={styles.logo} src={Logo} alt="logo" />				
				<div className={styles.nav__container}>
					<NavLink className={styles.navlink} to="/">Emojis</NavLink>
					<NavLink className={styles.navlink} to="/search">Search</NavLink>
					<NavLink className={styles.navlink} to="/about">About</NavLink>					
				</div>
			</div>
		</header>
	)
}

export default Header