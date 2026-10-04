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

test('wrong password shows error', async ({ page }) => {
  await page.goto(url);
  await page.getByTestId('username').fill('tester');
  await page.getByTestId('password').fill('wrong-password');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('message')).toHaveText('Invalid username or password.');
  await expect(page.getByTestId('welcome-view')).toBeHidden();
});

test('empty fields show required messages', async ({ page }) => {
  await page.goto(url);
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('username-error')).toHaveText('Username is required.');
  await expect(page.getByTestId('password-error')).toHaveText('Password is required.');
});

test('logout returns to the login form', async ({ page }) => {
  await page.goto(url);
  await page.getByTestId('username').fill('tester');
  await page.getByTestId('password').fill('Test@1234');
  await page.getByTestId('login-button').click();
  await page.getByTestId('logout-button').click();

  await expect(page.getByTestId('login-view')).toBeVisible();
  await expect(page.getByTestId('username')).toHaveValue('');
});
