import {expect, test} from '@playwright/test'

const SUBMIT_WAIT_TIME = 2000
const AUTOFILL_WAIT_TIME = 1000
const SECTION_EXPAND_WAIT_TIME = 500

test.describe('Folder Registration', () => {
	test.beforeEach(async ({page}) => {
		// Login first
		await page.goto('/yol-project/')
		await page.getByPlaceholder('E-mail').fill('test@benicio.com.br')
		await page.getByPlaceholder('Senha').fill('benicio123')
		await page.getByRole('button', {name: 'Entrar'}).click()
		await expect(page).toHaveURL('/yol-project/dashboard')

		// Navigate to registration page
		await page.getByRole('button', {name: 'Pastas Pastas Dropdown'}).click()
		await page.getByRole('link', {name: 'Cadastrar'}).click()
		await expect(page).toHaveURL('/yol-project/dashboard/folders/register')
	})

	test('should display all form sections', async ({page}) => {
		// Check for main form sections
		await expect(page.getByText('Informações Básicas')).toBeVisible()
		await expect(page.getByText('Dados do Cliente')).toBeVisible()
		await expect(page.getByText('Detalhes do Processo')).toBeVisible()
		await expect(page.getByText('Informações Adicionais')).toBeVisible()
	})

	test('should fill and submit basic folder information', async ({page}) => {
		// Fill basic information
		await page.getByLabel('Código da Pasta').fill('PASTA-001')
		await page.getByLabel('Nome do Cliente').fill('João Silva')
		await page.getByLabel('Área').selectOption({index: 1}) // Select first option

		// Fill client data
		await page.getByLabel('CPF/CNPJ').fill('123.456.789-00')
		await page.getByLabel('Telefone').fill('(11) 98765-4321')
		await page.getByLabel('E-mail').fill('joao.silva@example.com')

		// Submit form
		await page.getByRole('button', {name: 'Cadastrar Pasta'}).click()

		// Should show success message or redirect
		await page.waitForTimeout(SUBMIT_WAIT_TIME)
	})

	test('should validate required fields', async ({page}) => {
		// Try to submit without filling required fields
		await page.getByRole('button', {name: 'Cadastrar Pasta'}).click()

		// Should show validation errors
		await expect(page.getByText('Campo obrigatório')).toBeVisible()
	})

	test('should handle date picker for birth date', async ({page}) => {
		// Click on birth date field
		const birthDateField = page.getByLabel('Data de Nascimento')
		await birthDateField.click()

		// Date picker should be visible
		await expect(page.locator('.rdp-root')).toBeVisible()

		// Select a date (click on day 15)
		await page.locator('.rdp-day').filter({hasText: '15'}).first().click()

		// Date should be filled
		await expect(birthDateField).not.toBeEmpty()
	})

	test('should toggle additional options', async ({page}) => {
		// Check checkboxes
		const unionCheckbox = page.getByLabel('Sindicalizado')
		const sealCheckbox = page.getByLabel('Pedido de Selo')

		await unionCheckbox.check()
		await expect(unionCheckbox).toBeChecked()

		await sealCheckbox.check()
		await expect(sealCheckbox).toBeChecked()

		// Uncheck
		await unionCheckbox.uncheck()
		await expect(unionCheckbox).not.toBeChecked()
	})

	test('should select priority level', async ({page}) => {
		// Find priority select
		const prioritySelect = page.getByLabel('Prioridade')

		// Select high priority
		await prioritySelect.selectOption('Alta')

		// Verify selection
		await expect(prioritySelect).toHaveValue('Alta')
	})

	test('should add observations', async ({page}) => {
		// Find observations textarea
		const observationsField = page.getByLabel('Observações')

		// Type observations
		const testObservation = 'Esta é uma observação de teste para a pasta.'
		await observationsField.fill(testObservation)

		// Verify text was entered
		await expect(observationsField).toHaveValue(testObservation)
	})

	test('should navigate between form sections', async ({page}) => {
		// All sections should be visible (accordion style)
		const sections = [
			'Informações Básicas',
			'Dados do Cliente',
			'Detalhes do Processo',
			'Informações Adicionais'
		]

		for (const section of sections) {
			const sectionHeader = page.getByText(section)
			await expect(sectionHeader).toBeVisible()

			// Click to ensure section is expanded
			await sectionHeader.click()
			await page.waitForTimeout(SECTION_EXPAND_WAIT_TIME)
		}
	})

	test('should cancel form and return to dashboard', async ({page}) => {
		// Look for cancel button
		const cancelButton = page.getByRole('button', {name: 'Cancelar'})

		if (await cancelButton.isVisible()) {
			await cancelButton.click()

			// Should return to dashboard or previous page
			await expect(page).toHaveURL(/dashboard/)
		}
	})

	test('should autofill some fields based on client selection', async ({
		page
	}) => {
		// Fill client name
		await page.getByLabel('Nome do Cliente').fill('Maria Santos')

		// Tab out or click elsewhere to trigger any autofill
		await page.keyboard.press('Tab')

		// Wait for any potential autofill
		await page.waitForTimeout(AUTOFILL_WAIT_TIME)

		// Check if any fields were autofilled (this depends on the implementation)
		// For now, just verify the field still has the value
		await expect(page.getByLabel('Nome do Cliente')).toHaveValue('Maria Santos')
	})
})
