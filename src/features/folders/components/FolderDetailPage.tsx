import {useState} from 'react'
import {useParams} from 'react-router'
import {useFolderDetail} from '../hooks/use-folder-detail'
import {FolderDetailForm} from './FolderDetailForm'
import {FolderDetailHeader} from './FolderDetailHeader'
import {FolderDetailSidebar} from './FolderDetailSidebar'
import {ProcessTimeline} from './ProcessTimeline'

export function FolderDetailPage() {
	const {folderId} = useParams<{folderId: string}>()
	const [activeTab, setActiveTab] = useState('processo')
	const {folder, isLoading, isError} = useFolderDetail(
		folderId === '1830' ? '1830' : folderId
	)

	if (isLoading) {
		return <div>Carregando...</div>
	}

	if (isError || !folder) {
		return <div>Erro ao buscar os detalhes da pasta.</div>
	}

	const renderContent = () => {
		switch (activeTab) {
			case 'andamento':
				return <ProcessTimeline folderId={folder.id} />
			case 'informacoes':
				return (
					<div className='bg-white rounded-lg p-6 shadow-sm'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							Informações Gerais
						</h3>
						<p className='text-gray-600'>Conteúdo das informações gerais...</p>
					</div>
				)
			case 'publicacoes':
				return (
					<div className='bg-white rounded-lg p-6 shadow-sm'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							Publicações
						</h3>
						<p className='text-gray-600'>Lista de publicações...</p>
					</div>
				)
			case 'agenda':
				return (
					<div className='bg-white rounded-lg p-6 shadow-sm'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>Agenda</h3>
						<p className='text-gray-600'>Eventos agendados...</p>
					</div>
				)
			default:
				return <FolderDetailForm folder={folder} />
		}
	}

	return (
		<div className='p-6 bg-gray-50 min-h-full'>
			<FolderDetailHeader folder={folder} />
			<div className='mt-6 flex gap-6'>
				<FolderDetailSidebar activeTab={activeTab} onTabChange={setActiveTab} />
				<div className='flex-1'>{renderContent()}</div>
			</div>
		</div>
	)
}
