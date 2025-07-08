import {faker} from '@faker-js/faker'

const generateHearingData = (label: string, color: string) => {
	const total = faker.number.int({min: 1, max: 20})
	const completed = faker.number.int({min: 0, max: total})
	const percentage = total > 0 ? (completed / total) * 100 : 0

	return {
		label,
		percentage: Math.round(percentage),
		total,
		completed,
		color
	}
}

export const hearings = [
	generateHearingData('Audiências', '#008980'),
	generateHearingData('Prazos Jud.', '#BAE3E0'),
	generateHearingData('Extra Jud.', '#BAE3E0'),
	generateHearingData('Fatais', '#008980')
]
