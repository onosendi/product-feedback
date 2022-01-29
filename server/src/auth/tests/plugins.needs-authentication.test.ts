import tap from 'tap';
import { build, createFeedback, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('Route needs authentication', async (t) => {
  const app = await build(t);
  const testUser = await login(app);

  t.test('Without authentication', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/votes/bad-param',
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Success', async (t2) => {
    const feedback = await createFeedback(app, testUser.user);
    const response = await app.inject({
      method: 'POST',
      url: `/votes/${feedback.id}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });

    const vote = await app.knex('feedback_vote').where({
      user_id: testUser.user.id,
      feedback_id: feedback.id,
    }).first();

    t2.equal(response.statusCode, status.HTTP_201_CREATED);
    t2.ok(vote);
  });
});
