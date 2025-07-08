import {faker} from '@faker-js/faker'

const birthdays = Array.from({length: 2}, () => ({
	avatar: faker.image.avatar(),
	name: faker.person.fullName(),
	email: faker.internet.email()
}))

export function BirthdaysCard() {
	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>Aniversariantes</h3>
				<button
					className='text-sm font-medium text-cyan-500 hover:text-cyan-600'
					type='button'
				>
					Ver todos
				</button>
			</div>
			<p className='text-sm text-gray-500 mb-4'>
				Colegas que fazem aniversário este mês
			</p>
			<div className='space-y-4'>
				{birthdays.map(user => (
					<div className='flex items-center space-x-3' key={user.email}>
						<img
							alt={user.name}
							className='w-10 h-10 rounded-full'
							src={user.avatar}
						/>
						<div className='flex-1'>
							<div className='font-medium text-gray-900'>{user.name}</div>
							<div className='text-sm text-gray-500'>{user.email}</div>
						</div>
						<button
							className='p-1 text-gray-400 hover:text-gray-600'
							type='button'
						>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<title>Go</title>
								<path
									d='M9 5l7 7-7 7'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
								/>
							</svg>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
