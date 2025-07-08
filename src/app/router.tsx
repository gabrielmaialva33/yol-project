import {lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router'

const LoginPage = lazy(() =>
	import('../features/auth').then(m => ({default: m.LoginPage}))
)
const Dashboard = lazy(() =>
	import('../features/dashboard').then(m => ({default: m.Dashboard}))
)

export function AppRouter() {
	return (
		<Suspense fallback={<div data-testid='loading'>Loading...</div>}>
			<Routes>
				<Route element={<LoginPage />} index={true} />
				<Route element={<Dashboard />} path='/dashboard' />
				{/* Catch-all route that redirects to home */}
				<Route element={<Navigate replace={true} to='/' />} path='*' />
			</Routes>
		</Suspense>
	)
}
