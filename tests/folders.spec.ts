import {expect, test} from '@playwright/test'

const FILTER_WAIT_TIME = 1000

test.describe('Folders Management', () => {
	test.beforeEach(async ({page}) => {
		// Login first
		await page.goto('/yol-project/')
		await page.getByPlaceholder('E-mail').fill('test@benicio.com.br')
		await page.getByPlaceholder('Senha').fill('benicio123')
		await page.getByRole('button', {name: 'Entrar'}).click()
		await expect(page).toHaveURL('/yol-project/dashboard')
	})

	test('should navigate to folders consultation page', async ({page}) => {
		// Click on Pastas in sidebar to expand dropdown
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()

		// Click on Consulta submenu
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Should navigate to consultation page
		await expect(page).toHaveURL('/yol-project/dashboard/folders/consultation')
		await expect(
			page.getByRole('heading', {name: 'Consulta de pastas'})
		).toBeVisible()
	})

	test('should navigate to folders registration page', async ({page}) => {
		// Click on Pastas in sidebar to expand dropdown
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()

		// Click on Cadastrar submenu
		await page.getByRole('link', {name: 'Cadastrar'}).click()

		// Should navigate to registration page
		await expect(page).toHaveURL('/yol-project/dashboard/folders/register')
	})

	test('should display folder consultation filters', async ({page}) => {
		// Navigate to consultation page
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Check for filter elements
		await expect(
			page.getByPlaceholder('Buscar por nome do cliente')
		).toBeVisible()
		await expect(page.getByText('Selecione um período')).toBeVisible()
		await expect(page.getByRole('button', {name: 'Buscar'})).toBeVisible()
		await expect(
			page.getByRole('button', {name: 'Limpar filtros'})
		).toBeVisible()
	})

	test('should display folder table with data', async ({page}) => {
		// Navigate to consultation page
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Wait for table to load
		await page.waitForSelector('table')

		// Check table headers
		await expect(page.getByRole('columnheader', {name: 'Pasta'})).toBeVisible()
		await expect(
			page.getByRole('columnheader', {name: 'Cliente'})
		).toBeVisible()
		await expect(page.getByRole('columnheader', {name: 'Área'})).toBeVisible()
		await expect(page.getByRole('columnheader', {name: 'Status'})).toBeVisible()

		// Should have at least one row of data
		const tableRows = page.locator('tbody tr')
		await expect(tableRows).toHaveCount(10) // Default pagination is 10 items
	})

	test('should navigate to folder detail page', async ({page}) => {
		// Navigate to consultation page
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Wait for table to load
		await page.waitForSelector('table')

		// Click on first folder row
		const firstRow = page.locator('tbody tr').first()
		await firstRow.click()

		// Should navigate to detail page
		await expect(page.url()).toContain('/folders/')

		// Check detail page elements
		await expect(page.getByText(/Pasta #\d+/)).toBeVisible()
		await expect(page.getByRole('button', {name: 'Salvar'})).toBeVisible()
		await expect(
			page.getByRole('button', {name: 'Adicionar arquivos'})
		).toBeVisible()
	})

	test('should show folder timeline in detail page', async ({page}) => {
		// Navigate to consultation page
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Click on first folder
		await page.waitForSelector('table')
		await page.locator('tbody tr').first().click()

		// Check for timeline
		await expect(page.getByText('Linha do Tempo')).toBeVisible()

		// Should have timeline items
		const timelineItems = page.locator('[class*="timeline"]').locator('> div')
		await expect(timelineItems.first()).toBeVisible()
	})

	test('should paginate through folders', async ({page}) => {
		// Navigate to consultation page
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Wait for table and pagination
		await page.waitForSelector('table')

		// Check pagination controls
		await expect(page.getByText(/Página \d+ de \d+/)).toBeVisible()

		// Click next page if available
		const nextButton = page.getByRole('button', {name: 'Próxima página'})
		const isNextEnabled = await nextButton.isEnabled()

		if (isNextEnabled) {
			await nextButton.click()
			// Check that page number changed
			await expect(page.getByText(/Página 2/)).toBeVisible()
		}
	})

	test('should filter folders by client name', async ({page}) => {
		// Navigate to consultation page
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Type in search field
		const searchInput = page.getByPlaceholder('Buscar por nome do cliente')
		await searchInput.fill('João')

		// Click search button
		await page.getByRole('button', {name: 'Buscar'}).click()

		// Wait for filtered results
		await page.waitForTimeout(FILTER_WAIT_TIME)

		// Table should still be visible (even if no results)
		await expect(page.locator('table')).toBeVisible()
	})

	test('should clear filters', async ({page}) => {
		// Navigate to consultation page
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.getByRole('link', {name: 'Consulta'}).click()

		// Apply a filter
		await page.getByPlaceholder('Buscar por nome do cliente').fill('Test')
		await page.getByRole('button', {name: 'Buscar'}).click()

		// Clear filters
		await page.getByRole('button', {name: 'Limpar filtros'}).click()

		// Search input should be empty
		await expect(
			page.getByPlaceholder('Buscar por nome do cliente')
		).toHaveValue('')
	})
})
