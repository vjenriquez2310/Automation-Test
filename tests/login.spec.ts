import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

const url = pathToFileURL(path.resolve('HTML', 'login.html')).href;

test('valid login', async ({ page }) => {
  await page.goto(url);
  await page.getByTestId('username').fill('tester');
  await page.getByTestId('password').fill('Test@1234');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('welcome-text')).toHaveText('Welcome, tester');
});