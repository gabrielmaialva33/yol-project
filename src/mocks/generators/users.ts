import {faker} from '@faker-js/faker/locale/pt_BR'
import {DateTime} from 'luxon'
import type {Role, User} from '../../shared/types/domain'
import {UserRole} from '../../shared/types/domain'

const roles: Record<UserRole, Role> = {
	[UserRole.ADMIN]: {
		id: 1,
		name: 'Administrador',
		slug: UserRole.ADMIN,
		description: 'Acesso total ao sistema',
		created_at: '2025-01-01T00:00:00.000Z',
		updated_at: '2025-01-01T00:00:00.000Z'
	},
	[UserRole.LAWYER]: {
		id: 2,
		name: 'Advogado',
		slug: UserRole.LAWYER,
		description: 'Gerencia processos e clientes',
		created_at: '2025-01-01T00:00:00.000Z',
		updated_at: '2025-01-01T00:00:00.000Z'
	},
	[UserRole.PARALEGAL]: {
		id: 3,
		name: 'Paralegal',
		slug: UserRole.PARALEGAL,
		description: 'Auxilia nos processos jurídicos',
		created_at: '2025-01-01T00:00:00.000Z',
		updated_at: '2025-01-01T00:00:00.000Z'
	},
	[UserRole.SECRETARY]: {
		id: 4,
		name: 'Secretário(a)',
		slug: UserRole.SECRETARY,
		description: 'Gerencia agenda e documentos',
		created_at: '2025-01-01T00:00:00.000Z',
		updated_at: '2025-01-01T00:00:00.000Z'
	},
	[UserRole.CLIENT]: {
		id: 5,
		name: 'Cliente',
		slug: UserRole.CLIENT,
		description: 'Acesso aos seus processos',
		created_at: '2025-01-01T00:00:00.000Z',
		updated_at: '2025-01-01T00:00:00.000Z'
	}
}

export function generateUser(overrides?: Partial<User>): User {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()
	const fullName = `${firstName} ${lastName}`
	const username = faker.helpers
		.slugify(`${firstName}.${lastName}`)
		.toLowerCase()
	const role = faker.helpers.arrayElement(Object.values(UserRole))
	const isLawyer = role === UserRole.LAWYER

	const createdAt = faker.date.past({years: 2})
	const updatedAt = faker.date.between({
		from: createdAt,
		to: DateTime.now().toJSDate()
	})

	return {
		id: faker.number.int({min: 1, max: 1000}),
		full_name: fullName,
		email: faker.internet.email({
			firstName,
			lastName,
			provider: 'benicio.com.br'
		}),
		username,
		avatar_url: faker.image.avatar(),
		phone: faker.phone.number(),
		...(isLawyer && {
			oab_number: `OAB/SP ${faker.number.int({min: 100_000, max: 999_999})}`
		}),
		metadata: {
			email_verified: faker.datatype.boolean({probability: 0.8}),
			email_verified_at: faker.datatype.boolean({probability: 0.8})
				? faker.date.past().toISOString()
				: null,
			last_login_at: faker.date.recent({days: 7}).toISOString(),
			preferences: {
				theme: faker.helpers.arrayElement(['light', 'dark']),
				notifications_enabled: faker.datatype.boolean(),
				language: 'pt-BR'
			}
		},
		roles: [roles[role]],
		created_at: createdAt.toISOString(),
		updated_at: updatedAt.toISOString(),
		...overrides
	}
}

// Criar usuários pré-definidos para o sistema
export const systemUsers = {
	admin: generateUser({
		id: 1,
		full_name: 'Admin Benício',
		email: 'admin@benicio.com.br',
		username: 'admin',
		roles: [roles[UserRole.ADMIN]]
	}),
	testLawyer: generateUser({
		id: 2,
		full_name: 'Dr. João Benício',
		email: 'joao@benicio.com.br',
		username: 'joao.benicio',
		oab_number: 'OAB/SP 123456',
		roles: [roles[UserRole.LAWYER]]
	})
}

export function generateUsers(count: number): User[] {
	return Array.from({length: count}, () => generateUser())
}
