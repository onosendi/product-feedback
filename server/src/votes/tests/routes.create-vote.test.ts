import tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import { build, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';
import makeSlug from '../../project/make-slug';

tap.test('Create vote', async (t) => {
  const app = await build(t);
  const testUser = await login(app);

  t.test('Without authentication', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/votes/bad-param',
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Params: feedback ID not uuid', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/votes/bad-uuid',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });
    const { message } = response.json();

    t2.equal(message, 'params.feedbackId should match format "uuid"');
  });

  t.test('Feedback ID does not exist', async (t2) => {
    const badFeedbackId = uuidv4();
    const response = await app.inject({
      method: 'POST',
      url: `/votes/${badFeedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_404_NOT_FOUND);
    t2.equal(message, 'Record not found');
  });

  t.test('Vote success', async (t2) => {
    const { id: categoryId } = await app.feedbackService.getCategory('ui');
    const feedbackId = uuidv4();
    await app.feedbackService.createFeedback({
      categoryId,
      description: 'testing',
      feedbackId,
      slug: makeSlug('testing'),
      status: 'suggestion',
      title: 'testing',
      userId: testUser.user.id,
    });

    const response = await app.inject({
      method: 'POST',
      url: `/votes/${feedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });

    const vote = await app.knex('feedback_vote').where({
      user_id: testUser.user.id,
      feedback_id: feedbackId,
    }).first();

    t2.equal(response.statusCode, status.HTTP_201_CREATED);
    t2.ok(vote);
  });
});
