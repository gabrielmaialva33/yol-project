import {faker} from '@faker-js/faker'
import {DateTime} from 'luxon'

const today = DateTime.now()
const startOfMonth = today.startOf('month')
const endOfMonth = today.endOf('month')

export const tasks = Array.from({length: 20}, () => {
	const randomDay = faker.number.int({
		min: 1,
		max: endOfMonth.day
	})
	const dueDate = startOfMonth.set({day: randomDay})

	return {
		id: faker.string.uuid(),
		title: faker.lorem.sentence(),
		category: faker.lorem.word(),
		completed: dueDate < today,
		color: faker.color.rgb(),
		dueDate: dueDate.toISODate()
	}
})
