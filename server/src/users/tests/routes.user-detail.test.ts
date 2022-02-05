import tap from 'tap';
import { build, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('Create vote', async (t) => {
  const app = await build(t);
  const testUser = await login(app);

  t.test('Username exists', async (t2) => {
    const userThatExists = 'testing';
    const response = await app.inject({
      method: 'GET',
      url: `/users/${userThatExists}`,
    });

    t2.equal(response.statusCode, status.HTTP_204_NO_CONTENT);
  });

  t.test('Username does not exists', async (t2) => {
    const userThatDoesNotExist = 'al239';
    const response = await app.inject({
      method: 'GET',
      url: `/users/${userThatDoesNotExist}`,
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_404_NOT_FOUND);
    t2.equal(message, 'Record not found');
  });

  t.test('User is user detail response', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: `/users/${testUser.user.username}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });
    const payload = response.json();

    const wanted = {
      createdAt: testUser.user.createdAt.toJSON(),
      email: testUser.user.email,
      emailHash: testUser.user.emailHash,
      firstName: testUser.user.firstName,
      id: testUser.user.id,
      lastLogin: payload.lastLogin,
      lastName: testUser.user.lastName,
      role: testUser.user.role,
      username: testUser.user.username,
    };

    t2.equal(response.statusCode, status.HTTP_200_OK);
    t2.strictSame(payload, wanted);
  });
});
