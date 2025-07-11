import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {FolderPageLayout} from './FolderPageLayout'

describe('FolderPageLayout', () => {
	it('should render children with correct styling', () => {
		const testContent = 'Test Content'

		render(
			<FolderPageLayout>
				<div>{testContent}</div>
			</FolderPageLayout>
		)

		expect(screen.getByText(testContent)).toBeInTheDocument()
	})

	it('should apply correct classes to container', () => {
		const {container} = render(
			<FolderPageLayout>
				<div>Content</div>
			</FolderPageLayout>
		)

		const layoutDiv = container.firstChild
		expect(layoutDiv).toHaveClass('p-6')
	})

	it('should render multiple children', () => {
		render(
			<FolderPageLayout>
				<div>First Child</div>
				<div>Second Child</div>
				<div>Third Child</div>
			</FolderPageLayout>
		)

		expect(screen.getByText('First Child')).toBeInTheDocument()
		expect(screen.getByText('Second Child')).toBeInTheDocument()
		expect(screen.getByText('Third Child')).toBeInTheDocument()
	})
})
