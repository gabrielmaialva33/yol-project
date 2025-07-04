import './global.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import {App} from './App'
import {worker} from './mocks/browser'

const queryClient = new QueryClient()

worker.start()

const container = document.querySelector('#root')
if (container) {
	const root = createRoot(container)
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<BrowserRouter basename='/yol-project/'>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</StrictMode>
	)
}
