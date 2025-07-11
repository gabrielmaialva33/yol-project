import {useQuery} from '@tanstack/react-query'

interface FavoriteClient {
	id: number
	name: string
	folderCount: number
	color: string
}

async function getFavoriteClients(): Promise<FavoriteClient[]> {
	const response = await fetch('/api/dashboard/favorite-clients')
	return response.json()
}

export function useFavoriteClients() {
	return useQuery<FavoriteClient[]>({
		queryKey: ['favorite-clients'],
		queryFn: getFavoriteClients,
		initialData: []
	})
}
