import { MD5 } from 'crypto-js';
import tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import { build, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';
import { checkPassword, createPassword } from '../../project/password-hasher';

tap.test('Create vote', async (t) => {
  const app = await build(t);
  const testUser = await login(app);
  const testUserAdmin = await login(app, 'testing_admin', 'admin');

  t.test('Without authentication', async (t2) => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/users',
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Required fields', async (t2) => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/users',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {},
    });
    const { message } = response.json();

    t2.ok(message.includes('body should have required property \'username\''));
  });

  t.test('Bad email', async (t2) => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/users',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        email: 'bad-email',
      },
    });
    const { message } = response.json();

    t2.ok(message.includes('body.email should match format "email"'));
  });

  t.test('Min length', async (t2) => {
    const not3chars = 'a';
    const not6chars = 'a';
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: not3chars,
        password: not6chars,
      },
    });
    const { message } = response.json();

    t2.ok(message.includes('body.username should NOT be shorter than 3 characters'));
    t2.ok(message.includes('body.password should NOT be shorter than 6 characters'));
  });

  t.test('Max length', async (t2) => {
    const longerThan50Chars = 'eHWBZccVBKUYNgzmiANRPkDWdJnpWXJLKDwitCFJGTEaHNUHBRV';
    const response = await app.inject({
      method: 'PATCH',
      url: '/users',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        username: longerThan50Chars,
        firstName: longerThan50Chars,
        lastName: longerThan50Chars,
      },
    });
    const { message } = response.json();

    t2.ok(message.includes('body.username should NOT be longer than 50 characters'));
    t2.ok(message.includes('body.firstName should NOT be longer than 50 characters'));
    t2.ok(message.includes('body.lastName should NOT be longer than 50 characters'));
  });

  t.test('Username exists', async (t2) => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/users',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        username: testUserAdmin.user.username,
      },
    });
    const { message } = response.json();

    t2.equal(message, 'Username already exists');
  });

  t.test('Bad current password', async (t2) => {
    const password = 'testing';
    const response = await app.inject({
      method: 'PATCH',
      url: '/users',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        username: testUser.user.username,
        password,
        passwordConfirm: password,
        currentPassword: 'bad-current-password',
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_400_BAD_REQUEST);
    t2.equal(message, 'Invalid password');
  });

  t.test('Success', async (t2) => {
    const username = 'test-edit-user';
    const password = 'testing';
    const salt = 'testing';
    await app.userService.createUser({
      userId: uuidv4(),
      username,
      password: createPassword(password, salt),
      emailHash: '',
      role: 'user',
    });
    const newTestUser = await login(app, username);
    const newPayload = {
      username: 'new-test-edit-user',
      password: 'new-password',
      passwordConfirm: 'new-password',
      currentPassword: password,
      firstName: 'first',
      lastName: 'last',
      email: 'new@email.com',
    };

    const response = await app.inject({
      method: 'PATCH',
      url: '/users',
      headers: {
        authorization: `Bearer ${newTestUser.auth.token}`,
      },
      payload: newPayload,
    });

    t2.equal(response.statusCode, status.HTTP_204_NO_CONTENT);

    const newUser = await app
      .knex('user')
      .where({ username: newPayload.username })
      .first();

    const found = {
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      emailHash: newUser.emailHash,
    };

    const wanted = {
      username: newPayload.username,
      firstName: newPayload.firstName,
      lastName: newPayload.lastName,
      email: newPayload.email,
      emailHash: MD5(newPayload.email).toString(),
    };

    t2.strictSame(found, wanted);
    t2.ok(checkPassword(newPayload.password, newUser.password));
  });
});
