import {faker} from '@faker-js/faker'

export const tasks = Array.from({length: 5}, () => ({
	id: faker.string.uuid(),
	title: faker.lorem.sentence(),
	category: faker.lorem.word(),
	completed: faker.datatype.boolean(),
	color: faker.internet.color()
}))
