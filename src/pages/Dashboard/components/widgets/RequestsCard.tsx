import {useQuery} from '@tanstack/react-query'
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

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
					<div className='bg-gray-100 rounded p-1'>
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
					</div>
					<div className='bg-gray-100 rounded p-1'>
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
			</div>
			<div className='text-sm text-[#A1A5B7] mb-2'>Requisições por período</div>
			<div className='mb-4'>
				<div className='text-base font-semibold text-[#1F2A37] mb-1'>
					Novas neste mês
				</div>
				<div className='flex items-center space-x-2'>
					<span className='text-4xl font-bold text-gray-900'>6</span>
					<div className='flex-1 bg-gray-200 rounded-full h-2'>
						<div
							className='h-2 rounded-full'
							style={{width: '62%', backgroundColor: '#008980'}}
						/>
					</div>
					<span className='text-sm font-medium text-[#A1A5B7]'>62%</span>
				</div>
			</div>
			<div className='h-48'>
				<ResponsiveContainer height='100%' width='100%'>
					<AreaChart data={requests}>
						<defs>
							<linearGradient id='colorUv' x1='0' x2='0' y1='0' y2='1'>
								<stop offset='5%' stopColor='#EC6553' stopOpacity={0.8} />
								<stop offset='95%' stopColor='#EC6553' stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis
							axisLine={false}
							dataKey='month'
							tick={{fontSize: 12, fill: '#6B7280'}}
							tickLine={false}
						/>
						<CartesianGrid strokeDasharray='3 3' vertical={false} />
						<YAxis
							axisLine={false}
							tick={{fontSize: 12, fill: '#6B7280'}}
							tickLine={false}
						/>
						<Tooltip />
						<Area
							dataKey='value'
							dot={{fill: '#EC6553', strokeWidth: 2, r: 4}}
							fill='url(#colorUv)'
							stroke='#EC6553'
							strokeWidth={2}
							type='monotone'
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
