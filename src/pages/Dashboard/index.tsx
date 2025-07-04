import {Sidebar} from './components/Sidebar'

const Dashboard = () => {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<main className='flex-1 p-6'>
				<h1 className='text-2xl font-bold'>Dashboard</h1>
			</main>
		</div>
	)
}

export {Dashboard}
