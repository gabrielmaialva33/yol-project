'use client'

import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'

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

interface PaginatedFoldersResponse {
	data: Folder[]
	total: number
	page: number
	limit: number
	totalPages: number
}

async function getFolders(
	page: number,
	limit: number,
	filters: {
		clientNumber: string
		dateRange: string
		area: string
		status: string
	},
	sort: {column: string; direction: string}
): Promise<PaginatedFoldersResponse> {
	const params = new URLSearchParams({
		page: String(page),
		limit: String(limit),
		...filters,
		sort: sort.column,
		direction: sort.direction
	})
	const response = await fetch(`/api/folders/consultation?${params.toString()}`)
	if (!response.ok) {
		throw new Error('Failed to fetch folders')
	}
	return response.json()
}

export function useFolderConsultation() {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [filters, setFilters] = useState({
		clientNumber: '',
		dateRange: '',
		area: '',
		status: 'Total'
	})
	const [sort, setSort] = useState({
		column: 'clientNumber',
		direction: 'asc'
	})

	const {data, isLoading, isError} = useQuery<PaginatedFoldersResponse>({
		queryKey: ['folderConsultation', page, limit, filters, sort],
		queryFn: () => getFolders(page, limit, filters, sort),
		placeholderData: previousData => previousData
	})

	return {
		folders: data?.data ?? [],
		pagination: {
			page: data?.page ?? 1,
			limit: data?.limit ?? 10,
			total: data?.total ?? 0,
			totalPages: data?.totalPages ?? 1
		},
		filters,
		setFilters,
		sort,
		setSort,
		isLoading,
		isError,
		setPage,
		setLimit
	}
}
