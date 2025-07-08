import {faker} from '@faker-js/faker'

export const billingData = {
	value: faker.finance.amount({min: 8000, max: 12_000, dec: 2, symbol: 'R$'}),
	percentage: faker.number.float({min: -15, max: 15, multipleOf: 2}),
	chart: Array.from({length: 7}, () => ({
		name: faker.date.month(),
		uv: faker.number.int({min: 1000, max: 4000}),
		pv: faker.number.int({min: 1000, max: 10_000}),
		amt: faker.number.int({min: 1000, max: 3000})
	}))
}
