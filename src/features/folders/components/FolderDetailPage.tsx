'use client'

import {useParams} from 'react-router'
import {FolderDetailForm} from '../components/FolderDetailForm'
import {FolderDetailHeader} from '../components/FolderDetailHeader'
import {FolderDetailSidebar} from '../components/FolderDetailSidebar'
import {useFolderDetail} from '../hooks/useFolderDetail'

export function FolderDetailPage() {
	const {folderId} = useParams<{folderId: string}>()
	const {folder, isLoading, isError} = useFolderDetail(folderId)

	if (isLoading) {
		return <div>Carregando...</div>
	}

	if (isError || !folder) {
		return <div>Ocorreu um erro ao buscar os detalhes da pasta.</div>
	}

	return (
		<div className='p-6 bg-gray-50 min-h-full'>
			<FolderDetailHeader folder={folder} />
			<div className='mt-6 flex gap-6'>
				<FolderDetailSidebar />
				<div className='flex-1'>
					<FolderDetailForm />
				</div>
			</div>
		</div>
	)
}
