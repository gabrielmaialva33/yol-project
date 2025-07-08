import {Suspense} from 'react'
import {Route, Routes} from 'react-router'
import {LoginPage} from '../features/auth'
import {Dashboard} from '../features/dashboard'

export function AppRouter() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route element={<LoginPage />} index={true} />
				<Route element={<Dashboard />} path='/dashboard' />
			</Routes>
		</Suspense>
	)
}
