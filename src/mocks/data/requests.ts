import {faker} from '@faker-js/faker'
import {DateTime} from 'luxon'

const REQUESTS_MONTHS_COUNT = 12
const PERCENTAGE_MULTIPLIER = 100

const getPastMonths = (count: number) => {
	const months: string[] = []
	let date = DateTime.now()
	for (let i = 0; i < count; i++) {
		months.push(date.toFormat('LLL'))
		date = date.minus({months: 1})
	}
	return months.reverse()
}

export const requests = getPastMonths(REQUESTS_MONTHS_COUNT).map(month => {
	const total = faker.number.int({min: 20, max: 100})
	const news = faker.number.int({min: 5, max: total})
	return {
		month,
		value: total,
		new: news,
		percentage: (news / total) * PERCENTAGE_MULTIPLIER
	}
})
