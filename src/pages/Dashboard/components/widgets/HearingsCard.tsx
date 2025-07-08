import {useQuery} from '@tanstack/react-query'

interface Hearing {
	label: string
	percentage: number
	total: number
	completed: number
	color: string
}

async function getHearings(): Promise<Hearing[]> {
	const response = await fetch('/api/hearings')
	return response.json()
}

export function HearingsCard() {
	const {data: hearings = []} = useQuery<Hearing[]>({
		queryKey: ['hearings'],
		queryFn: getHearings
	})

	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>
					Audiências e Prazos
				</h3>
				<div className='flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 rounded-md p-2'>
					<span>9 Jan 2023 - 7 Fev 2023</span>
					<button className='p-1' type='button'>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<title>Calendar</title>
							<path
								d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className='space-y-6'>
				{hearings.map(item => (
					<div key={item.label}>
						<div className='flex items-start'>
							<div className='w-1/4'>
								<div className='text-2xl font-bold text-gray-900'>
									{item.percentage}%
								</div>
								<div className='text-sm text-gray-500'>{item.label}</div>
							</div>
							<div className='w-3/4 pl-4'>
								<div className='flex justify-between text-sm text-gray-500 mb-1'>
									<span>Total: {item.total}</span>
									<span>Compridos: {item.completed}</span>
								</div>
								<div className='w-full bg-gray-200 rounded-full h-2.5'>
									<div
										className='h-2.5 rounded-full'
										style={{
											width: `${item.percentage}%`,
											backgroundColor: item.color
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
