import * as v from 'valibot'

const Auth = v.object({
	email: v.string(),
	password: v.string()
})
export type Auth = v.InferOutput<typeof Auth>

export async function login(data: Auth) {
	const response = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	if (!response.ok) {
		throw new Error('Failed to login')
	}
	return v.parse(Auth, await response.json())
}
