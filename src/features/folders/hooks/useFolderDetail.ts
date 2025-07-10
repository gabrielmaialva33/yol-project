import {useQuery} from '@tanstack/react-query'

interface Folder {
	id: string
	status: string
	date: string
	time: string
}

async function getFolderDetail(folderId?: string): Promise<Folder> {
	if (!folderId) {
		throw new Error('Folder ID is required')
	}
	const response = await fetch(`/api/folders/consultation/${folderId}`)
	if (!response.ok) {
		throw new Error('Failed to fetch folder details')
	}
	return response.json()
}

export function useFolderDetail(folderId?: string) {
	const {
		data: folder,
		isLoading,
		isError
	} = useQuery<Folder>({
		queryKey: ['folderDetail', folderId],
		queryFn: () => getFolderDetail(folderId),
		enabled: !!folderId
	})

	return {folder, isLoading, isError}
}
