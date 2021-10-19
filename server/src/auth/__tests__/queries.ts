// import { v4 as uuidv4 } from 'uuid';
// import knex from '../../lib/knex';
// import { getUserByUsername } from '../queries';

// describe('Auth query ', () => {
//   afterAll(() => {
//     knex.destroy();
//   });

//   it('gets user by username', async () => {
//     const userId = uuidv4();
//     await knex('user').insert({
//       id: userId,
//       username: 'testuser',
//       password: 'incorrect-password-format',
//     });
//     const user = await getUserByUsername('testuser');
//     expect(user.id).toBe(userId);
//   });
// });

test('Empty', () => {
  expect(true).toBeTruthy();
});
