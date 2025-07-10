import {DateTime} from 'luxon'
import {HttpResponse, http} from 'msw'
import {birthdays} from './data/birthdays'
import {folderConsultationData} from './data/folder-consultation'
import {folderDetailData} from './data/folder-detail'
import {areaDivision, folderActivity, folders} from './data/folders'
import {hearings} from './data/hearings'
import {requests} from './data/requests'
import {tasks} from './data/tasks'

const fruits = [
	{id: 1, name: 'Apple', vitamins: ['Vitamin A', 'Vitamin B', 'Vitamin K']},
	{id: 2, name: 'Banana', vitamins: ['Vitamin B6', 'Vitamin C']},
	{id: 3, name: 'Orange', vitamins: ['Vitamin C']},
	{id: 4, name: 'Strawberry', vitamins: ['Vitamin C', 'Folate']},
	{id: 5, name: 'Blueberry', vitamins: ['Vitamin K', 'Vitamin C']},
	{id: 6, name: 'Mango', vitamins: ['Vitamin A', 'Vitamin C']}
]

const applyFilters = (
	data: typeof folderConsultationData,
	params: URLSearchParams
) => {
	let filteredData = data
	const clientNumber = params.get('clientNumber')
	const dateRange = params.get('dateRange')
	const area = params.get('area')
	const status = params.get('status')

	if (clientNumber) {
		filteredData = filteredData.filter(item => item.id.includes(clientNumber))
	}

	if (area) {
		filteredData = filteredData.filter(item => item.area === area)
	}

	if (status && status !== 'Total') {
		filteredData = filteredData.filter(item => item.status === status)
	}

	if (dateRange) {
		const [startDateStr, endDateStr] = dateRange.split('to')
		if (startDateStr && endDateStr) {
			const startDate = DateTime.fromISO(startDateStr.trim())
			const endDate = DateTime.fromISO(endDateStr.trim())

			if (startDate.isValid && endDate.isValid) {
				filteredData = filteredData.filter(item => {
					const itemDate = DateTime.fromISO(item.inclusionDate)
					return itemDate >= startDate && itemDate <= endDate
				})
			}
		}
	}

	return filteredData
}

const applySorting = (
	data: typeof folderConsultationData,
	params: URLSearchParams
) => {
	const sort = params.get('sort')
	const direction = params.get('direction')

	if (sort && direction) {
		data.sort((a, b) => {
			const aValue = a[sort as keyof typeof a]
			const bValue = b[sort as keyof typeof b]

			if (aValue < bValue) {
				return direction === 'asc' ? -1 : 1
			}
			if (aValue > bValue) {
				return direction === 'asc' ? 1 : -1
			}
			return 0
		})
	}

	return data
}

const filterAndSortFolders = (
	url: URL
): {
	paginatedData: typeof folderConsultationData
	total: number
	page: number
	limit: number
	totalPages: number
} => {
	const page = Number(url.searchParams.get('page') || '1')
	const limit = Number(url.searchParams.get('limit') || '10')

	let filteredData = applyFilters(folderConsultationData, url.searchParams)
	filteredData = applySorting(filteredData, url.searchParams)

	const start = (page - 1) * limit
	const end = start + limit

	const paginatedData = filteredData.slice(start, end)

	return {
		paginatedData,
		total: filteredData.length,
		page,
		limit,
		totalPages: Math.ceil(filteredData.length / limit)
	}
}

export const handlers = [
	http.get('/fruits', () => {
		return HttpResponse.json(fruits)
	}),

	http.post('/api/login', async ({request}) => {
		const body = (await request.json()) as {email: string; password: string}

		// Valid credentials
		if (
			body.email === 'test@benicio.com.br' &&
			body.password === 'benicio123'
		) {
			return HttpResponse.json({
				email: 'test@benicio.com.br',
				password: 'benicio123'
			})
		}

		// Invalid credentials - return error response
		return HttpResponse.json({error: 'Invalid credentials'}, {status: 401})
	}),

	http.get('/api/tasks', () => {
		return HttpResponse.json(tasks)
	}),

	http.get('/api/requests', () => {
		return HttpResponse.json(requests)
	}),

	http.get('/api/folders', () => {
		return HttpResponse.json(folders)
	}),

	http.get('/api/folders/favorites', () => {
		const favoriteFolders = folderConsultationData
			.filter(folder => folder.favorite)
			.map(folder => ({
				id: folder.id,
				name: folder.responsible.name,
				count: folder.docs
			}))
		return HttpResponse.json(favoriteFolders)
	}),

	http.get('/api/folders/consultation', ({request}) => {
		const url = new URL(request.url)
		const {paginatedData, total, page, limit, totalPages} =
			filterAndSortFolders(url)

		return HttpResponse.json({
			data: paginatedData,
			total,
			page,
			limit,
			totalPages
		})
	}),

	http.get('/api/folders/consultation/:folderId', ({params}) => {
		const {folderId} = params
		// In a real app, you would fetch the specific folder data
		// For this mock, we return the same detail data for any ID
		return HttpResponse.json({...folderDetailData, id: folderId})
	}),

	http.patch('/api/folders/:id/favorite', ({params}) => {
		const {id} = params
		const folder = folderConsultationData.find(f => f.id === id)

		if (folder) {
			folder.favorite = !folder.favorite
			return HttpResponse.json(folder)
		}

		return new HttpResponse(null, {status: 404})
	}),

	http.get('/api/area-division', () => {
		return HttpResponse.json(areaDivision)
	}),

	http.get('/api/folder-activity', () => {
		return HttpResponse.json(folderActivity)
	}),

	http.get('/api/birthdays', () => {
		return HttpResponse.json(birthdays)
	}),

	http.get('/api/hearings', () => {
		return HttpResponse.json(hearings)
	}),

	http.get('https://avatars.githubusercontent.com/*', () => {
		return new HttpResponse(null, {
			status: 200
		})
	})
]
