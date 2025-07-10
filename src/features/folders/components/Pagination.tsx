'use client'

interface PaginationProps {
	page: number
	limit: number
	totalPages: number
	setPage: (page: number) => void
	setLimit: (limit: number) => void
}

export function Pagination({
	page,
	limit,
	totalPages,
	setPage,
	setLimit
}: PaginationProps) {
	return (
		<div className='flex items-center justify-between mt-4'>
			<div className='flex items-center space-x-2 text-sm text-gray-600'>
				<span>Linhas por página</span>
				<select
					className='border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500'
					onChange={e => {
						setLimit(Number(e.target.value))
						setPage(1) // Reset to first page on limit change
					}}
					value={limit}
				>
					<option>10</option>
					<option>20</option>
					<option>50</option>
				</select>
			</div>
			<div className='flex items-center space-x-4'>
				<span className='text-sm text-gray-600'>
					{String(page).padStart(2, '0')} de{' '}
					{String(totalPages).padStart(2, '0')}
				</span>
				<div className='flex items-center space-x-1'>
					<button
						className='p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50'
						disabled={page <= 1}
						onClick={() => setPage(page - 1)}
						type='button'
					>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<title>Previous</title>
							<path
								d='M15 19l-7-7 7-7'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
							/>
						</svg>
					</button>
					<button
						className='p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50'
						disabled={page >= totalPages}
						onClick={() => setPage(page + 1)}
						type='button'
					>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<title>Next</title>
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
	)
}
