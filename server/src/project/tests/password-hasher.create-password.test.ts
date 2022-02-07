import tap from 'tap';
import { createPassword } from '../password-hasher';

tap.test('Create password', async (t) => {
  t.test('With given salt', async (t2) => {
    const encoded = createPassword('testing', 'testing');

    t2.equal(encoded, 'testing$2cd9e7344c2a3eb5b7853f3aade3b3c2c0004f40efca202da5ca386d270b8f4c68731ec08bf12e7419f3fbefad3559d9130d0189d189c2547f543d69502a185e');
  });
});
