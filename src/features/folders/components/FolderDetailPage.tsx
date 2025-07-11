import {useParams} from 'react-router'
import {useFolderDetail} from '../hooks/use-folder-detail'
import {FolderDetailForm} from './FolderDetailForm'
import {FolderDetailHeader} from './FolderDetailHeader'
import {FolderDetailSidebar} from './FolderDetailSidebar'

export function FolderDetailPage() {
	const {folderId} = useParams<{folderId: string}>()
	const {folder, isLoading, isError} = useFolderDetail(
		folderId === '1830' ? '1830' : folderId
	)

	if (isLoading) {
		return <div>Carregando...</div>
	}

	if (isError || !folder) {
		return <div>Erro ao buscar os detalhes da pasta.</div>
	}

	return (
		<div className='p-6 bg-gray-50 min-h-full'>
			<FolderDetailHeader folder={folder} />
			<div className='mt-6 flex gap-6'>
				<FolderDetailSidebar />
				<div className='flex-1'>
					<FolderDetailForm folder={folder} />
				</div>
			</div>
		</div>
	)
}
