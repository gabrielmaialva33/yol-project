import {expect, test} from '@playwright/test'

test('fills the login form and submits it', async ({page}) => {
	await page.goto('/')

	await page.getByPlaceholder('E-mail').fill('test@benicio.com.br')
	await page.getByPlaceholder('Senha').fill('benicio123')

	await page.getByRole('button', {name: 'Entrar'}).click()

	await expect(page).toHaveURL('/dashboard')
})
