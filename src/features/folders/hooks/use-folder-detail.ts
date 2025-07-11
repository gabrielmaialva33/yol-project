import {useQuery} from '@tanstack/react-query'
import type {ApiResponse} from '../../../shared/types/api'
import type {FolderDetail} from '../types/folder.types'

async function getFolderDetail(folderId?: string): Promise<FolderDetail> {
	if (!folderId) {
		throw new Error('Folder ID is required')
	}
	const response = await fetch(`/api/folders/consultation/${folderId}`)
	if (!response.ok) {
		throw new Error('Failed to fetch folder details')
	}
	const data: ApiResponse<FolderDetail> = await response.json()
	return data.data
}

export function useFolderDetail(folderId?: string) {
	const {
		data: folder,
		isLoading,
		isError
	} = useQuery({
		queryKey: ['folderDetail', folderId],
		queryFn: () => getFolderDetail(folderId),
		enabled: Boolean(folderId)
	})

	return {folder, isLoading, isError}
}
