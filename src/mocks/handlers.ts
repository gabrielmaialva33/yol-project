import {HttpResponse, http} from 'msw'

export const handlers = [
	http.post('/login', () => {
		return HttpResponse.json({
			email: 'example@email.com',
			password: 'password'
		})
	})
]
