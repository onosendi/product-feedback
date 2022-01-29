import tap from 'tap';
import { build } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('Create vote', async (t) => {
  const app = await build(t);

  t.test('Required fields', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {},
    });
    const { message } = response.json();

    t2.ok(message.includes('body should have required property \'password\''));
    t2.ok(message.includes('body should have required property \'passwordConfirm\''));
    t2.ok(message.includes('body should have required property \'username\''));
  });

  t.test('Username min-length', async (t2) => {
    const not3chars = 'a';
    const password = 'testing';
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: not3chars,
        password,
        passwordConfirm: password,
      },
    });
    const { message } = response.json();

    t2.equal(message, 'body.username should NOT be shorter than 3 characters');
  });

  t.test('Username max-length', async (t2) => {
    const moreThan50Chars = 'JkXkWENacmgcZucTFHBFKuLJkBZNLWAFcLbuUWEPaqzbmcwpeRt';
    const password = 'testing';
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: moreThan50Chars,
        password,
        passwordConfirm: password,
      },
    });
    const { message } = response.json();

    t2.equal(message, 'body.username should NOT be longer than 50 characters');
  });

  t.test('Password min-length', async (t2) => {
    const not6Chars = 'test';
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: 'new-test-user',
        password: not6Chars,
        passwordConfirm: not6Chars,
      },
    });
    const { message } = response.json();

    t2.equal(message, 'body.password should NOT be shorter than 6 characters');
  });

  t.test('Username exists', async (t2) => {
    const userThatExists = 'testing';
    const password = 'testing';
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: userThatExists,
        password,
        passwordConfirm: password,
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_400_BAD_REQUEST);
    t2.equal(message, 'Username already exists');
  });

  t.test('Username created, last login, and response', async (t2) => {
    const username = 'new-user';
    const password = 'testing';
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username,
        password,
        passwordConfirm: password,
      },
    });
    const payload = response.json();

    const newUser = await app.userService.getUser({ username });

    const wanted = {
      role: newUser.role,
      token: payload.token,
      userId: newUser.id,
      username,
      emailHash: newUser.emailHash,
    };

    t2.equal(response.statusCode, status.HTTP_201_CREATED);
    t2.ok(newUser.lastLogin);
    t2.strictSame(payload, wanted);
  });
});
