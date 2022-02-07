import tap from 'tap';
import { checkPassword, createPassword } from '../password-hasher';

tap.test('Check password', async (t) => {
  t.test('With given encoded', async (t2) => {
    const encoded = createPassword('testing', 'testing');
    const ok = checkPassword('testing', encoded);

    t2.ok(ok);
  });

  t.test('Without given encoded', async (t2) => {
    const ok = checkPassword('testing');

    t2.notOk(ok);
  });
});
