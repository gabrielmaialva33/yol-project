// Tipos relacionados a Pastas/Processos no sistema YOL

export interface FolderParty {
	nome: string
	cpf?: string
	cnpj?: string
	tipo: 'Autor' | 'Réu' | 'Terceiro'
}

export interface FolderDocument {
	id: string
	nome: string
	tipo:
		| 'Petição'
		| 'Contrato'
		| 'Procuração'
		| 'Decisão'
		| 'Sentença'
		| 'Outros'
	dataUpload: string
	tamanho: string
	url?: string
}

export interface FolderMovement {
	data: string
	descricao: string
	responsavel: string
	tipo?: string
}

export interface FolderResponsible {
	nome: string
	email: string
	avatar?: string
	cargo?: string
}

export interface FolderDetail {
	// Identificação
	id: string
	clientNumber: string
	status: 'Ativo' | 'Arquivado' | 'Suspenso' | 'Encerrado'
	date: string
	time: string

	// Informações do Processo
	numeroProcesso: string
	numeroCNJ: string
	instancia: 'Primeira Instância' | 'Segunda Instância' | 'Tribunais Superiores'
	natureza:
		| 'Cível'
		| 'Criminal'
		| 'Trabalhista'
		| 'Tributário'
		| 'Administrativo'
	tipoAcao: string
	fase: 'Conhecimento' | 'Execução' | 'Recurso' | 'Cumprimento de Sentença'
	eletronico: 'Sim' | 'Não'
	codigoCliente: string
	pasta: string
	casoPadraoFaturamento: 'Sim' | 'Não'
	totus: boolean
	migrado: boolean

	// Informações do Tribunal
	orgao: string
	distribuicao: 'Sorteio' | 'Dependência' | 'Prevenção'
	dataEntrada: string
	codigoInterno: string
	tipoPesquisa: string
	codigo: string
	juiz: string

	// Localização e Responsáveis
	area: string
	subArea: string
	nucleo: string
	comarca: string
	foro: string
	vara: string
	socio: string
	coordenador: string
	advogado: string

	// Partes
	poloAtivo: FolderParty
	poloPassivo: FolderParty

	// Informações Detalhadas
	observacao: string
	detalhamentoObjeto: string
	ultimoAndamento: string

	// Valores
	valorCausa: number
	valorCondenacao?: number
	custas?: number
	honorarios?: number

	// Datas importantes
	dataDistribuicao: string
	dataCitacao?: string
	proximaAudiencia?: string

	// Responsável pela pasta
	responsavel: FolderResponsible

	// Documentos anexados
	documentos: FolderDocument[]

	// Andamentos
	andamentos: FolderMovement[]
}

// Tipo simplificado para listagem
export interface FolderSummary {
	id: string
	favorite: boolean
	clientNumber: string
	responsible: FolderResponsible
	inclusionDate: string
	inclusionTime: string
	docs: number
	area: string
	status: 'Completed' | 'Pending' | 'Refunded' | 'Cancelled'
}

// Filtros para consulta
export interface FolderFilters {
	clientNumber?: string
	dateRange?: string
	area?: string
	status?: string
	socio?: string
	advogado?: string
	comarca?: string
}

// Paginação
export interface FolderPagination {
	page: number
	limit: number
	total: number
	totalPages: number
}

// Resposta da API de consulta
export interface FolderConsultationResponse {
	data: FolderSummary[]
	pagination: FolderPagination
}
