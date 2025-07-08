interface Task {
	id: string
	title: string
	category: string
	completed: boolean
	color: string
}

interface TaskItemProps {
	task: Task
	toggleTask: (id: string) => void
}

export function TaskItem({task, toggleTask}: TaskItemProps) {
	return (
		<div
			className={`flex items-center space-x-3 p-3 border-l-4 ${task.color} bg-gray-50 rounded-r`}
			key={task.id}
		>
			<button
				className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
					task.completed
						? 'bg-green-500 border-green-500 text-white'
						: 'border-gray-300 hover:border-gray-400'
				}`}
				onClick={() => toggleTask(task.id)}
				type='button'
			>
				{task.completed && (
					<svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
						<title>Completed</title>
						<path
							clipRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							fillRule='evenodd'
						/>
					</svg>
				)}
			</button>
			<div className='flex-1'>
				<div
					className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
				>
					{task.title}
				</div>
				<div className='text-sm text-gray-500'>{task.category}</div>
			</div>
			<div className='flex space-x-2'>
				<button className='p-1 text-gray-400 hover:text-gray-600' type='button'>
					<svg
						className='w-4 h-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<title>Comment</title>
						<path
							d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
						/>
					</svg>
				</button>
				<button className='p-1 text-gray-400 hover:text-gray-600' type='button'>
					<svg
						className='w-4 h-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<title>Edit</title>
						<path
							d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}
