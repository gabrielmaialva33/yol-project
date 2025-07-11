// Types related to Folders/Processes in the YOL system

export interface FolderParty {
	name: string
	cpf?: string
	cnpj?: string
	type: 'Autor' | 'Réu' | 'Terceiro'
}

export interface FolderDocument {
	id: string
	name: string
	type:
		| 'Petição'
		| 'Contrato'
		| 'Procuração'
		| 'Decisão'
		| 'Sentença'
		| 'Outros'
	uploadDate: string
	size: string
	url?: string
}

export interface FolderMovement {
	date: string
	description: string
	responsible: string
	type?: string
}

export interface FolderResponsible {
	name: string
	email: string
	avatar?: string
	position?: string
}

export interface FolderDetail {
	// Identification
	id: string
	clientNumber: string
	status: 'Ativo' | 'Arquivado' | 'Suspenso' | 'Encerrado'
	date: string
	time: string

	// Process Information
	processNumber: string
	cnjNumber: string
	instance: 'Primeira Instância' | 'Segunda Instância' | 'Tribunais Superiores'
	nature: 'Cível' | 'Criminal' | 'Trabalhista' | 'Tributário' | 'Administrativo'
	actionType: string
	phase: 'Conhecimento' | 'Execução' | 'Recurso' | 'Cumprimento de Sentença'
	electronic: 'Sim' | 'Não'
	clientCode: string
	folder: string
	defaultBillingCase: 'Sim' | 'Não'
	totus: boolean
	migrated: boolean

	// Court Information
	organ: string
	distribution: 'Sorteio' | 'Dependência' | 'Prevenção'
	entryDate: string
	internalCode: string
	searchType: string
	code: string
	judge: string

	// Location and Responsibles
	area: string
	subArea: string
	core: string
	district: string
	court: string
	courtDivision: string
	partner: string
	coordinator: string
	lawyer: string

	// Parties
	plaintiff: FolderParty
	defendant: FolderParty

	// Detailed Information
	observation: string
	objectDetail: string
	lastMovement: string

	// Values
	caseValue: number
	convictionValue?: number
	costs?: number
	fees?: number

	// Important Dates
	distributionDate: string
	citationDate?: string
	nextHearing?: string

	// Responsible for the folder
	responsible: FolderResponsible

	// Attached Documents
	documents: FolderDocument[]

	// Movements
	movements: FolderMovement[]
}

// Simplified type for listing
export interface FolderSummary {
	id: string
	favorite: boolean
	clientNumber: string
	responsible: FolderResponsible
	inclusionDate: string
	inclusionTime: string
	docs: number
	area: string
	status: 'Concluído' | 'Pendente' | 'Reembolsado' | 'Cancelado'
}

// Filters for consultation
export interface FolderFilters {
	clientNumber?: string
	dateRange?: string
	area?: string
	status?: string
	partner?: string
	lawyer?: string
	district?: string
}

// Pagination
export interface FolderPagination {
	page: number
	limit: number
	total: number
	totalPages: number
}

// Consultation API Response
export interface FolderConsultationResponse {
	data: FolderSummary[]
	pagination: FolderPagination
}
