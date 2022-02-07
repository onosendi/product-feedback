import tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import { build, createFeedback, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('Auth user plugin', async (t) => {
  const app = await build(t);
  const testUser = await login(app);

  t.test('No auth header', async (t2) => {
    const feedback = await createFeedback(app, testUser.user);
    const response = await app.inject({
      method: 'POST',
      url: `/votes/${feedback.id}`,
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Invalid user ID', async (t2) => {
    const badFeedbackId = uuidv4();
    const badUserId = uuidv4();
    const tokenWithBadUserId = app.jwt.sign({ userId: badUserId });
    const response = await app.inject({
      method: 'DELETE',
      url: `/votes/${badFeedbackId}`,
      headers: {
        authorization: `Bearer ${tokenWithBadUserId}`,
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_400_BAD_REQUEST);
    t2.equal(message, 'Invalid user ID');
  });

  t.test('Valid ID', async (t2) => {
    const feedback = await createFeedback(app, testUser.user);
    const response = await app.inject({
      method: 'POST',
      url: `/votes/${feedback.id}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });

    t2.equal(response.statusCode, status.HTTP_201_CREATED);
  });
});
