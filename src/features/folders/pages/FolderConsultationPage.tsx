import {useState} from 'react'
import {FolderFilters} from '../components/FolderFilters'
import {FolderTable} from '../components/FolderTable'
import {FolderTabs} from '../components/FolderTabs'
import {Pagination} from '../components/Pagination'
import {useFolderConsultation} from '../hooks/useFolderConsultation'

export function FolderConsultationPage() {
	const {
		folders,
		pagination,
		isLoading,
		isError,
		setPage,
		setLimit,
		filters,
		setFilters,
		sort,
		setSort
	} = useFolderConsultation()
	const [selectedFolders, setSelectedFolders] = useState<string[]>([])

	if (isLoading) {
		return <div>Carregando...</div>
	}

	if (isError) {
		return <div>Ocorreu um erro ao buscar as pastas.</div>
	}

	return (
		<div className='p-6 bg-gray-50 min-h-full'>
			<div className='bg-white p-8 rounded-lg shadow-sm'>
				<FolderTabs filters={filters} setFilters={setFilters} />
				<div className='mt-6'>
					<FolderFilters filters={filters} setFilters={setFilters} />
					<div className='flex items-center justify-between mb-4'>
						<p className='text-sm text-gray-600'>
							{pagination.total} resultados encontrados
						</p>
						<div className='flex items-center space-x-2'>
							<button
								className='px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50'
								disabled={selectedFolders.length === 0}
								type='button'
							>
								Baixar
							</button>
							<button
								className='px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600'
								type='button'
							>
								Adicionar colunas
							</button>
						</div>
					</div>
					<FolderTable
						folders={folders}
						selectedFolders={selectedFolders}
						setSelectedFolders={setSelectedFolders}
						setSort={setSort}
						sort={sort}
					/>
					<Pagination {...pagination} setLimit={setLimit} setPage={setPage} />
				</div>
			</div>
		</div>
	)
}
