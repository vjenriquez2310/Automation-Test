# Automation-Test

Self-taught Playwright (TypeScript) practice project for web UI test automation.

## What's inside
- `HTML/login.html`: a simple practice login page with `data-testid` attributes
- `tests/login.spec.ts`: Playwright tests for the login flow

## Test cases
- Valid login shows the welcome screen
- Wrong password shows an error and blocks access
- Empty fields show required-field messages
- Logout returns to the login form

## How to run
npm install
npx playwright install
npx playwright test --headed

Tools: Playwright, TypeScript, VS Code
