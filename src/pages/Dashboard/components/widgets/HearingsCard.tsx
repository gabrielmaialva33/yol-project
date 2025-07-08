export function HearingsCard() {
	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>
					Audiências e Prazos
				</h3>
				<div className='flex items-center space-x-2 text-sm text-gray-500'>
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
			<div className='text-center py-12 text-gray-500'>
				<svg
					className='w-12 h-12 mx-auto mb-4 text-gray-300'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<title>Hearings</title>
					<path
						d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
					/>
				</svg>
				<p>Nenhuma audiência ou prazo agendado para este período</p>
			</div>
		</div>
	)
}
