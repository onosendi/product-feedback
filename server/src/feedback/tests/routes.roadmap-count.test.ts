import tap from 'tap';
import { build } from '../../../tests/utils';
import status from '../../project/http-status-codes';

tap.test('Delete feedback', async (t) => {
  const app = await build(t);

  t.test('Response', async (t2) => {
    const roadmapCount = await app.feedbackService.getRoadmapCount();
    const response = await app.inject({
      method: 'GET',
      url: '/feedback/roadmap-count',
    });
    const payload = response.json();

    const wanted = Object.entries(roadmapCount).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: Number(value) }),
      {},
    );

    t2.equal(response.statusCode, status.HTTP_200_OK);
    t2.strictSame(payload, wanted);
  });
});
