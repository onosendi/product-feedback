import tap from 'tap';
import { build, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('Create feedback', async (t) => {
  const app = await build(t);
  const testUser = await login(app);

  t.test('No authorization', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/feedback',
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Required fields', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/feedback',
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
    const stringTooShort = 'a';
    const response = await app.inject({
      method: 'POST',
      url: '/feedback',
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
    const stringTooLong = 'CCHWemSiZdQZdibCcXbnAGJxbUzNMxvEWqrNfyvFDVvzyYMxvcwAGmnFRZQBFnvqNPSmDTrEGZKbFnJteJZATQuPAvHxqETFcLmgQhCzkigEuwWMmQNLhfhnPzNpPBWXPwfnwMkjaZDDHAuLVfpMZVvRuirQEazAWeXgUkNcbpdVUxvLYSgZWTbCAJPUXTupgFjvDVWinkCeBUTMtxSQBRaPCEwvUQHcaCfSPtNQuPkQyLJDqBcubDmnQCuufQnBrfqSZcAZZrRNPzQXtumSzqKavGxJgiBvgTVAiQHYaYyYp';
    const response = await app.inject({
      method: 'POST',
      url: '/feedback',
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
    const response = await app.inject({
      method: 'POST',
      url: '/feedback',
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
    const response = await app.inject({
      method: 'POST',
      url: '/feedback',
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

  t.test('Success response without status given', async (t2) => {
    const title = 'test-create-feedback-2342';
    const response = await app.inject({
      method: 'POST',
      url: '/feedback',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        category: 'ui',
        description: 'testing',
        status: undefined,
        title,
      },
    });

    t2.equal(response.statusCode, status.HTTP_201_CREATED);
  });

  t.test('Success response and vote', async (t2) => {
    const title = 'test-create-feedback-2342';
    const response = await app.inject({
      method: 'POST',
      url: '/feedback',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        category: 'ui',
        description: 'testing',
        status: 'suggestion',
        title,
      },
    });

    const { id: feedbackId } = await app.knex('feedback').where({ title }).first();
    const vote = await app.knex('feedback_vote').where({
      user_id: testUser.user.id,
      feedback_id: feedbackId,
    }).first();

    t2.equal(response.statusCode, status.HTTP_201_CREATED);
    t2.ok(vote);
  });
});
