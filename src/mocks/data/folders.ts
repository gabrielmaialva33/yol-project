import {faker} from '@faker-js/faker'

export const folders = {
	active: faker.number.int({min: 400, max: 500}),
	newThisMonth: faker.number.int({min: 50, max: 100}),
	history: Array.from({length: 6}, () => ({
		month: faker.date.month(),
		value: faker.number.int({min: 300, max: 450})
	}))
}

export const areaDivision = [
	{name: 'Penal', value: 35, color: '#EF4444'},
	{name: 'Trabalhista', value: 40, color: '#10B981'},
	{name: 'Cível', value: 15, color: '#06B6D4'},
	{name: 'Cível Contencioso', value: 10, color: '#F59E0B'}
]

export const folderActivity = [
	{label: 'EM ANDAMENTO', value: 420, color: 'bg-yellow-400', percentage: 100},
	{label: 'ATRASADAS', value: 89, color: 'bg-red-500', percentage: 21},
	{label: 'SOLUCIONADAS', value: 212, color: 'bg-green-500', percentage: 50}
]
