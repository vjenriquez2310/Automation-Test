# Automation-Test

A self-taught Playwright (TypeScript) practice project covering **web UI tests** and **API tests**.

I work as a manual QA tester (4+ years, e-commerce and government systems) and I am building my test automation skills on my own. This project has not been used in a work setting.

## What's inside

```
Automation-Test/
├── HTML/
│   └── login.html          # Simple practice login page with data-testid attributes
├── tests/
│   ├── login.spec.ts       # UI tests for the login and logout flow
│   └── api.spec.ts         # API tests against a free practice API
├── package.json
├── package-lock.json
└── tsconfig.json
```

## UI tests (`login.spec.ts`)

Run against `HTML/login.html`. Demo credentials: `tester` / `Test@1234`.

| Test | What it checks |
|---|---|
| Valid login | The welcome screen is shown |
| Wrong password | An error message is shown and the user is not logged in |
| Empty fields | Both "required" messages are shown |
| Logout | The login form returns and the username field is cleared |

Elements are located with `data-testid` attributes (for example `page.getByTestId('login-button')`), which stay stable when the page design changes.

## API tests (`api.spec.ts`)

Run against [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free fake API. Writes are simulated and not saved.

| Area | What it checks |
|---|---|
| HTTP methods | GET, POST (201), PUT, PATCH, DELETE |
| Query params | Filtering posts by `userId` |
| Response validation | Status code, content-type header, list length, `toMatchObject`, soft assertions, structure and types |
| Negative cases | 404 for a user and a post that do not exist |

Note: because JSONPlaceholder is fake, the "GET after DELETE returns 404" check is not possible here. On a real API it should be tested.

## How to run

```bash
npm install
npx playwright install
npx playwright test            # run all tests
npx playwright test --headed   # watch the browser while tests run
npx playwright test api.spec.ts
npx playwright show-report     # open the HTML report
```

## What I'm learning

- Choosing stable locators (`data-testid`, labels, roles)
- Asserting the exact status code and the response body, not just "200 OK"
- Writing negative tests, not only happy paths
- Debugging failures by reading Expected vs Received

## Tools

Playwright, TypeScript, VS Code, Node.js

## Next steps

- JSON schema validation for API responses
- More login edge cases (wrong username, case sensitivity, Enter key)
- A payment-style form with input validation tests
- Run the tests automatically with GitHub Actions
