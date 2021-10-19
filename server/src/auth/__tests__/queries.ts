import { v4 as uuidv4 } from 'uuid';
import knex from '../../lib/knex';
import { getUserByUsername } from '../queries';

afterAll(() => {
  knex.destroy();
});

test('Get user by username', async () => {
  const userId = uuidv4();
  await knex('user').insert({
    id: userId,
    username: 'testuser',
    password: 'testing',
  });
  const user = await getUserByUsername('testuser');
  expect(user.id).toBe(userId);
});
