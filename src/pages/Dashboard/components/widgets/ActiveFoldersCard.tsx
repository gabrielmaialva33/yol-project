import {Line, LineChart, ResponsiveContainer} from 'recharts'

const data = [
	{month: 'Jan', value: 320},
	{month: 'Feb', value: 340},
	{month: 'Mar', value: 360},
	{month: 'Apr', value: 380},
	{month: 'May', value: 400},
	{month: 'Jun', value: 420}
]

export function ActiveFoldersCard() {
	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<h3 className='text-lg font-semibold text-gray-900 mb-2'>
				Pastas ativas
			</h3>
			<div className='flex items-end justify-between mb-4'>
				<div>
					<div className='text-3xl font-bold text-gray-900'>420</div>
					<div className='text-sm text-gray-500'>98 novos neste mês</div>
				</div>
				<div className='w-32 h-16'>
					<ResponsiveContainer height='100%' width='100%'>
						<LineChart data={data}>
							<Line
								dataKey='value'
								dot={false}
								stroke='#06B6D4'
								strokeWidth={2}
								type='monotone'
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
			<button
				className='text-cyan-500 text-sm font-medium hover:text-cyan-600'
				type='button'
			>
				Visualizar pastas
			</button>
		</div>
	)
}
