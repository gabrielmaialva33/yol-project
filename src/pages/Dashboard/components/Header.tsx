import {useNavigate} from 'react-router'
import bellIcon from '/icons/bell.svg'
import calendarIcon from '/icons/calendar.svg'
import exitIcon from '/icons/exit-right.svg'
import messagesIcon from '/icons/messages.svg'
import userIcon from '/icons/user.png'

export function Header() {
	const navigate = useNavigate()

	const handleLogout = () => {
		navigate('/')
	}

	return (
		<header className='bg-white border-b border-gray-200 px-6 py-4'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-semibold text-gray-900'>Visão Geral</h1>
					<p className='text-gray-500 mt-1'>
						Suas tarefas principais estão nessa sessão.
					</p>
				</div>
				<div className='flex items-center space-x-4'>
					<button
						className='p-2 text-gray-400 hover:text-gray-600'
						type='button'
					>
						<img
							alt='Notifications'
							className='w-5 h-5'
							src={bellIcon || '/placeholder.svg'}
						/>
					</button>
					<button
						className='p-2 text-gray-400 hover:text-gray-600'
						type='button'
					>
						<img
							alt='Calendar'
							className='w-5 h-5'
							src={calendarIcon || '/placeholder.svg'}
						/>
					</button>
					<button
						className='p-2 text-gray-400 hover:text-gray-600'
						type='button'
					>
						<img
							alt='messages'
							className='w-5 h-5'
							src={messagesIcon || '/placeholder.svg'}
						/>
					</button>
					<button
						className='p-2 text-gray-400 hover:text-gray-600'
						type='button'
					>
						<img
							alt='Settings'
							className='w-5 h-5'
							src={userIcon || '/placeholder.svg'}
						/>
					</button>
					<div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full' />
					<button
						className='p-2 text-gray-400 hover:text-gray-600'
						onClick={handleLogout}
						type='button'
					>
						<img
							alt='exit'
							className='w-5 h-5'
							src={exitIcon || '/placeholder.svg'}
						/>
					</button>
				</div>
			</div>
		</header>
	)
}
