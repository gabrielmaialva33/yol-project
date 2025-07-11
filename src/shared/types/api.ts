/**
 * Tipos base para respostas da API seguindo o padrão do AdonisJS v6
 */

export interface PaginationMeta {
	total: number
	per_page: number
	current_page: number
	last_page: number
	first_page: number
	first_page_url: string
	last_page_url: string
	next_page_url: string | null
	previous_page_url: string | null
}

export interface ApiResponse<T> {
	data: T
}

export interface PaginatedResponse<T> {
	meta: PaginationMeta
	data: T[]
}

export interface ErrorResponse {
	errors: Array<{
		message: string
		field?: string
		rule?: string
	}>
}

export interface Timestamps {
	created_at: string
	updated_at: string
}

// Helper types
export type WithTimestamps<T> = T & Timestamps

export interface SortParams {
	sort_by?: string
	order?: 'asc' | 'desc'
}

export interface PaginationParams {
	page?: number
	per_page?: number
}

export interface FilterParams {
	search?: string

	[key: string]: unknown
}

export type QueryParams = PaginationParams & SortParams & FilterParams
