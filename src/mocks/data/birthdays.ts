import {faker} from '@faker-js/faker'

export const birthdays = Array.from({length: 10}, () => ({
	avatar: faker.image.avatar(),
	name: faker.person.fullName(),
	email: faker.internet.email()
}))
