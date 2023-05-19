import { useRouteError } from 'react-router-dom'
import styles from './ErrorPage.module.css'



const ErrorPage: React.FC = () => {
	const error: any = useRouteError()
	console.error(error)

	return (
		<div className={styles.container}>
			<h1 className={styles.text}>Oops!</h1>
			<p className={styles.text__info}>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	)
}
export default ErrorPage