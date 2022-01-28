import type { DBUser } from '@t/database';
import faker from 'faker';
import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex) {
  await knex('feedback_comment').del();

  const users = await knex('user').select('id', 'username');
  const onosendi = users.find((u: DBUser) => u.username === 'onosendi');
  const jim = users.find((u: DBUser) => u.username === 'jim');
  const mike = users.find((u: DBUser) => u.username === 'mike');
  const april = users.find((u: DBUser) => u.username === 'april');

  const [first, second] = await knex('feedback');

  const commentId1 = uuidv4();

  return knex('feedback_comment').insert([
    // Comment 1
    {
      id: commentId1,
      content: faker.lorem.sentence(),
      user_id: onosendi.id,
      feedback_id: first.id,
    },
    {
      id: uuidv4(),
      content: faker.lorem.sentence(),
      user_id: jim.id,
      feedback_id: first.id,
      feedback_comment_parent_id: commentId1,
    },
    {
      id: uuidv4(),
      content: faker.lorem.sentence(),
      user_id: april.id,
      feedback_id: first.id,
      feedback_comment_parent_id: commentId1,
    },

    {
      id: uuidv4(),
      content: faker.lorem.sentence(),
      user_id: mike.id,
      feedback_id: first.id,
    },

    {
      id: uuidv4(),
      content: faker.lorem.sentence(),
      user_id: mike.id,
      feedback_id: second.id,
    },
  ]);
}
