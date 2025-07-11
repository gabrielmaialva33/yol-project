import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {createApiHooks} from '../../../shared/hooks/use-api'
import type {
	ApiResponse,
	PaginatedResponse,
	QueryParams
} from '../../../shared/types/api'
import type {Folder} from '../../../shared/types/domain'

// Create base hooks
const folderApi = createApiHooks<Folder>({
	baseUrl: '/api/folders',
	// token would be obtained from authentication context in production
	token: 'mock-jwt-token'
})

// Export base hooks
export const {
	useList: useFoldersList,
	useGet: useFolder,
	useCreate: useCreateFolder,
	useUpdate: useUpdateFolder,
	useDelete: useDeleteFolder
} = folderApi

// Custom hook to toggle favorite
export function useToggleFolderFavorite() {
	const queryClient = useQueryClient()

	return useMutation<ApiResponse<Folder>, Error, number>({
		mutationFn: async id => {
			const response = await fetch(`/api/folders/${id}/favorite`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer mock-jwt-token'
				}
			})

			if (!response.ok) {
				throw new Error('Erro ao alterar favorito')
			}

			return response.json()
		},
		onSuccess: data => {
			// Update list cache
			queryClient.setQueryData<PaginatedResponse<Folder>>(
				['folders', 'list'],
				old => {
					if (!old) {
						return old
					}
					return {
						...old,
						data: old.data.map(folder =>
							folder.id === data.data.id ? data.data : folder
						)
					}
				}
			)

			// Atualizar cache individual
			queryClient.setQueryData<ApiResponse<Folder>>(
				['folders', 'get', data.data.id],
				data
			)
		}
	})
}

interface FolderStats {
	active: number
	newThisMonth: number
	history: {
		month: string
		value: number
	}[]
}

// Hook for statistics
export function useFolderStats() {
	return useQuery({
		queryKey: ['folders', 'stats'],
		queryFn: async () => {
			const response = await fetch('/api/folders/stats', {
				headers: {
					Authorization: 'Bearer mock-jwt-token'
				}
			})

			if (!response.ok) {
				throw new Error('Erro ao buscar estatísticas')
			}

			return response.json() as Promise<ApiResponse<FolderStats>>
		}
	})
}

// Consultation hook with advanced filters
export function useFolderConsultation(filters?: QueryParams) {
	const queryParams: QueryParams = {
		per_page: 10,
		page: 1,
		sort_by: 'created_at',
		order: 'desc',
		...filters
	}

	return useFoldersList(queryParams)
}
