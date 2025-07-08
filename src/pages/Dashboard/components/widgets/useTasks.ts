import {useQuery} from '@tanstack/react-query'
import {DateTime} from 'luxon'
import {useState} from 'react'
import type {DateRange} from 'react-day-picker'

interface Task {
	id: string
	title: string
	category: string
	completed: boolean
	color: string
	dueDate: string
}

async function getTasks(): Promise<Task[]> {
	const response = await fetch('/api/tasks')
	return response.json()
}

export function useTasks() {
	const {data: tasks = []} = useQuery<Task[]>({
		queryKey: ['tasks'],
		queryFn: getTasks
	})
	const [optimisticTasks, setOptimisticTasks] = useState<Task[]>([])
	const [dateRange, setDateRange] = useState<DateRange | undefined>()

	const handleDateRangeChange = (range: DateRange | undefined) => {
		setDateRange(range)
	}

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

	const filteredTasks = tasks.filter(task => {
		if (!dateRange?.from) {
			return true
		}
		const from = DateTime.fromJSDate(dateRange.from).startOf('day')
		const to = dateRange.to
			? DateTime.fromJSDate(dateRange.to).endOf('day')
			: from.endOf('day')
		const taskDate = DateTime.fromISO(task.dueDate)

		return taskDate >= from && taskDate <= to
	})

	const displayTasks = filteredTasks.map(task => {
		const optimisticTask = optimisticTasks.find(
			optimistic => optimistic.id === task.id
		)
		return optimisticTask || task
	})

	return {
		displayTasks: displayTasks.slice(0, 5),
		dateRange,
		setDateRange: handleDateRangeChange,
		toggleTask
	}
}
