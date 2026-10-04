import { test, expect } from '@playwright/test';

// Practice API (fake, free). Writes are simulated and not really saved.
const BASE = 'https://jsonplaceholder.typicode.com';

// ---------------------------------------------------------------
// HTTP methods (GET, POST, PUT, PATCH, DELETE)
// ---------------------------------------------------------------
test.describe('HTTP methods', () => {
  test('GET a single user', async ({ request }) => {
    const response = await request.get(`${BASE}/users/1`);
    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.email).toContain('@');
  });

  test('POST creates a post (201)', async ({ request }) => {
    const response = await request.post(`${BASE}/posts`, {
      data: { title: 'QA test', body: 'hello', userId: 1 },
    });
    expect(response.status()).toBe(201); // 201 Created, not 200

    const created = await response.json();
    expect(created.title).toBe('QA test');
    expect(created.id).toBeTruthy();
  });

  test('PUT replaces the whole post', async ({ request }) => {
    const response = await request.put(`${BASE}/posts/1`, {
      data: { id: 1, title: 'new title', body: 'new body', userId: 1 },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ title: 'new title', body: 'new body' });
  });

  test('PATCH updates only the title', async ({ request }) => {
    const response = await request.patch(`${BASE}/posts/1`, {
      data: { title: 'patched title' },
    });
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post.title).toBe('patched title');
    expect(post.userId).toBe(1); // other fields stay
  });

  test('DELETE removes the post', async ({ request }) => {
    const response = await request.delete(`${BASE}/posts/1`);
    expect([200, 204]).toContain(response.status());
    // Note: on a real API, a GET after DELETE should return 404.
    // This practice API is fake, so it would still return 200.
  });
});

// ---------------------------------------------------------------
// Request options (query params)
// ---------------------------------------------------------------
test.describe('Query params', () => {
  test('filter posts by userId', async ({ request }) => {
    const response = await request.get(`${BASE}/posts`, { params: { userId: 1 } });
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.userId).toBe(1);
    }
  });
});

// ---------------------------------------------------------------
// Response validation (status, headers, body, structure)
// ---------------------------------------------------------------
test.describe('Response validation', () => {
  test('list users: status, header, and length', async ({ request }) => {
    const response = await request.get(`${BASE}/users`);
    await expect(response).toBeOK();
    expect(response.headers()['content-type']).toContain('application/json');

    const users = await response.json();
    expect(users).toHaveLength(10);
  });

  test('user 1 has expected values (toMatchObject)', async ({ request }) => {
    const user = await (await request.get(`${BASE}/users/1`)).json();
    expect(user).toMatchObject({ id: 1, username: 'Bret' });
  });

  test('user profile fields exist (soft assertions)', async ({ request }) => {
    const user = await (await request.get(`${BASE}/users/1`)).json();
    // Soft: the test keeps going and reports every failed field together
    expect.soft(user.name).toBeTruthy();
    expect.soft(user.email).toMatch(/@/);
    expect.soft(user.phone).toBeTruthy();
    expect.soft(user.address.city).toBeTruthy();
  });

  test('user response has the right structure and types', async ({ request }) => {
    const user = await (await request.get(`${BASE}/users/1`)).json();
    expect(user).toHaveProperty('address.geo.lat');
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
  });
});

// ---------------------------------------------------------------
// Negative tests (test the errors on purpose)
// ---------------------------------------------------------------
test.describe('Negative cases', () => {
  test('unknown user returns 404', async ({ request }) => {
    const response = await request.get(`${BASE}/users/99999`);
    expect(response.status()).toBe(404);
  });

  test('unknown post returns 404', async ({ request }) => {
    const response = await request.get(`${BASE}/posts/99999`);
    expect(response.status()).toBe(404);
  });
});
