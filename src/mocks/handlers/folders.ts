import {DateTime} from 'luxon'
import {HttpResponse, http} from 'msw'
import type {FolderDetail} from '../../features/folders/types/folder.types'
import type {ApiResponse} from '../../shared/types/api'
import type {Folder} from '../../shared/types/domain'
import {FolderArea, FolderStatus} from '../../shared/types/domain'
import {generateFolder, generateFolders} from '../generators/folders'
import {
	applyFilters,
	applySorting,
	createPaginatedResponse,
	parseQueryParams
} from '../helpers/pagination'

// Transform Folder to FolderDetail
function transformToFolderDetail(folder: Folder): FolderDetail {
	const createdDate = DateTime.fromISO(folder.created_at)
	return {
		// Identification
		id: folder.id.toString(),
		clientNumber: folder.client.id.toString(),
		status: 'Ativo' as const,
		date: createdDate.toFormat('dd/MM/yyyy'),
		time: createdDate.toFormat('HH:mm'),

		// Process Information
		processNumber: folder.case_number || '',
		cnjNumber: folder.code,
		instance: 'Primeira Instância' as const,
		nature: 'Cível' as const,
		actionType: 'Ordinária',
		phase: 'Conhecimento' as const,
		electronic: 'Sim' as const,
		clientCode: folder.client.id.toString(),
		folder: folder.code,
		defaultBillingCase: 'Sim' as const,
		totus: false,
		migrated: false,

		// Court Information
		organ: 'TJSP',
		distribution: 'Sorteio' as const,
		entryDate: createdDate.toFormat('dd/MM/yyyy'),
		internalCode: folder.code,
		searchType: 'Padrão',
		code: folder.code,
		judge: 'Dr. João Silva',

		// Location and Responsibles
		area: 'Cível Contencioso',
		subArea: 'Contratos',
		core: 'Equipe 1',
		district: 'São Paulo',
		court: 'Foro Central Cível',
		courtDivision: '1ª Vara Cível',
		partner: 'Dr. João',
		coordinator: 'Dra. Maria',
		lawyer: folder.responsible_lawyer.full_name,

		// Parties
		plaintiff: {
			name: folder.client.name,
			cpf: folder.client.document,
			type: 'Autor' as const
		},
		defendant: {
			name: folder.opposing_party || 'Empresa XYZ',
			cnpj: '12.345.678/0001-90',
			type: 'Réu' as const
		},

		// Detailed Information
		observation: folder.description || '',
		objectDetail: folder.metadata?.last_movement || '',
		lastMovement: folder.metadata?.last_movement || '',

		// Values
		caseValue: folder.value || 0,
		convictionValue: 0,
		costs: 0,
		fees: 0,

		// Important Dates
		distributionDate: createdDate.toFormat('dd/MM/yyyy'),
		...(folder.metadata?.next_deadline && {
			nextHearing: folder.metadata.next_deadline
		}),

		// Responsible for the folder
		responsible: {
			name: folder.responsible_lawyer.full_name,
			email: folder.responsible_lawyer.email,
			...(folder.responsible_lawyer.avatar_url && {
				avatar: folder.responsible_lawyer.avatar_url
			}),
			position: 'Advogado'
		},

		// Attached Documents
		documents: [],

		// Movements
		movements: []
	}
}

// Generate mock data
const TOTAL_FOLDERS = 150
const allFolders = generateFolders(TOTAL_FOLDERS)
allFolders.push(generateFolder({id: 1830}))

// Filter functions
const folderFilters = {
	search: (folder: Folder, value: unknown) => {
		const searchLower = String(value).toLowerCase()
		return (
			folder.code.toLowerCase().includes(searchLower) ||
			folder.title.toLowerCase().includes(searchLower) ||
			folder.client.name.toLowerCase().includes(searchLower) ||
			(folder.case_number?.toLowerCase().includes(searchLower) ?? false)
		)
	},
	status: (folder: Folder, value: unknown) => {
		return folder.status === value
	},
	area: (folder: Folder, value: unknown) => {
		return folder.area === value
	},
	client_id: (folder: Folder, value: unknown) => {
		return folder.client.id === Number(value)
	},
	responsible_id: (folder: Folder, value: unknown) => {
		return folder.responsible_lawyer.id === Number(value)
	},
	is_favorite: (folder: Folder, value: unknown) => {
		return folder.is_favorite === (value === 'true')
	},
	date_from: (folder: Folder, value: unknown) => {
		return (
			DateTime.fromISO(folder.created_at) >= DateTime.fromISO(String(value))
		)
	},
	date_to: (folder: Folder, value: unknown) => {
		return (
			DateTime.fromISO(folder.created_at) <= DateTime.fromISO(String(value))
		)
	}
}

export const folderHandlers = [
	// List folders with pagination and filters
	http.get('/api/folders', ({request}) => {
		const url = new URL(request.url)
		const {page, perPage, sortBy, order, filters} = parseQueryParams(url)

		let filteredFolders = applyFilters(allFolders, filters, folderFilters)
		filteredFolders = applySorting(filteredFolders, sortBy, order)

		const response = createPaginatedResponse({
			data: filteredFolders,
			page,
			perPage,
			baseUrl: '/api/folders'
		})

		return HttpResponse.json(response)
	}),

	// Find folder by ID
	http.get('/api/folders/:id', ({params}) => {
		const {id} = params
		const folder = allFolders.find(f => f.id === Number(id))

		if (!folder) {
			return HttpResponse.json(
				{errors: [{message: 'Folder not found'}]},
				{status: 404}
			)
		}

		const response: ApiResponse<Folder> = {data: folder}
		return HttpResponse.json(response)
	}),

	// Create new folder
	http.post('/api/folders', async ({request}) => {
		const body = (await request.json()) as Partial<Folder>
		const FOLDER_CODE_OFFSET = 1001

		const newFolder: Folder = {
			...body,
			id: Math.max(...allFolders.map(f => f.id)) + 1,
			code: `${allFolders.length + FOLDER_CODE_OFFSET}/${DateTime.now().year}`,
			documents_count: 0,
			tasks_count: 0,
			hearings_count: 0,
			is_favorite: false,
			created_at: DateTime.now().toISO(),
			updated_at: DateTime.now().toISO()
		} as Folder

		allFolders.push(newFolder)

		const response: ApiResponse<Folder> = {data: newFolder}
		return HttpResponse.json(response, {status: 201})
	}),

	// Update folder
	http.put('/api/folders/:id', async ({params, request}) => {
		const {id} = params
		const body = (await request.json()) as Partial<Folder>

		const folderIndex = allFolders.findIndex(f => f.id === Number(id))
		if (folderIndex === -1) {
			return HttpResponse.json(
				{errors: [{message: 'Folder not found'}]},
				{status: 404}
			)
		}

		const existingFolder = allFolders[folderIndex]
		const updatedFolder: Folder = {
			...existingFolder,
			...body,
			updated_at: DateTime.now().toISO()
		} as Folder

		allFolders[folderIndex] = updatedFolder

		const response: ApiResponse<Folder> = {data: updatedFolder}
		return HttpResponse.json(response)
	}),

	// Toggle favorite
	http.patch('/api/folders/:id/favorite', ({params}) => {
		const {id} = params
		const folder = allFolders.find(f => f.id === Number(id))

		if (!folder) {
			return HttpResponse.json(
				{errors: [{message: 'Folder not found'}]},
				{status: 404}
			)
		}

		folder.is_favorite = !folder.is_favorite
		const updatedFolder = {
			...folder,
			updated_at: DateTime.now().toISO()
		}
		// Update in array
		const index = allFolders.findIndex(f => f.id === folder.id)
		if (index !== -1) {
			allFolders[index] = updatedFolder
		}

		const response: ApiResponse<Folder> = {data: updatedFolder}
		return HttpResponse.json(response)
	}),

	// Delete folder
	http.delete('/api/folders/:id', ({params}) => {
		const {id} = params
		const folderIndex = allFolders.findIndex(f => f.id === Number(id))

		if (folderIndex === -1) {
			return HttpResponse.json(
				{errors: [{message: 'Folder not found'}]},
				{status: 404}
			)
		}

		allFolders.splice(folderIndex, 1)
		return new HttpResponse(null, {status: 204})
	}),

	// Folder statistics
	http.get('/api/folders/stats', () => {
		const HUNDRED_PERCENT = 100
		const RECENT_FOLDERS_COUNT = 5
		const stats = {
			total: allFolders.length,
			by_status: Object.values(FolderStatus).map(status => ({
				status,
				count: allFolders.filter(f => f.status === status).length,
				percentage:
					(allFolders.filter(f => f.status === status).length /
						allFolders.length) *
					HUNDRED_PERCENT
			})),
			by_area: Object.values(FolderArea).map(area => ({
				area,
				count: allFolders.filter(f => f.area === area).length,
				percentage:
					(allFolders.filter(f => f.area === area).length / allFolders.length) *
					HUNDRED_PERCENT
			})),
			favorites: allFolders.filter(f => f.is_favorite).length,
			recent: allFolders
				.sort(
					(a, b) =>
						DateTime.fromISO(b.created_at).toMillis() -
						DateTime.fromISO(a.created_at).toMillis()
				)
				.slice(0, RECENT_FOLDERS_COUNT)
		}

		const response: ApiResponse<typeof stats> = {data: stats}
		return HttpResponse.json(response)
	}),
	http.get('/api/folders/consultation/:id', ({params}) => {
		const {id} = params
		const folder = allFolders.find(f => f.id === Number(id))

		if (!folder) {
			return HttpResponse.json(
				{errors: [{message: 'Folder not found'}]},
				{status: 404}
			)
		}

		const folderDetail = transformToFolderDetail(folder)
		const response: ApiResponse<FolderDetail> = {data: folderDetail}
		return HttpResponse.json(response)
	})
]
