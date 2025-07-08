import {Line, LineChart, ResponsiveContainer} from 'recharts'

const data = [
	{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
	{name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
	{name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
	{name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
	{name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
	{name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
	{name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
]

export function BillingCard() {
	return (
		<div className='bg-billing-green text-billing-green-dark rounded-lg p-6 shadow-sm border border-gray-200'>
			<div className='flex items-start justify-between mb-4'>
				<h3 className='text-lg font-semibold'>Faturamento</h3>
				<div className='text-right'>
					<div className='flex items-center space-x-1 font-semibold'>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<title>Up</title>
							<path
								d='M5 17l5-5 5 5M5 7h10v10'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
							/>
						</svg>
						<span>+8.2%</span>
					</div>
					<div className='text-sm'>Último mês</div>
				</div>
			</div>
			<div className='text-4xl font-bold mb-4'>R$9,990</div>
			<div className='h-16 -mx-6 -mb-6'>
				<ResponsiveContainer height='100%' width='100%'>
					<LineChart data={data}>
						<Line
							dataKey='pv'
							dot={false}
							stroke='#004B50'
							strokeWidth={2}
							type='monotone'
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
