import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { TasksCard } from './TasksCard'

// Mock hooks
vi.mock('../../../../shared/hooks/use-tasks', () => ({
  useTasks: vi.fn()
}))

// Mock components
vi.mock('../../../../shared/ui/DateRangePicker', () => ({
  DateRangePicker: ({ dateRange, isOpen, onDateRangeChange, onToggle }: any) => (
    <div data-testid="date-range-picker">
      <button onClick={onToggle}>Toggle Date Picker</button>
      {isOpen && <div>Date Picker Open</div>}
      {dateRange && <div>Date Range Selected</div>}
    </div>
  )
}))

vi.mock('./TaskItem', () => ({
  TaskItem: ({ task, toggleTask }: any) => (
    <div data-testid={`task-${task.id}`}>
      <span>{task.title}</span>
      <button onClick={() => toggleTask(task.id)}>Toggle</button>
    </div>
  )
}))

import { useTasks } from '../../../../shared/hooks/use-tasks'

describe('TasksCard', () => {
  const mockTasks = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
    { id: '3', title: 'Task 3', completed: false }
  ]

  const mockUseTasks = {
    displayTasks: mockTasks,
    dateRange: null,
    setDateRange: vi.fn(),
    toggleTask: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useTasks).mockReturnValue(mockUseTasks)
  })

  it('should render card with title', () => {
    render(<TasksCard />)
    
    expect(screen.getByText('Suas tarefas')).toBeInTheDocument()
  })

  it('should render all tasks', () => {
    render(<TasksCard />)
    
    mockTasks.forEach(task => {
      expect(screen.getByTestId(`task-${task.id}`)).toBeInTheDocument()
      expect(screen.getByText(task.title)).toBeInTheDocument()
    })
  })

  it('should render date range picker', () => {
    render(<TasksCard />)
    
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument()
  })

  it('should toggle date picker when clicking toggle button', () => {
    render(<TasksCard />)
    
    const toggleButton = screen.getByText('Toggle Date Picker')
    
    // Initially closed
    expect(screen.queryByText('Date Picker Open')).not.toBeInTheDocument()
    
    // Click to open
    fireEvent.click(toggleButton)
    expect(screen.getByText('Date Picker Open')).toBeInTheDocument()
    
    // Click to close
    fireEvent.click(toggleButton)
    expect(screen.queryByText('Date Picker Open')).not.toBeInTheDocument()
  })

  it('should call toggleTask when clicking task toggle button', () => {
    render(<TasksCard />)
    
    const toggleButtons = screen.getAllByText('Toggle')
    
    fireEvent.click(toggleButtons[0])
    expect(mockUseTasks.toggleTask).toHaveBeenCalledWith('1')
    
    fireEvent.click(toggleButtons[1])
    expect(mockUseTasks.toggleTask).toHaveBeenCalledWith('2')
  })

  it('should pass dateRange to DateRangePicker', () => {
    const dateRange = { from: new Date(), to: new Date() }
    vi.mocked(useTasks).mockReturnValue({
      ...mockUseTasks,
      dateRange
    })

    render(<TasksCard />)
    
    expect(screen.getByText('Date Range Selected')).toBeInTheDocument()
  })

  it('should have correct card styling', () => {
    const { container } = render(<TasksCard />)
    
    const card = container.firstChild
    expect(card).toHaveClass(
      'bg-white',
      'rounded-lg',
      'p-6',
      'shadow-sm',
      'border',
      'border-gray-200',
      'relative'
    )
  })

  it('should have correct header layout', () => {
    render(<TasksCard />)
    
    const header = screen.getByText('Suas tarefas').parentElement
    expect(header).toHaveClass('flex', 'items-center', 'justify-between', 'mb-4')
  })

  it('should render tasks in a spaced container', () => {
    render(<TasksCard />)
    
    const tasksContainer = screen.getByTestId('task-1').parentElement
    expect(tasksContainer).toHaveClass('space-y-3')
  })
})
