import * as v from 'valibot'
import type {ApiResponse, ErrorResponse} from '../types/api'
import type {User} from '../types/domain'

const AuthSchema = v.object({
	email: v.string(),
	password: v.string()
})
export type AuthInput = v.InferOutput<typeof AuthSchema>

interface LoginResponse {
	user: User
	token: string
}

export async function login(data: AuthInput): Promise<LoginResponse> {
	const response = await fetch('/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})

	if (!response.ok) {
		const error = (await response.json()) as ErrorResponse
		throw new Error(error.errors[0]?.message || 'Falha ao fazer login')
	}

	const result = (await response.json()) as ApiResponse<LoginResponse>
	return result.data
}

export async function logout(): Promise<void> {
	await fetch('/api/auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getStoredToken()}`
		}
	})

	// Limpar token local
	clearStoredToken()
}

export async function getMe(): Promise<User> {
	const response = await fetch('/api/auth/me', {
		headers: {
			Authorization: `Bearer ${getStoredToken()}`
		}
	})

	if (!response.ok) {
		throw new Error('Não autorizado')
	}

	const result = (await response.json()) as ApiResponse<User>
	return result.data
}

// Helpers para gerenciar token (em produção seria mais seguro)
function getStoredToken(): string {
	// Em produção, usar contexto ou estado global seguro
	return 'mock-jwt-token'
}

function clearStoredToken(): void {
	// Em produção, limpar do estado global
}
