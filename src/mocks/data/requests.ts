import {faker} from '@faker-js/faker'

export const requests = Array.from({length: 5}, () => ({
	month: faker.date.month(),
	value: faker.number.int({min: 10, max: 30})
}))
