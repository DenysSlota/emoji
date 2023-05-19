import { useNavigation, Outlet } from 'react-router-dom'
import Header from '../Header'
import styles from './Layout.module.css'

const Layout: React.FC = () => {
	const { state } = useNavigation()
	return (
		<>
			{state === 'loading' ? <div role="loader">Loading ...</div> : null}
			<Header />
			<main className={styles.container}>
				<Outlet></Outlet>
			</main>
		</>
	)
}

export default Layout