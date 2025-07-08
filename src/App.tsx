import {ErrorBoundary, type FallbackProps} from 'react-error-boundary'
import {AppRouter} from './app/router'

function renderError({error}: FallbackProps) {
	return <div>Error: {error.message}</div>
}

export function App() {
	return (
		<ErrorBoundary fallbackRender={renderError}>
			<AppRouter />
		</ErrorBoundary>
	)
}
