import {useQuery} from '@tanstack/react-query'
import {Line, LineChart, ResponsiveContainer} from 'recharts'

interface FolderData {
	active: number
	newThisMonth: number
	history: {
		month: string
		value: number
	}[]
}

async function getFolders(): Promise<FolderData> {
	const response = await fetch('/api/folders')
	return response.json()
}

export function ActiveFoldersCard() {
	const {data: folders} = useQuery<FolderData>({
		queryKey: ['folders'],
		queryFn: getFolders,
		initialData: {
			active: 0,
			newThisMonth: 0,
			history: []
		}
	})

	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<h3 className='text-lg font-semibold text-gray-900 mb-2'>
				Pastas ativas
			</h3>
			<div className='flex items-end justify-between mb-4'>
				<div>
					<div className='text-3xl font-bold text-gray-900'>
						{folders?.active}
					</div>
					<div className='text-sm text-gray-500'>
						{folders?.newThisMonth} novos neste mês
					</div>
				</div>
				<div className='w-32 h-16'>
					<ResponsiveContainer height='100%' width='100%'>
						<LineChart data={folders?.history}>
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
