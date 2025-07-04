import {HttpResponse, http} from 'msw'

export const handlers = [
	http.post('/api/login', () => {
		return HttpResponse.json({
			email: 'test@benicio.com.br',
			password: 'benicio123'
		})
	})
]
