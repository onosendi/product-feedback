import tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import { build, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';
import makeSlug from '../../project/make-slug';

tap.test('Delete feedback', async (t) => {
  const app = await build(t);
  const testUser = await login(app);
  const testAdminUser = await login(app, 'testing_admin', 'admin');

  t.test('No authorization', async (t2) => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/feedback/bad-param',
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Feedback ID not uuid', async (t2) => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/feedback/bad-param',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });
    const { message } = response.json();

    t2.equal(message, 'params.feedbackId should match format "uuid"');
  });

  t.test('Bad feedback ID', async (t2) => {
    const badFeedbackId = uuidv4();
    const response = await app.inject({
      method: 'DELETE',
      url: `/feedback/${badFeedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_404_NOT_FOUND);
    t2.equal(message, 'Record not found');
  });

  t.test('Must be owner', async (t2) => {
    const { id: categoryId } = await app.feedbackService.getCategory('ui');
    const feedbackId = uuidv4();
    await app.feedbackService.createFeedback({
      categoryId,
      description: 'testing',
      feedbackId,
      slug: makeSlug('testing'),
      status: 'suggestion',
      title: 'testing',
      userId: testAdminUser.user.id,
    });
    const response = await app.inject({
      method: 'DELETE',
      url: `/feedback/${feedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_403_FORBIDDEN);
    t2.equal(message, 'Insufficient privileges');
  });

  t.test('Admin bypasses must be owner', async (t2) => {
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
      method: 'DELETE',
      url: `/feedback/${feedbackId}`,
      headers: {
        authorization: `Bearer ${testAdminUser.auth.token}`,
      },
    });

    t2.equal(response.statusCode, status.HTTP_204_NO_CONTENT);
  });

  t.test('Response code', async (t2) => {
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
      method: 'DELETE',
      url: `/feedback/${feedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
    });

    t2.equal(response.statusCode, status.HTTP_204_NO_CONTENT);
  });
});
