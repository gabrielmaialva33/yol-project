import {faker} from '@faker-js/faker'

const getPastMonths = (count: number) => {
	const months = [
		'Jan',
		'Fev',
		'Mar',
		'Abr',
		'Mai',
		'Jun',
		'Jul',
		'Ago',
		'Set',
		'Out',
		'Nov',
		'Dez'
	]
	const today = new Date()
	const pastMonths: string[] = []

	for (let i = count - 1; i >= 0; i--) {
		const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
		const month = months[date.getMonth()]
		if (month) {
			pastMonths.push(month)
		}
	}

	return pastMonths
}

export const requests = getPastMonths(5).map(month => ({
	month,
	value: faker.number.int({min: 10, max: 30})
}))
