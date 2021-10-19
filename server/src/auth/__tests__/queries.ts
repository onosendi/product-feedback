import { v4 as uuidv4 } from 'uuid';
import knex from '../../lib/knex';
import { getUserByUsername } from '../queries';

test('Test getUserByUsername', async () => {
  await knex('user').insert({
    id: uuidv4(),
    username: 'testuser',
    password: 'incorrect-password-format',
  });
  const user = await getUserByUsername('testuser');
  console.log(user);
});
