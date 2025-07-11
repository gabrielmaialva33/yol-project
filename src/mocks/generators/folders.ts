import {faker} from '@faker-js/faker/locale/pt_BR'
import {DateTime} from 'luxon'
import type {Folder} from '../../shared/types/domain'
import {FolderArea, FolderStatus, UserRole} from '../../shared/types/domain'
import {generateClient} from './clients'
import {generateUser} from './users'

export const areaNames: Record<FolderArea, string> = {
	[FolderArea.CIVIL_LITIGATION]: 'Cível Contencioso',
	[FolderArea.LABOR]: 'Trabalhista',
	[FolderArea.TAX]: 'Tributário',
	[FolderArea.CRIMINAL]: 'Criminal',
	[FolderArea.ADMINISTRATIVE]: 'Administrativo',
	[FolderArea.CONSUMER]: 'Consumidor',
	[FolderArea.FAMILY]: 'Família',
	[FolderArea.CORPORATE]: 'Empresarial',
	[FolderArea.ENVIRONMENTAL]: 'Ambiental',
	[FolderArea.INTELLECTUAL_PROPERTY]: 'Propriedade Intelectual',
	[FolderArea.REAL_ESTATE]: 'Imobiliário',
	[FolderArea.INTERNATIONAL]: 'Internacional'
}

const courts = [
	'1ª Vara Cível de São Paulo',
	'2ª Vara Cível de São Paulo',
	'3ª Vara do Trabalho de São Paulo',
	'1ª Vara Criminal de São Paulo',
	'Tribunal de Justiça de São Paulo',
	'Tribunal Regional do Trabalho - 2ª Região',
	'Juizado Especial Cível Central',
	'4ª Vara da Fazenda Pública',
	'1ª Vara de Família e Sucessões'
]

export function generateFolder(overrides?: Partial<Folder>): Folder {
	const area = faker.helpers.arrayElement(Object.values(FolderArea))
	const status = faker.helpers.arrayElement(Object.values(FolderStatus))
	const client = overrides?.client || generateClient()
	const responsibleLawyer =
		overrides?.responsible_lawyer ||
		generateUser({
			roles: [
				{
					id: 2,
					name: 'Advogado',
					slug: UserRole.LAWYER,
					description: 'Gerencia processos e clientes',
					created_at: DateTime.now().toISO(),
					updated_at: DateTime.now().toISO()
				}
			]
		})

	const teamSize = faker.number.int({min: 1, max: 4})
	const teamMembers = Array.from({length: teamSize}, () => generateUser())

	const createdAt = faker.date.past({years: 2})
	const updatedAt = faker.date.between({
		from: createdAt,
		to: DateTime.now().toJSDate()
	})

	const code = `${faker.number.int({min: 1000, max: 9999})}/${DateTime.now().year}`
	const caseNumber = faker.helpers.replaceSymbols('####.##.#.######-#')

	return {
		id: overrides?.id || faker.number.int({min: 1, max: 10_000}),
		code,
		title: generateFolderTitle(area, client.name),
		description: faker.lorem.paragraph(),
		status,
		area,
		court: faker.helpers.arrayElement(courts),
		case_number: caseNumber,
		opposing_party: faker.company.name(),
		value: faker.number.int({min: 5000, max: 5_000_000}),
		client,
		responsible_lawyer: responsibleLawyer,
		team_members: teamMembers,
		documents_count: faker.number.int({min: 5, max: 100}),
		tasks_count: faker.number.int({min: 0, max: 20}),
		hearings_count: faker.number.int({min: 0, max: 5}),
		is_favorite: faker.datatype.boolean({probability: 0.2}),
		metadata: {
			risk_assessment: faker.helpers.arrayElement(['low', 'medium', 'high']),
			next_deadline: faker.date.future({years: 1}).toISOString(),
			last_movement: faker.lorem.sentence(),
			tags: generateTags(area)
		},
		created_at: createdAt.toISOString(),
		updated_at: updatedAt.toISOString(),
		...overrides
	}
}

function generateFolderTitle(area: FolderArea, clientName: string): string {
	const actions = {
		[FolderArea.CIVIL_LITIGATION]: [
			'Ação de Indenização',
			'Ação de Cobrança',
			'Execução de Título'
		],
		[FolderArea.LABOR]: [
			'Reclamação Trabalhista',
			'Ação Trabalhista',
			'Dissídio Individual'
		],
		[FolderArea.TAX]: [
			'Execução Fiscal',
			'Mandado de Segurança',
			'Ação Anulatória'
		],
		[FolderArea.CRIMINAL]: ['Ação Penal', 'Habeas Corpus', 'Defesa Criminal'],
		[FolderArea.ADMINISTRATIVE]: [
			'Mandado de Segurança',
			'Ação Popular',
			'Impugnação'
		],
		[FolderArea.CONSUMER]: [
			'Ação de Indenização',
			'Revisional de Contrato',
			'Ação de Cobrança'
		],
		[FolderArea.FAMILY]: ['Divórcio', 'Guarda', 'Alimentos', 'Inventário'],
		[FolderArea.CORPORATE]: [
			'Dissolução de Sociedade',
			'Recuperação Judicial',
			'Alteração Contratual'
		],
		[FolderArea.ENVIRONMENTAL]: [
			'Ação Civil Pública',
			'Licenciamento Ambiental',
			'Compensação Ambiental'
		],
		[FolderArea.INTELLECTUAL_PROPERTY]: [
			'Registro de Marca',
			'Ação de Contrafação',
			'Licenciamento de Patente'
		],
		[FolderArea.REAL_ESTATE]: [
			'Ação de Usucapião',
			'Ação de Despejo',
			'Registro Imobiliário'
		],
		[FolderArea.INTERNATIONAL]: [
			'Arbitragem Internacional',
			'Contrato Internacional',
			'Homologação de Sentença'
		]
	}

	const action = faker.helpers.arrayElement(actions[area] || ['Processo'])
	return `${action} - ${clientName}`
}

function generateTags(area: FolderArea): string[] {
	const baseTags = [areaNames[area]]
	const additionalTags = faker.helpers.arrayElements(
		[
			'urgente',
			'prioridade',
			'aguardando',
			'recurso',
			'sentença',
			'acordo',
			'perícia',
			'audiência marcada'
		],
		{min: 0, max: 3}
	)

	return [...baseTags, ...additionalTags]
}

export function generateFolders(count: number): Folder[] {
	return Array.from({length: count}, () => generateFolder())
}
