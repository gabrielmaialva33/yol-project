import {Suspense} from 'react'
import {ErrorBoundary, type FallbackProps} from 'react-error-boundary'
import {Route, Routes} from 'react-router'
import {LoginPage} from './pages/Login'

function renderError({error}: FallbackProps) {
	return <div>Error: {error.message}</div>
}

export function App() {
	return (
		<ErrorBoundary fallbackRender={renderError}>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route element={<LoginPage />} index={true} />
				</Routes>
			</Suspense>
		</ErrorBoundary>
	)
}
