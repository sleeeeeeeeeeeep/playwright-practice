import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('success', async ({ page }) => {
  const username: string = 'standard_user'
  const password: string = 'secret_sauce'

  await login(page, username, password)
  
  await expect(page).toHaveURL(/inventory.html/);
});

test('not match username', async ({ page }) => {
  const username: string = 'standard_use'
  const password: string = 'secret_sauce'

  await login(page, username, password)
  
  const errorLocator = page.locator('.error-message-container h3')

  await expect(errorLocator).toHaveText('Epic sadface: Username and password do not match any user in this service')
});

test('not match password', async ({ page }) => {
  const username: string = 'standard_user'
  const password: string = 'secret_sauc'

  await login(page, username, password)
  
  const errorLocator = page.locator('.error-message-container h3')

  await expect(errorLocator).toHaveText('Epic sadface: Username and password do not match any user in this service')
});

test('login locked user', async ({ page }) => {
  const username: string = 'locked_out_user'
  const password: string = 'secret_sauce'

  await login(page, username, password)
  
  const errorLocator = page.locator('.error-message-container h3')

  await expect(errorLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.')
});

test('not input username', async ({ page }) => {
  const username: string = ''
  const password: string = 'secret_sauce'

  await login(page, username, password)
  
  const errorLocator = page.locator('.error-message-container h3')

  await expect(errorLocator).toHaveText('Epic sadface: Username is required')
});

test('not input password', async ({ page }) => {
  const username: string = 'standard_user'
  const password: string = ''

  await login(page, username, password)
  
  const errorLocator = page.locator('.error-message-container h3')

  await expect(errorLocator).toHaveText('Epic sadface: Password is required')
});

test('not input username and password', async ({ page }) => {
  const username: string = ''
  const password: string = ''

  await login(page, username, password)
  
  const errorLocator = page.locator('.error-message-container h3')

  await expect(errorLocator).toHaveText('Epic sadface: Username is required')
});

async function login(page: Page, username: string, password: string) {
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}