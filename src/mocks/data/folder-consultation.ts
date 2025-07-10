import {faker} from '@faker-js/faker'
import {generateAvatar} from '../../shared/utils/generateAvatar'

const CLIENT_NUMBER_LENGTH = 4

const createFolder = () => ({
	id: faker.string.uuid(),
	clientNumber: faker.string.numeric(CLIENT_NUMBER_LENGTH),
	responsible: {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		avatar: generateAvatar()
	},
	inclusionDate: faker.date.past().toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}),
	inclusionTime: faker.date.past().toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	}),
	docs: faker.number.int({min: 10, max: 100}),
	area: 'Cível contencioso',
	status: faker.helpers.arrayElement([
		'Completed',
		'Pending',
		'Refunded',
		'Cancelled'
	] as const)
})

export const folderConsultationData = Array.from({length: 97}, createFolder)
