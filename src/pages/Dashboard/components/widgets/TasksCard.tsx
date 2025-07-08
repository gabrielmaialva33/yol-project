'use client'

import {DateTime} from 'luxon'
import {useState} from 'react'
import {DayPicker} from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import {TaskItem} from './TaskItem'
import {useTasks} from './useTasks'

export function TasksCard() {
	const {displayTasks, dateRange, setDateRange, toggleTask} = useTasks()
	const [showDatePicker, setShowDatePicker] = useState(false)

	const formatDate = (date: Date) => {
		return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy')
	}

	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>Suas tarefas</h3>
				<div className='flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 rounded-md p-2'>
					<span>
						{dateRange?.from
							? `${formatDate(dateRange.from)} - ${
									dateRange.to ? formatDate(dateRange.to) : ''
								}`
							: 'Selecione um período'}
					</span>
					<button
						className='p-1'
						onClick={() => setShowDatePicker(!showDatePicker)}
						type='button'
					>
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
			</div>
			{showDatePicker && (
				<div className='absolute top-16 right-0 bg-gray-50 border rounded-lg shadow-lg z-10'>
					<DayPicker
						className='bg-gray-50'
						classNames={{
							day_selected:
								'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600',
							day_today: 'bg-blue-100 text-blue-600'
						}}
						mode='range'
						onSelect={setDateRange}
						selected={dateRange}
					/>
				</div>
			)}
			<div className='space-y-3'>
				{displayTasks.map(task => (
					<TaskItem key={task.id} task={task} toggleTask={toggleTask} />
				))}
			</div>
		</div>
	)
}
