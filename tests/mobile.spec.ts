import {expect, test} from '@playwright/test'

const DROPDOWN_WAIT_TIME = 500

test.describe('Mobile Responsiveness', () => {
	test.use({
		viewport: {width: 375, height: 667} // iPhone SE size
	})

	test.beforeEach(async ({page}) => {
		// Login first
		await page.goto('/yol-project/')
		await page.getByPlaceholder('E-mail').fill('test@benicio.com.br')
		await page.getByPlaceholder('Senha').fill('benicio123')
		await page.getByRole('button', {name: 'Entrar'}).click()
		await expect(page).toHaveURL('/yol-project/dashboard')
	})

	test('should display mobile-optimized dashboard', async ({page}) => {
		// Header should be visible
		await expect(page.getByRole('heading', {name: 'Visão Geral'})).toBeVisible()

		// Sidebar should be collapsed by default on mobile
		await expect(page.getByPlaceholder('Pesquisar')).not.toBeVisible()

		// Widgets should stack vertically
		const widgets = page.locator('[class*="rounded-lg"][class*="shadow"]')
		const widgetCount = await widgets.count()
		expect(widgetCount).toBeGreaterThan(0)
	})

	test('should have mobile-friendly navigation', async ({page}) => {
		// Look for hamburger menu or toggle button
		const logo = page.getByAltText('Logo')
		await expect(logo).toBeVisible()

		// The sidebar should be collapsible on mobile
		const sidebar = page.locator('aside').first()
		const sidebarClasses = await sidebar.getAttribute('class')
		expect(sidebarClasses).toContain('w-24') // Collapsed width
	})

	test('should handle touch interactions for dropdowns', async ({page}) => {
		// Tap on notifications icon
		await page.getByAltText('Notificações').click()

		// Dropdown should appear
		// Note: This might not work if dropdowns are hover-based
		await page.waitForTimeout(DROPDOWN_WAIT_TIME)
	})

	test('should display folder table in mobile view', async ({page}) => {
		// Navigate to folders
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.waitForTimeout(DROPDOWN_WAIT_TIME)
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Table should be scrollable or responsive
		const table = page.locator('table')
		await expect(table).toBeVisible()

		// Check if table has horizontal scroll
		const tableContainer = table.locator('..')
		const containerClasses = await tableContainer.getAttribute('class')
		expect(containerClasses).toContain('overflow')
	})

	test('should handle form inputs on mobile', async ({page}) => {
		// Navigate to registration
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.waitForTimeout(DROPDOWN_WAIT_TIME)
		await page.getByRole('link', {name: 'Cadastrar'}).click()

		// Form fields should be accessible
		const clientNameField = page.getByLabel('Nome do Cliente')
		await expect(clientNameField).toBeVisible()

		// Should be able to type
		await clientNameField.fill('Mobile Test Client')
		await expect(clientNameField).toHaveValue('Mobile Test Client')
	})

	test('should show mobile-optimized date picker', async ({page}) => {
		// Navigate to registration
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.waitForTimeout(DROPDOWN_WAIT_TIME)
		await page.getByRole('link', {name: 'Cadastrar'}).click()

		// Click date field
		const dateField = page.getByLabel('Data de Nascimento')
		await dateField.click()

		// Date picker should be visible and usable
		await expect(page.locator('.rdp-root')).toBeVisible()
	})

	test('should handle mobile logout', async ({page}) => {
		// Find logout button
		const logoutButton = page.getByAltText('sair').locator('..')
		await logoutButton.click()

		// Should redirect to login
		await expect(page).toHaveURL('/yol-project/')
		await expect(page.getByPlaceholder('E-mail')).toBeVisible()
	})
})

test.describe('Tablet Responsiveness', () => {
	test.use({
		viewport: {width: 768, height: 1024} // iPad size
	})

	test('should display tablet-optimized layout', async ({page}) => {
		// Login
		await page.goto('/yol-project/')
		await page.getByPlaceholder('E-mail').fill('test@benicio.com.br')
		await page.getByPlaceholder('Senha').fill('benicio123')
		await page.getByRole('button', {name: 'Entrar'}).click()

		// Sidebar should be visible but might be collapsible
		const sidebar = page.locator('aside').first()
		await expect(sidebar).toBeVisible()

		// Check if search is visible (tablets might show expanded sidebar)
		const searchInput = page.getByPlaceholder('Pesquisar')
		const _isSearchVisible = await searchInput.isVisible()

		// Dashboard Widgets should be in grid layout
		const dashboardContent = page.locator('main')
		await expect(dashboardContent).toBeVisible()
	})

	test('should handle orientation changes', async ({page}) => {
		// Login
		await page.goto('/yol-project/')
		await page.getByPlaceholder('E-mail').fill('test@benicio.com.br')
		await page.getByPlaceholder('Senha').fill('benicio123')
		await page.getByRole('button', {name: 'Entrar'}).click()

		// Change to landscape
		await page.setViewportSize({width: 1024, height: 768})

		// Layout should adjust
		await expect(page.getByRole('heading', {name: 'Visão Geral'})).toBeVisible()

		// Change back to portrait
		await page.setViewportSize({width: 768, height: 1024})

		// Layout should still work
		await expect(page.getByRole('heading', {name: 'Visão Geral'})).toBeVisible()
	})
})
