import {useQuery} from '@tanstack/react-query'

interface FavoriteFolder {
	id: string
	name: string
	count: number
}

async function getFavoriteFolders(): Promise<FavoriteFolder[]> {
	const response = await fetch('/api/folders/favorites')
	if (!response.ok) {
		throw new Error('Failed to fetch favorite folders')
	}
	return response.json()
}

export function useFavoriteFolders() {
	const {data, isLoading, isError} = useQuery<FavoriteFolder[]>({
		queryKey: ['favoriteFolders'],
		queryFn: getFavoriteFolders
	})

	return {
		favoriteFolders: data ?? [],
		isLoading,
		isError
	}
}
