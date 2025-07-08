import {faker} from '@faker-js/faker'
import {DateTime} from 'luxon'

const generateHearingData = (label: string, color: string) => {
	const total = faker.number.int({min: 1, max: 20})
	const completed = faker.number.int({min: 0, max: total})
	const percentage = total > 0 ? (completed / total) * 100 : 0

	return {
		label,
		percentage: Math.round(percentage),
		total,
		completed,
		color,
		date: faker.date.recent({
			days: DateTime.now().diff(DateTime.now().minus({days: 8}), 'days').days,
			refDate: DateTime.now().toJSDate()
		})
	}
}

export const hearings = [
	generateHearingData('Audiências', '#004B50'),
	generateHearingData('Prazos Jud.', '#92D7CF'),
	generateHearingData('Extra Jud.', '#92D7CF'),
	generateHearingData('Fatais', '#004B50')
]
