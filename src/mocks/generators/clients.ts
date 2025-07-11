import {faker} from '@faker-js/faker/locale/pt_BR'
import {DateTime} from 'luxon'
import type {Address, Client} from '../../shared/types/domain'

export function generateAddress(): Address {
	const hasComplement = faker.datatype.boolean()

	return {
		street: faker.location.street(),
		number: faker.number.int({min: 1, max: 9999}).toString(),
		...(hasComplement && {complement: faker.location.secondaryAddress()}),
		neighborhood: faker.location.county(),
		city: faker.location.city(),
		state: faker.location.state({abbreviated: true}),
		postal_code: faker.location.zipCode('#####-###'),
		country: 'Brasil'
	} as Address
}

export function generateClient(overrides?: Partial<Client>): Client {
	const isCompany = faker.datatype.boolean({probability: 0.3})
	const name = isCompany ? faker.company.name() : faker.person.fullName()

	const document = isCompany
		? faker.helpers.replaceSymbols('##.###.###/####-##') // CNPJ
		: faker.helpers.replaceSymbols('###.###.###-##') // CPF

	const createdAt = faker.date.past({years: 3})
	const updatedAt = faker.date.between({
		from: createdAt,
		to: DateTime.now().toJSDate()
	})

	const foldersCount = faker.number.int({min: 1, max: 20})
	const activeFoldersCount = faker.number.int({min: 0, max: foldersCount})

	return {
		id: faker.number.int({min: 1, max: 1000}),
		name,
		document,
		email: faker.internet.email({
			firstName: name.split(' ')[0] || 'user',
			provider: isCompany ? faker.internet.domainName() : 'gmail.com'
		}),
		phone: faker.phone.number(),
		address: generateAddress(),
		folders_count: foldersCount,
		active_folders_count: activeFoldersCount,
		metadata: {
			type: isCompany ? 'company' : 'individual',
			...(!isCompany && {
				birthday: faker.date
					.birthdate({mode: 'age', min: 18, max: 80})
					.toISOString()
			}),
			...(isCompany && {contact_person: faker.person.fullName()}),
			...(faker.datatype.boolean({probability: 0.3}) && {
				notes: faker.lorem.sentence()
			})
		},
		created_at: createdAt.toISOString(),
		updated_at: updatedAt.toISOString(),
		...overrides
	}
}

export function generateClients(count: number): Client[] {
	return Array.from({length: count}, () => generateClient())
}

// Pre-defined clients for testing
export const testClients = [
	generateClient({
		id: 1,
		name: 'João Silva',
		document: '123.456.789-00',
		email: 'joao.silva@gmail.com',
		metadata: {
			type: 'individual',
			birthday: '1980-05-15T00:00:00.000Z',
			notes: 'Cliente preferencial'
		}
	}),
	generateClient({
		id: 2,
		name: 'Empresa ABC Ltda',
		document: '12.345.678/0001-90',
		email: 'contato@empresaabc.com.br',
		metadata: {
			type: 'company',
			contact_person: 'Maria Santos',
			notes: 'Contrato de assessoria mensal'
		}
	})
]
