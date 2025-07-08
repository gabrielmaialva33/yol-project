import {useQuery} from '@tanstack/react-query'
import {Line, LineChart, ResponsiveContainer, XAxis} from 'recharts'

interface Request {
	month: string
	value: number
}

async function getRequests(): Promise<Request[]> {
	const response = await fetch('/api/requests')
	return response.json()
}

export function RequestsCard() {
	const {data: requests = []} = useQuery<Request[]>({
		queryKey: ['requests'],
		queryFn: getRequests
	})

	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>Requisições</h3>
				<div className='flex items-center space-x-2'>
					<button
						className='p-1 text-gray-400 hover:text-gray-600'
						type='button'
					>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<title>Left</title>
							<path
								d='M15 19l-7-7 7-7'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
							/>
						</svg>
					</button>
					<button
						className='p-1 text-gray-400 hover:text-gray-600'
						type='button'
					>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<title>Right</title>
							<path
								d='M9 5l7 7-7 7'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className='text-sm text-gray-500 mb-2'>Requisições por período</div>
			<div className='mb-4'>
				<div className='text-sm font-medium text-gray-600 mb-1'>
					Novas neste mês
				</div>
				<div className='flex items-center space-x-2'>
					<span className='text-2xl font-bold text-gray-900'>6</span>
					<div className='flex-1 bg-gray-200 rounded-full h-2'>
						<div
							className='bg-teal-500 h-2 rounded-full'
							style={{width: '62%'}}
						/>
					</div>
					<span className='text-sm font-medium text-teal-600'>62%</span>
				</div>
			</div>
			<div className='h-32'>
				<ResponsiveContainer height='100%' width='100%'>
					<LineChart data={requests}>
						<XAxis
							axisLine={false}
							dataKey='month'
							tick={{fontSize: 12, fill: '#6B7280'}}
							tickLine={false}
						/>
						<Line
							dataKey='value'
							dot={{fill: '#EF4444', strokeWidth: 2, r: 4}}
							stroke='#EF4444'
							strokeWidth={2}
							type='monotone'
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
