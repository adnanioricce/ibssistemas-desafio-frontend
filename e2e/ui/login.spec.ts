import { test, expect } from '@playwright/test';

test('success login shouldnt show "Senha incorreta, tente novamente"', async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByRole('link', { name: 'Pessoal' }).click()
  await page.getByLabel('Username').fill('admin')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Login' }).click()
  expect(page.getByText('Senha incorreta, tente novamente')).not.toBeVisible()
});
test('invalid credentials on login should show "Senha incorreta, tente novamente"', async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByRole('link', { name: 'Pessoal' }).click()
    await page.getByLabel('Username').fill('admin')
    await page.getByLabel('Password').fill('password')
    await page.getByRole('button', { name: 'Login' }).click()
    expect(page.getByText('Senha incorreta, tente novamente')).toBeVisible()
});