'use client'
import {DateTime} from 'luxon'
import {DayPicker, type SelectRangeEventHandler} from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface DateRangePickerProps {
	dateRange: {from: Date; to?: Date} | undefined
	onDateRangeChange: SelectRangeEventHandler
	isOpen: boolean
	onToggle: () => void
}

export function formatDateRange(
	dateRange: {from: Date; to?: Date} | undefined
) {
	if (!dateRange?.from) {
		return 'Selecione um período'
	}

	const fromFormatted = DateTime.fromJSDate(dateRange.from).toFormat(
		'dd/MM/yyyy'
	)
	const toFormatted = dateRange.to
		? DateTime.fromJSDate(dateRange.to).toFormat('dd/MM/yyyy')
		: ''

	return toFormatted ? `${fromFormatted} - ${toFormatted}` : fromFormatted
}

export function DateRangePicker({
	dateRange,
	onDateRangeChange,
	isOpen,
	onToggle
}: DateRangePickerProps) {
	return (
		<div className='relative'>
			<div
				className='flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 rounded-md p-2 cursor-pointer'
				onClick={onToggle}
			>
				<span>{formatDateRange(dateRange)}</span>
				<button className='p-1' type='button'>
					<svg
						className='w-4 h-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<title>Calendar</title>
						<path
							d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
						/>
					</svg>
				</button>
			</div>

			{isOpen && (
				<div className='absolute top-12 right-0 bg-white border rounded-lg shadow-lg z-10'>
					<DayPicker
						className='custom-day-picker'
						classNames={{
							day_selected: 'bg-blue-500 text-white hover:bg-blue-600',
							day_today: 'text-blue-600 font-bold',
							day: 'text-gray-700'
						}}
						mode='range'
						onSelect={onDateRangeChange}
						selected={dateRange}
					/>
				</div>
			)}
		</div>
	)
}
