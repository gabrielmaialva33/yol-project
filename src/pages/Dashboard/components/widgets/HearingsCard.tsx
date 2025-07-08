import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import type {DateRange} from 'react-day-picker'
import {DateRangePicker} from '../../../../components/DateRangePicker'

interface Hearing {
	label: string
	percentage: number
	total: number
	completed: number
	color: string
}

async function getHearings(): Promise<Hearing[]> {
	const response = await fetch('/api/hearings')
	return response.json()
}

export function HearingsCard() {
	const {data: hearings = []} = useQuery<Hearing[]>({
		queryKey: ['hearings'],
		queryFn: getHearings
	})

	const [dateRange, setDateRange] = useState<DateRange | undefined>()
	const [showDatePicker, setShowDatePicker] = useState(false)

	const handleToggleDatePicker = () => {
		setShowDatePicker(!showDatePicker)
	}

	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>
					Audiências e Prazos
				</h3>
				<DateRangePicker
					dateRange={dateRange}
					isOpen={showDatePicker}
					onDateRangeChange={setDateRange}
					onToggle={handleToggleDatePicker}
				/>
			</div>
			<div className='space-y-6'>
				{hearings.map(item => (
					<div className='flex items-center' key={item.label}>
						<div className='w-1/4 pr-4'>
							<div className='text-3xl font-bold text-gray-900'>
								{item.percentage}%
							</div>
							<div className='text-sm text-gray-500 mt-1'>{item.label}</div>
						</div>
						<div className='w-3/4'>
							<div className='flex justify-between text-sm text-gray-500 mb-1'>
								<span>Total: {item.total}</span>
								<span>Cumpridos: {item.completed}</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2.5'>
								<div
									className='h-2.5 rounded-full'
									style={{
										width: `${item.percentage}%`,
										backgroundColor: item.color
									}}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
