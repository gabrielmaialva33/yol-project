import arrowRightIcon from '/icons/arrow-right.svg'
import downIcon from '/icons/down.svg'
import moreIcon from '/icons/more-horizontal.svg'

interface Folder {
	id: string
	clientNumber: string
	responsible: {
		name: string
		email: string
		avatar: string
	}
	inclusionDate: string
	inclusionTime: string
	docs: number
	area: string
	status: 'Completed' | 'Pending' | 'Refunded' | 'Cancelled'
}

interface FolderTableProps {
	folders: Folder[]
	sort: {
		column: string
		direction: string
	}
	setSort: (sort: {column: string; direction: string}) => void
	selectedFolders: string[]
	setSelectedFolders: (selectedFolders: string[]) => void
}

const StatusBadge = (props: {status: Folder['status']}) => {
	const {status} = props
	const baseClasses =
		'px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block'
	const statusClasses = {
		Completed: 'bg-green-100 text-green-800',
		Pending: 'bg-yellow-100 text-yellow-800',
		Refunded: 'bg-gray-100 text-gray-800',
		Cancelled: 'bg-red-100 text-red-800'
	}
	return (
		<span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
	)
}

export function FolderTable({
	folders,
	sort,
	setSort,
	selectedFolders,
	setSelectedFolders
}: FolderTableProps) {
	const handleSort = (column: string) => {
		const direction =
			sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc'
		setSort({column, direction})
	}

	const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSelectedFolders(folders.map(folder => folder.id))
		} else {
			setSelectedFolders([])
		}
	}

	const handleSelectOne = (id: string) => {
		const selectedIndex = selectedFolders.indexOf(id)
		let newSelected: string[] = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedFolders, id)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedFolders.slice(1))
		} else if (selectedIndex === selectedFolders.length - 1) {
			newSelected = newSelected.concat(selectedFolders.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedFolders.slice(0, selectedIndex),
				selectedFolders.slice(selectedIndex + 1)
			)
		}

		setSelectedFolders(newSelected)
	}

	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-6 py-3' scope='col'>
							<input
								checked={selectedFolders.length === folders.length}
								className='h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500'
								onChange={handleSelectAll}
								type='checkbox'
							/>
						</th>
						<th
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
							onClick={() => handleSort('clientNumber')}
							scope='col'
						>
							<div className='flex items-center'>
								Nº Cliente
								<img
									alt='Sort'
									className='w-4 h-4 ml-1 opacity-50'
									src={downIcon || '/placeholder.svg'}
								/>
							</div>
						</th>
						<th
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							scope='col'
						>
							Responsável
						</th>
						<th
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
							onClick={() => handleSort('inclusionDate')}
							scope='col'
						>
							Data de inclusão
						</th>
						<th
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							scope='col'
						>
							Docs
						</th>
						<th
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							scope='col'
						>
							Área
						</th>
						<th
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							scope='col'
						>
							Status
						</th>
						<th className='relative px-6 py-3' scope='col'>
							<span className='sr-only'>Actions</span>
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{folders.map(folder => {
						const isSelected = selectedFolders.indexOf(folder.id) !== -1
						return (
							<tr className={isSelected ? 'bg-cyan-50' : ''} key={folder.id}>
								<td className='px-6 py-4 whitespace-nowrap'>
									<input
										checked={isSelected}
										className='h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500'
										onChange={() => handleSelectOne(folder.id)}
										type='checkbox'
									/>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
									#{folder.clientNumber}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<img
												alt={folder.responsible.name}
												className='h-10 w-10 rounded-full'
												src={folder.responsible.avatar || '/placeholder.svg'}
											/>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-900'>
												{folder.responsible.name}
											</div>
											<div className='text-sm text-gray-500'>
												{folder.responsible.email}
											</div>
										</div>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-900'>
										{folder.inclusionDate}
									</div>
									<div className='text-sm text-gray-500'>
										{folder.inclusionTime}
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									{folder.docs}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									{folder.area}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<StatusBadge status={folder.status} />
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
									<div className='flex items-center justify-end space-x-2'>
										<button
											className='p-2 rounded-full bg-gray-100 hover:bg-gray-200'
											type='button'
										>
											<img
												alt='Go'
												className='w-4 h-4'
												src={arrowRightIcon || '/placeholder.svg'}
											/>
										</button>
										<button
											className='text-gray-400 hover:text-gray-600'
											type='button'
										>
											<img
												alt='More'
												className='w-5 h-5'
												src={moreIcon || '/placeholder.svg'}
											/>
										</button>
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
