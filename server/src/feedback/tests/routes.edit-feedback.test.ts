import tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import { build, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';
import makeSlug from '../../project/make-slug';

tap.test('Edit feedback', async (t) => {
  const app = await build(t);
  const testUser = await login(app);
  const testAdminUser = await login(app, 'testing_admin', 'admin');

  t.test('No authorization', async (t2) => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/feedback/bad-param',
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Required fields', async (t2) => {
    const badId = uuidv4();
    const response = await app.inject({
      method: 'PATCH',
      url: `/feedback/${badId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {},
    });
    const { message } = response.json();

    t2.ok(message.includes('body should have required property \'category\''));
    t2.ok(message.includes('body should have required property \'description\''));
    t2.ok(message.includes('body should have required property \'title\''));
  });

  t.test('Min length', async (t2) => {
    const badId = uuidv4();
    const stringTooShort = 'a';
    const response = await app.inject({
      method: 'PATCH',
      url: `/feedback/${badId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        title: stringTooShort,
      },
    });
    const { message } = response.json();

    t2.ok(message.includes('body.title should NOT be shorter than 5 characters'));
  });

  t.test('Max length', async (t2) => {
    const badId = uuidv4();
    const stringTooLong = 'CCHWemSiZdQZdibCcXbnAGJxbUzNMxvEWqrNfyvFDVvzyYMxvcwAGmnFRZQBFnvqNPSmDTrEGZKbFnJteJZATQuPAvHxqETFcLmgQhCzkigEuwWMmQNLhfhnPzNpPBWXPwfnwMkjaZDDHAuLVfpMZVvRuirQEazAWeXgUkNcbpdVUxvLYSgZWTbCAJPUXTupgFjvDVWinkCeBUTMtxSQBRaPCEwvUQHcaCfSPtNQuPkQyLJDqBcubDmnQCuufQnBrfqSZcAZZrRNPzQXtumSzqKavGxJgiBvgTVAiQHYaYyYp';
    const response = await app.inject({
      method: 'PATCH',
      url: `/feedback/${badId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        description: stringTooLong,
        title: stringTooLong,
      },
    });
    const { message } = response.json();

    t2.ok(message.includes('body.description should NOT be longer than 300 characters'));
    t2.ok(message.includes('body.title should NOT be longer than 75 characters'));
  });

  t.test('Bad category and status', async (t2) => {
    const badId = uuidv4();
    const response = await app.inject({
      method: 'PATCH',
      url: `/feedback/${badId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        category: 'bad-category',
        status: 'bad-status',
      },
    });
    const { message } = response.json();

    t2.ok(message.includes('body.category should be equal to one of the allowed values'));
    t2.ok(message.includes('body.status should be equal to one of the allowed values'));
  });

  t.test('Admin can only modify status', async (t2) => {
    const badId = uuidv4();
    const response = await app.inject({
      method: 'PATCH',
      url: `/feedback/${badId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        category: 'ui',
        description: 'testing',
        status: 'live',
        title: 'testing',
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_403_FORBIDDEN);
    t2.equal(message, 'Insufficient privileges');
  });

  t.test('Feedback ID does not exist', async (t2) => {
    const badId = uuidv4();
    const response = await app.inject({
      method: 'PATCH',
      url: `/feedback/${badId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        category: 'ui',
        description: 'testing',
        status: 'suggestion',
        title: 'testing',
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
      method: 'PATCH',
      url: `/feedback/${feedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        category: 'ui',
        description: 'testing',
        status: 'suggestion',
        title: 'testing',
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_403_FORBIDDEN);
    t2.equal(message, 'Insufficient privileges');
  });

  t.test('Normal users cannot modify unless it is a suggestion', async (t2) => {
    const { id: categoryId } = await app.feedbackService.getCategory('ui');
    const feedbackId = uuidv4();
    await app.feedbackService.createFeedback({
      categoryId,
      description: 'testing',
      feedbackId,
      slug: makeSlug('testing'),
      status: 'live',
      title: 'testing',
      userId: testUser.user.id,
    });
    const response = await app.inject({
      method: 'PATCH',
      url: `/feedback/${feedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        category: 'ui',
        description: 'testing',
        status: 'suggestion',
        title: 'testing',
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
      method: 'PATCH',
      url: `/feedback/${feedbackId}`,
      headers: {
        authorization: `Bearer ${testAdminUser.auth.token}`,
      },
      payload: {
        category: 'ui',
        description: 'testing',
        status: 'suggestion',
        title: 'testing',
      },
    });

    t2.equal(response.statusCode, status.HTTP_204_NO_CONTENT);
  });

  t.test('Success', async (t2) => {
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
      method: 'PATCH',
      url: `/feedback/${feedbackId}`,
      headers: {
        authorization: `Bearer ${testAdminUser.auth.token}`,
      },
      payload: {
        category: 'ux',
        description: 'new-testing',
        status: 'live',
        title: 'new-testing',
      },
    });

    const { slug } = await app.knex('feedback').where({ id: feedbackId }).first();
    const feedback = await app.feedbackService.getFeedbackDetail({
      slug,
      userId: testAdminUser.auth.userId,
    });

    const found = {
      category: feedback.category,
      description: feedback.description,
      status: feedback.status,
      title: feedback.title,
    };

    const wanted = {
      category: 'UX',
      description: 'new-testing',
      status: 'live',
      title: feedback.title,
    };

    t2.equal(response.statusCode, status.HTTP_204_NO_CONTENT);
    t2.strictSame(found, wanted);
  });
});
