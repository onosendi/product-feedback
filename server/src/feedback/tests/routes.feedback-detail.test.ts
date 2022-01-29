import tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import { build, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';
import makeSlug from '../../project/make-slug';

tap.test('List feedback', async (t) => {
  const app = await build(t);
  const testUser = await login(app);

  t.test('Bad slug', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback/bad-slug',
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_404_NOT_FOUND);
    t2.equal(message, 'Record not found');
  });

  t.test('Response', async (t2) => {
    const { id: categoryId } = await app.feedbackService.getCategory('ui');
    const feedbackId = uuidv4();
    const title = 'testing';
    const slug = makeSlug('testing');
    const description = 'testing';
    const feedbackStatus = 'suggestion';
    await app.feedbackService.createFeedback({
      categoryId,
      description,
      feedbackId,
      slug,
      status: feedbackStatus,
      title,
      userId: testUser.user.id,
    });
    await app.voteService.createVote({
      voteId: uuidv4(),
      userId: testUser.user.id,
      feedbackId,
    });
    await app.commentService.createComment({
      commentId: uuidv4(),
      content: 'testing',
      feedbackId,
      userId: testUser.user.id,
    });

    const response = await app.inject({
      method: 'GET',
      url: `/feedback/${slug}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });
    const payload = response.json();

    const wanted = {
      category: 'UI',
      commentCount: 1,
      description,
      hasVoted: true,
      id: feedbackId,
      slug,
      status: feedbackStatus,
      title,
      userId: testUser.user.id,
      votes: 1,
    };

    t2.equal(response.statusCode, status.HTTP_200_OK);
    t2.strictSame(payload, wanted);
  });
});
