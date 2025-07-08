import {Cell, Pie, PieChart, ResponsiveContainer} from 'recharts'

const data = [
	{name: 'Penal', value: 35, color: '#EF4444'},
	{name: 'Trabalhista', value: 40, color: '#10B981'},
	{name: 'Cível', value: 15, color: '#06B6D4'},
	{name: 'Cível Contencioso', value: 10, color: '#F59E0B'}
]

export function AreaDivisionCard() {
	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<h3 className='text-lg font-semibold text-gray-900 mb-4'>
				Divisão por áreas
			</h3>
			<div className='flex items-center justify-between'>
				<div className='w-32 h-32'>
					<ResponsiveContainer height='100%' width='100%'>
						<PieChart>
							<Pie
								cx='50%'
								cy='50%'
								data={data}
								dataKey='value'
								innerRadius={30}
								outerRadius={60}
							>
								{data.map(entry => (
									<Cell fill={entry.color} key={entry.name} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className='space-y-2'>
					{data.map(item => (
						<div className='flex items-center space-x-2' key={item.name}>
							<div
								className='w-3 h-3 rounded-full'
								style={{backgroundColor: item.color}}
							/>
							<span className='text-sm text-gray-600'>{item.name}</span>
							<span className='text-sm font-medium text-gray-900'>
								{item.value}%
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
