import tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import { build, createFeedback, login } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('List comments', async (t) => {
  const app = await build(t);
  const testUser = await login(app);

  t.test('No feedback ID', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/comments',
    });
    const { message } = response.json();

    t2.equal(message, 'querystring should have required property \'feedback_id\'');
  });

  t.test('Bad feedback uuid', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/comments?feedback_id=bad-id',
    });
    const { message } = response.json();

    t2.equal(message, 'querystring.feedback_id should match format "uuid"');
  });

  t.test('Feedback ID does not exist', async (t2) => {
    const badFeedbackId = uuidv4();
    const response = await app.inject({
      method: 'GET',
      url: `/comments?feedback_id=${badFeedbackId}`,
    });
    const { message } = response.json();

    t2.equal(response.statusCode, status.HTTP_404_NOT_FOUND);
    t2.equal(message, 'Record not found');
  });

  t.test('List comments response', async (t2) => {
    const feedback = await createFeedback(app, testUser.user);

    const content = 'testing';

    const commentId = uuidv4();
    await app.commentService.createComment({
      commentId,
      content,
      userId: testUser.user.id,
      feedbackId: feedback.id,
    });

    const replyId = uuidv4();
    await app.commentService.createComment({
      commentId: replyId,
      content,
      userId: testUser.user.id,
      feedbackId: feedback.id,
      feedbackCommentParentId: commentId,
    });

    const response = await app.inject({
      method: 'GET',
      url: `/comments?feedback_id=${feedback.id}`,
    });
    const payload = response.json();

    const wanted = [
      {
        content,
        emailHash: testUser.user.emailHash,
        feedbackCommentParentId: '',
        feedbackId: feedback.id,
        firstName: testUser.user.firstName,
        id: commentId,
        lastName: testUser.user.lastName,
        replies: [
          {
            content,
            emailHash: testUser.user.emailHash,
            feedbackCommentParentId: commentId,
            feedbackId: feedback.id,
            firstName: testUser.user.firstName,
            id: replyId,
            lastName: testUser.user.lastName,
            username: testUser.user.username,
          },
        ],
        username: testUser.user.username,
      },
    ];

    t2.equal(response.statusCode, status.HTTP_200_OK);
    t2.strictSame(payload, wanted);
  });
});
