import {render, screen} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import {BillingCard} from './BillingCard'

// Mock recharts to avoid rendering issues in tests
vi.mock('recharts', () => ({
	ResponsiveContainer: ({children}: {children: React.ReactNode}) => (
		<div data-testid='responsive-container'>{children}</div>
	),
	LineChart: ({
		children,
		data
	}: {
		children: React.ReactNode
		data: unknown[]
	}) => (
		<div data-length={data?.length} data-testid='line-chart'>
			{children}
		</div>
	),
	Line: () => <div data-testid='line' />
}))

// Mock billing data
vi.mock('../../../../mocks/data/billing', () => ({
	billingData: {
		value: 'R$10,000.00',
		percentage: 12.5,
		chart: [
			{name: 'Jan', uv: 2000, pv: 2400, amt: 2400},
			{name: 'Feb', uv: 3000, pv: 1398, amt: 2210},
			{name: 'Mar', uv: 2000, pv: 9800, amt: 2290}
		]
	}
}))

describe('BillingCard', () => {
	it('should render billing card with title', () => {
		render(<BillingCard />)

		expect(screen.getByText('Faturamento')).toBeInTheDocument()
	})

	it('should render billing value', () => {
		render(<BillingCard />)

		expect(screen.getByText('R$10,000.00')).toBeInTheDocument()
	})

	it('should render positive percentage with green color and up icon', () => {
		render(<BillingCard />)

		const percentage = screen.getByText('12.50%')
		expect(percentage).toBeInTheDocument()

		// Check for green color class
		const percentageContainer = percentage.parentElement
		expect(percentageContainer).toHaveClass('text-green-500')

		// Check for up icon
		expect(screen.getByTitle('Up')).toBeInTheDocument()
	})

	it('should render last month label', () => {
		render(<BillingCard />)

		expect(screen.getByText('Último mês')).toBeInTheDocument()
	})

	it('should render chart components', () => {
		render(<BillingCard />)

		expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
		expect(screen.getByTestId('line-chart')).toBeInTheDocument()
		expect(screen.getByTestId('line')).toBeInTheDocument()
	})

	it('should pass correct data to line chart', () => {
		render(<BillingCard />)

		const lineChart = screen.getByTestId('line-chart')
		expect(lineChart).toHaveAttribute('data-length', '3')
	})

	it('should have correct card styling', () => {
		const {container} = render(<BillingCard />)

		const card = container.firstChild
		expect(card).toHaveClass(
			'bg-[#E6F8F3]',
			'text-[#004B50]',
			'rounded-lg',
			'p-6'
		)
	})
})
