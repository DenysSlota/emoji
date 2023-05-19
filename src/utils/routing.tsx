import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import ErrorPage from '../pages/ErrorPage'
import EmojiPage from '../pages/EmojiPage'
import AboutPage from '../pages/AboutPage'
import SearchPage from '../pages/SearchPage'


export const routing = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <EmojiPage />
			},
			{
				path: '/about',
				element: <AboutPage />
			},
            {
				path: '/search',
				element: <SearchPage />
			}
		]
	}
])