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

export const folders = {
	active: faker.number.int({min: 400, max: 500}),
	newThisMonth: faker.number.int({min: 50, max: 100}),
	history: getPastMonths(6).map(month => ({
		month,
		value: faker.number.int({min: 300, max: 450})
	}))
}

export const areaDivision = [
	{
		name: 'Penal',
		value: faker.number.int({min: 10, max: 50}),
		color: '#EF4444'
	},
	{
		name: 'Trabalhista',
		value: faker.number.int({min: 10, max: 50}),
		color: '#10B981'
	},
	{
		name: 'Cível',
		value: faker.number.int({min: 10, max: 50}),
		color: '#06B6D4'
	},
	{
		name: 'Cível Contencioso',
		value: faker.number.int({min: 10, max: 50}),
		color: '#F59E0B'
	}
]

const inProgress = faker.number.int({min: 300, max: 500})
const overdue = faker.number.int({min: 50, max: 150})
const solved = faker.number.int({min: 100, max: 300})

export const folderActivity = [
	{
		label: 'EM ANDAMENTO',
		value: inProgress,
		color: 'bg-yellow-400',
		percentage: 100
	},
	{
		label: 'ATRASADAS',
		value: overdue,
		color: 'bg-red-500',
		percentage: (overdue / inProgress) * 100
	},
	{
		label: 'SOLUCIONADAS',
		value: solved,
		color: 'bg-green-500',
		percentage: (solved / inProgress) * 100
	}
]
