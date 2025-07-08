import {useQuery} from '@tanstack/react-query'
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts'

interface AreaDivision {
	name: string
	value: number
	color: string
}

async function getAreaDivision(): Promise<AreaDivision[]> {
	const response = await fetch('/api/area-division')
	return response.json()
}

export function AreaDivisionCard() {
	const {data: areaDivision = []} = useQuery<AreaDivision[]>({
		queryKey: ['areaDivision'],
		queryFn: getAreaDivision
	})

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
								data={areaDivision}
								dataKey='value'
								innerRadius={30}
								outerRadius={60}
							>
								{areaDivision.map(entry => (
									<Cell fill={entry.color} key={entry.name} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className='space-y-2'>
					{areaDivision.map(item => (
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
