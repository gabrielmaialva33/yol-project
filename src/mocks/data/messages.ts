import {faker} from '@faker-js/faker'
import {generateAvatar} from '../../shared/utils/generateAvatar'

export const messages = {
	unread: faker.number.int({min: 1, max: 5}),
	items: Array.from({length: 5}, () => ({
		id: faker.string.uuid(),
		avatar: generateAvatar(),
		name: faker.person.fullName(),
		message: faker.lorem.words({min: 3, max: 8}),
		time: faker.date.recent()
	}))
}
