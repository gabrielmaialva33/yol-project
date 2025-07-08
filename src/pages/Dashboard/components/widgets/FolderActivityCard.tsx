export function FolderActivityCard() {
	const activities = [
		{
			label: 'EM ANDAMENTO',
			value: 420,
			color: 'bg-yellow-400',
			percentage: 100
		},
		{label: 'ATRASADAS', value: 89, color: 'bg-red-500', percentage: 21},
		{label: 'SOLUCIONADAS', value: 212, color: 'bg-green-500', percentage: 50}
	]

	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<h3 className='text-lg font-semibold text-gray-900 mb-4'>
				Atividade de Pastas
			</h3>
			<div className='space-y-4'>
				{activities.map(activity => (
					<div key={activity.label}>
						<div className='flex justify-between items-center mb-2'>
							<span className='text-sm font-medium text-gray-600'>
								{activity.label}
							</span>
							<span className='text-lg font-bold text-gray-900'>
								{activity.value}
							</span>
						</div>
						<div className='w-full bg-gray-200 rounded-full h-2'>
							<div
								className={`h-2 rounded-full ${activity.color}`}
								style={{width: `${activity.percentage}%`}}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
