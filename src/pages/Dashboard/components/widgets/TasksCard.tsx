'use client'

import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {TaskItem} from './TaskItem'

interface Task {
	id: string
	title: string
	category: string
	completed: boolean
	color: string
}

async function getTasks(): Promise<Task[]> {
	const response = await fetch('/api/tasks')
	return response.json()
}

export function TasksCard() {
	const {data: tasks = []} = useQuery<Task[]>({
		queryKey: ['tasks'],
		queryFn: getTasks
	})
	const [optimisticTasks, setOptimisticTasks] = useState<Task[]>([])

	const toggleTask = (id: string) => {
		setOptimisticTasks(prev => {
			const existingTask = prev.find(task => task.id === id)
			if (existingTask) {
				return prev.map(task =>
					task.id === id ? {...task, completed: !task.completed} : task
				)
			}
			const originalTask = tasks.find(task => task.id === id)
			if (originalTask) {
				return [...prev, {...originalTask, completed: !originalTask.completed}]
			}
			return prev
		})
	}

	const displayTasks = tasks.map(task => {
		const optimisticTask = optimisticTasks.find(
			optimistic => optimistic.id === task.id
		)
		return optimisticTask || task
	})

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
				{displayTasks.map(task => (
					<TaskItem key={task.id} task={task} toggleTask={toggleTask} />
				))}
			</div>
		</div>
	)
}
