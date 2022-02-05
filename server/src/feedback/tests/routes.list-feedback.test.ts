import type { FeedbackResponse } from '@t/response';
import tap from 'tap';
import { build } from '../../../tests/utils';
import status from '../../project/http-status-codes';

function isInOrder(array: number[], order: 'asc' | 'desc') {
  const infinity = order === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  const boolArray = array.reduce((acc: boolean[], curr, index, arr) => {
    const next = arr[index + 1] || infinity;
    return [...acc, order === 'asc' ? curr <= next : curr >= next];
  }, []);

  return boolArray.every((b) => b);
}

tap.test('List feedback', async (t) => {
  const app = await build(t);

  t.test('Invalid category, sort, and status', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?sort=bad-sort&category=bad-category&status=bad-status',
    });
    const { message } = response.json();

    t2.ok(message.includes('querystring.category[0] should be equal to one of the allowed values'));
    t2.ok(message.includes('querystring.sort should be equal to one of the allowed values'));
    t2.ok(message.includes('querystring.status[0] should be equal to one of the allowed values'));
  });

  t.test('Status code', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback',
    });

    t2.equal(response.statusCode, status.HTTP_200_OK);
  });

  t.test('Category: feature', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?category=feature',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.category === 'Feature');

    t2.ok(ok);
  });

  t.test('Category: ui', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?category=ui',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.category === 'UI');

    t2.ok(ok);
  });

  t.test('Category: ux', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?category=ux',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.category === 'UX');

    t2.ok(ok);
  });

  t.test('Category: bug', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?category=bug',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.category === 'Bug');

    t2.ok(ok);
  });

  t.test('Category: enhancement', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?category=enhancement',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.category === 'Enhancement');

    t2.ok(ok);
  });

  t.test('Status: suggestion', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?status=suggestion',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.status === 'suggestion');

    t2.ok(ok);
  });

  t.test('Status: planned', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?status=planned',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.status === 'planned');

    t2.ok(ok);
  });

  t.test('Status: in-progress', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?status=in-progress',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.status === 'in-progress');

    t2.ok(ok);
  });

  t.test('Status: live', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?status=live',
    });
    const payload = response.json();

    const ok = payload.every((row: FeedbackResponse) => row.status === 'live');

    t2.ok(ok);
  });

  t.test('Sort: votes', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?sort=votes&order=desc',
    });
    const payload = response.json();
    const votes = payload.map((row: FeedbackResponse) => row.votes);

    const ok = isInOrder(votes, 'desc');

    t2.ok(ok);
  });

  t.test('Sort: comment_count', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?sort=comment_count&order=desc',
    });
    const payload = response.json();
    const commentCount = payload.map((row: FeedbackResponse) => row.commentCount);

    const ok = isInOrder(commentCount, 'desc');

    t2.ok(ok);
  });

  t.test('Order: asc', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?sort=votes&order=asc',
    });
    const payload = response.json();
    const votes = payload.map((row: FeedbackResponse) => row.votes);

    const ok = isInOrder(votes, 'asc');

    t2.ok(ok);
  });

  t.test('Order: desc', async (t2) => {
    const response = await app.inject({
      method: 'GET',
      url: '/feedback?sort=votes&order=desc',
    });
    const payload = response.json();
    const votes = payload.map((row: FeedbackResponse) => row.votes);

    const ok = isInOrder(votes, 'desc');

    t2.ok(ok);
  });
});
