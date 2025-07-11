import {faker} from '@faker-js/faker'
import {DateTime} from 'luxon'

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
    const today = DateTime.now()
    const pastMonths: string[] = []

    for (let i = count - 1; i >= 0; i--) {
        const date = today.minus({months: i}).startOf('month')
        const month = months[date.month - 1]
        if (month) {
            pastMonths.push(month)
        }
    }

    return pastMonths
}

const HISTORY_MONTHS_COUNT = 6
const PERCENTAGE_MULTIPLIER = 100

export const folders = {
    active: faker.number.int({min: 400, max: 500}),
    newThisMonth: faker.number.int({min: 50, max: 100}),
    history: getPastMonths(HISTORY_MONTHS_COUNT).map(month => ({
        month,
        value: faker.number.int({min: 300, max: 450})
    }))
}

export const areaDivision = [
    {
        name: 'Trabalhista',
        value: faker.number.int({min: 10, max: 50}),
        color: '#2FAC68'
    },
    {
        name: 'Penal',
        value: faker.number.int({min: 10, max: 50}),
        color: '#EC6553'
    },
    {
        name: 'Cível',
        value: faker.number.int({min: 10, max: 50}),
        color: '#1CD6F4'
    },
    {
        name: 'Cível Contencioso',
        value: faker.number.int({min: 10, max: 50}),
        color: '#F6C000'
    },
    {
        name: 'Tributário',
        value: faker.number.int({min: 10, max: 50}),
        color: '#A855F7'
    }
]

const inProgress = faker.number.int({min: 300, max: 500})
const overdue = faker.number.int({min: 50, max: 150})
const solved = faker.number.int({min: 100, max: 300})

export const folderActivity = [
    {
        label: 'EM ANDAMENTO',
        value: inProgress,
        color: 'bg-orange-400',
        percentage: 100
    },
    {
        label: 'ATRASADAS',
        value: overdue,
        color: 'bg-red-500',
        percentage: (overdue / inProgress) * PERCENTAGE_MULTIPLIER
    },
    {
        label: 'SOLUCIONADAS',
        value: solved,
        color: 'bg-green-500',
        percentage: (solved / inProgress) * PERCENTAGE_MULTIPLIER
    }
]
