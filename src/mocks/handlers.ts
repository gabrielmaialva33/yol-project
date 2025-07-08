import {HttpResponse, http} from 'msw'
import {birthdays} from './data/birthdays'
import {areaDivision, folderActivity, folders} from './data/folders'
import {hearings} from './data/hearings'
import {requests} from './data/requests'
import {tasks} from './data/tasks'

const fruits = [
	{id: 1, name: 'Apple', vitamins: ['Vitamin A', 'Vitamin B', 'Vitamin K']},
	{id: 2, name: 'Banana', vitamins: ['Vitamin B6', 'Vitamin C']},
	{id: 3, name: 'Orange', vitamins: ['Vitamin C']},
	{id: 4, name: 'Strawberry', vitamins: ['Vitamin C', 'Folate']},
	{id: 5, name: 'Blueberry', vitamins: ['Vitamin K', 'Vitamin C']},
	{id: 6, name: 'Mango', vitamins: ['Vitamin A', 'Vitamin C']}
]

export const handlers = [
	http.get('/fruits', () => {
		return HttpResponse.json(fruits)
	}),

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

	http.get('/api/hearings', () => {
		return HttpResponse.json(hearings)
	}),

	http.get('https://avatars.githubusercontent.com/*', () => {
		return new HttpResponse(null, {
			status: 200
		})
	})
]
