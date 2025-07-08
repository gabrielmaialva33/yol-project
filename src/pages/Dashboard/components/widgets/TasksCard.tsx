'use client'

import {useState} from 'react'
import {TaskItem} from './TaskItem'

interface Task {
	id: string
	title: string
	category: string
	completed: boolean
	color: string
}

const initialTasks: Task[] = [
	{
		id: '1',
		title: 'Agendamento do processo 7845',
		category: 'Physics',
		completed: true,
		color: 'border-green-500'
	},
	{
		id: '2',
		title: 'Finalização da pasta 48575',
		category: 'Mathematic',
		completed: false,
		color: 'border-gray-300'
	},
	{
		id: '3',
		title: 'Audiência do processo 7845',
		category: 'Chemistry',
		completed: true,
		color: 'border-green-500'
	},
	{
		id: '4',
		title: 'Atualização de cadastro 9088',
		category: 'History',
		completed: false,
		color: 'border-gray-300'
	},
	{
		id: '5',
		title: 'Finalização da pasta 48575',
		category: 'English Language',
		completed: false,
		color: 'border-gray-300'
	}
]

export function TasksCard() {
	const [tasks, setTasks] = useState<Task[]>(initialTasks)

	const toggleTask = (id: string) => {
		setTasks(
			tasks.map(task =>
				task.id === id
					? {
							...task,
							completed: !task.completed,
							color: task.completed ? 'border-gray-300' : 'border-green-500'
						}
					: task
			)
		)
	}

	return (
		<div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>Suas tarefas</h3>
				<div className='flex items-center space-x-2 text-sm text-gray-500'>
					<span>9 Jan 2023 - 7 Fev 2023</span>
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
			</div>
			<div className='space-y-3'>
				{tasks.map(task => (
					<TaskItem key={task.id} task={task} toggleTask={toggleTask} />
				))}
			</div>
		</div>
	)
}
