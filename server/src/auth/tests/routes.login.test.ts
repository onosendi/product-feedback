import tap from 'tap';
import { build } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('Login', async (t) => {
  const app = await build(t);

  t.test('Body: required fields', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: 'auth/login',
      payload: {},
    });
    const { message } = response.json();

    t2.ok(message.includes('body should have required property \'password\''));
    t2.ok(message.includes('body should have required property \'username\''));
  });

  t.test('Correct username/password', async (t2) => {
    const username = 'testing';
    const response = await app.inject({
      method: 'POST',
      url: 'auth/login',
      payload: {
        username,
        password: 'testing',
      },
    });
    const payload = response.json();

    const testUser = await app.userService.getUser({ username });
    const wanted = {
      role: testUser.role,
      token: payload.token,
      userId: testUser.id,
      username,
      emailHash: testUser.emailHash,
    };

    t2.equal(response.statusCode, status.HTTP_200_OK, response.payload);
    t2.strictSame(payload, wanted);
  });

  t.test('Incorrect password', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: 'auth/login',
      payload: {
        username: 'testing',
        password: 'bad password',
      },
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Incorrect username', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: 'auth/login',
      payload: {
        username: 'bad-username',
        password: 'testing',
      },
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });
});
