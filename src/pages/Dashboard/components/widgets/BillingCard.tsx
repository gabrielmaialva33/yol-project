export function BillingCard() {
	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>Faturamento</h3>
				<div className='flex items-center space-x-1 text-green-600'>
					<svg
						className='w-4 h-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<title>Up</title>
						<path
							d='M7 17l9.2-9.2M17 17V7H7'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
						/>
					</svg>
					<span className='text-sm font-medium'>+8.2%</span>
				</div>
			</div>
			<div className='text-sm text-gray-500 mb-2'>Último mês</div>
			<div className='text-3xl font-bold text-gray-900 mb-4'>R$ 9,990</div>
			<div className='text-sm text-gray-500'>Comparado ao mês anterior</div>
		</div>
	)
}
