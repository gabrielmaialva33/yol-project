import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {SidebarItem} from './SidebarItem'

describe('SidebarItem', () => {
	const defaultProps = {
		icon: '/test-icon.svg',
		text: 'Test Item',
		isCollapsed: false
	}

	it('renders as button by default', () => {
		render(<SidebarItem {...defaultProps} />)

		const buttonElement = screen.getByRole('button')
		expect(buttonElement).toBeInTheDocument()
		expect(buttonElement).toHaveTextContent('Test Item')
	})

	it('renders as button when asButton is true', () => {
		render(<SidebarItem {...defaultProps} asButton={true} />)

		const buttonElement = screen.getByRole('button')
		expect(buttonElement).toBeInTheDocument()
		expect(buttonElement).toHaveTextContent('Test Item')
	})

	it('renders as div when asButton is false', () => {
		render(<SidebarItem {...defaultProps} asButton={false} />)

		// Should not find a button
		const buttonElement = screen.queryByRole('button')
		expect(buttonElement).not.toBeInTheDocument()

		// Should find the text content in a div
		const textElement = screen.getByText('Test Item')
		expect(textElement).toBeInTheDocument()
	})

	it('renders with active state', () => {
		render(<SidebarItem {...defaultProps} active={true} />)

		const buttonElement = screen.getByRole('button')
		expect(buttonElement).toHaveClass('bg-orange-500', 'text-white')
	})

	it('renders with badge', () => {
		render(<SidebarItem {...defaultProps} badge={5} />)

		const badgeElement = screen.getByText('5')
		expect(badgeElement).toBeInTheDocument()
	})

	it('renders with sub items indicator', () => {
		render(<SidebarItem {...defaultProps} hasSubItems={true} />)

		const dropdownIcon = screen.getByAltText('Dropdown')
		expect(dropdownIcon).toBeInTheDocument()
	})
})
