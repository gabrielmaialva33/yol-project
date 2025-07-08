import {HttpResponse, http} from 'msw'
import {birthdays} from './data/birthdays'
import {areaDivision, folderActivity, folders} from './data/folders'
import {requests} from './data/requests'
import {tasks} from './data/tasks'

export const handlers = [
	http.post('/api/login', () => {
		return HttpResponse.json({
			email: 'test@benicio.com.br',
			password: 'benicio123'
		})
	}),

	http.get('/api/tasks', () => {
		return HttpResponse.json(tasks)
	}),

	http.get('/api/requests', () => {
		return HttpResponse.json(requests)
	}),

	http.get('/api/folders', () => {
		return HttpResponse.json(folders)
	}),

	http.get('/api/area-division', () => {
		return HttpResponse.json(areaDivision)
	}),

	http.get('/api/folder-activity', () => {
		return HttpResponse.json(folderActivity)
	}),

	http.get('/api/birthdays', () => {
		return HttpResponse.json(birthdays)
	}),

	http.get('https://avatars.githubusercontent.com/*', () => {
		return new HttpResponse(null, {
			status: 200
		})
	})
]
