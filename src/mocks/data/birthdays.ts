import {faker} from '@faker-js/faker'
import {generateAvatar} from 'utils/generateAvatar'

export const birthdays = Array.from(
	{length: faker.number.int({min: 3, max: 10})},
	() => ({
		avatar: generateAvatar(),
		name: faker.person.fullName(),
		email: faker.internet.email().toLowerCase()
	})
)
