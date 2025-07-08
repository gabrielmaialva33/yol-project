import {DashboardContent} from './components/DashboardContent'
import {Header} from './components/Header'
import {Sidebar} from './components/Sidebar'

const Dashboard = () => {
	return (
		<div className='flex h-screen bg-[#F1F1F2]'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Header />
				<main className='flex-1 overflow-y-auto'>
					<DashboardContent />
				</main>
			</div>
		</div>
	)
}

export {Dashboard}
