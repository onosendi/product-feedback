import tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import { build, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('Create comment', async (t) => {
  const app = await build(t);
  const testUser = await login(app);

  t.test('Without authentication', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/comments',
    });

    t2.equal(response.statusCode, status.HTTP_401_UNAUTHORIZED);
  });

  t.test('Query string: no feedback_id', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/comments',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        content: 'Test comment',
      },
    });
    const { message } = response.json();

    t2.equal(message, 'querystring should have required property \'feedback_id\'');
  });

  t.test('Querystring.feedback_id/parent_id not uuid', async (t2) => {
    const response = await app.inject({
      method: 'POST',
      url: '/comments?feedback_id=not-uuid&parent_id=not-uuid',
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        content: 'Test comment',
      },
    });
    const { message } = response.json();

    t2.ok(message.includes('querystring.feedback_id should match format "uuid"'));
    t2.ok(message.includes('querystring.parent_id should match format "uuid"'));
  });

  t.test('Body: required fields', async (t2) => {
    const uuid = uuidv4();
    const response = await app.inject({
      method: 'POST',
      url: `/comments?feedback_id=${uuid}&parent_id=${uuid}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {},
    });
    const { message } = response.json();

    t2.ok(message.includes('body should have required property \'content\''));
  });

  t.test('Body.content: max length', async (t2) => {
    const uuid = uuidv4();
    const response = await app.inject({
      method: 'POST',
      url: `/comments?feedback_id=${uuid}&parent_id=${uuid}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        content: 'ThNiPQzmqQxhpEEnephwmzgLuedNQUCtfRUGzpDqYXfFAnGRHgFbbKDqpdRNDBzSnAhiaQzJnGFhqdgtbNGLrredTgYPuTNGbkHTYeFtjretQCdmyrwaWepiDBuzqdkgVDqVbaUdwXGgkMTekZKuLxjixvQCKykjEAJHxEcUakuBfwjrncSWGrUvxmLbYkUWRQLYmkTdtCMmaqvaNiNzqyhHMqGyhzySeAzqDawMqpLZkmbZQjVLDVPwZLWKrGpr',
      },
    });
    const { message } = response.json();

    t2.ok(message.includes('body.content should NOT be longer than 255 characters'));
  });

  t.test('Bad feedback_id', async (t2) => {
    const badFeedbackId = uuidv4();
    const response = await app.inject({
      method: 'POST',
      url: `/comments?feedback_id=${badFeedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        content: 'testing',
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_404_NOT_FOUND);
    t2.equal(message, 'Record not found');
  });

  t.test('Bad parent_id', async (t2) => {
    const { id: feedbackId } = await app.knex('feedback').first();
    const badParentId = uuidv4();
    const response = await app.inject({
      method: 'POST',
      url: `/comments?feedback_id=${feedbackId}&parent_id=${badParentId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        content: 'testing',
      },
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_404_NOT_FOUND);
    t2.equal(message, 'Record not found');
  });

  t.test('Comment created and response', async (t2) => {
    const { id: feedbackId } = await app.knex('feedback').first();
    const content = 'testing-create-comment';
    const response = await app.inject({
      method: 'POST',
      url: `/comments?feedback_id=${feedbackId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        content,
      },
    });
    const payload = response.json();
    const comment = await app.knex('feedback_comment').where({ content }).first();
    const wanted = {
      content,
      emailHash: testUser.user.emailHash,
      feedbackCommentParentId: null,
      feedbackId,
      firstName: testUser.user.firstName,
      id: comment.id,
      lastName: testUser.user.lastName,
      username: testUser.user.username,
    };

    t2.equal(response.statusCode, status.HTTP_201_CREATED);
    t2.strictSame(payload, wanted);
  });

  t.test('Reply created and response', async (t2) => {
    const { id: feedbackId } = await app.knex('feedback').first();
    const { id: parentId } = await app.knex('feedback_comment').first();
    const content = 'testing-create-reply';
    const response = await app.inject({
      method: 'POST',
      url: `/comments?feedback_id=${feedbackId}&parent_id=${parentId}`,
      headers: {
        authorization: `Bearer ${testUser.auth.token}`,
      },
      payload: {
        content,
      },
    });
    const payload = response.json();
    const comment = await app.knex('feedback_comment').where({ content }).first();
    const wanted = {
      content,
      emailHash: testUser.user.emailHash,
      feedbackCommentParentId: parentId,
      feedbackId,
      firstName: testUser.user.firstName,
      id: comment.id,
      lastName: testUser.user.lastName,
      username: testUser.user.username,
    };

    t2.equal(response.statusCode, status.HTTP_201_CREATED);
    t2.strictSame(payload, wanted);
  });
});
