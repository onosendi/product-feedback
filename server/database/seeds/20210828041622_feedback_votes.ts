import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex) {
  await knex('feedback_vote').del();

  const users = await knex('user').select('id', 'username');
  const onosendi = users.find((u) => u.username === 'onosendi');
  const jim = users.find((u) => u.username === 'jim');
  const mike = users.find((u) => u.username === 'mike');
  const tammy = users.find((u) => u.username === 'tammy');

  const [first, , third] = await knex('feedback').select('id');

  return knex('feedback_vote').insert([
    {
      id: uuidv4(),
      user_id: onosendi.id,
      feedback_id: first.id,
    },
    {
      id: uuidv4(),
      user_id: jim.id,
      feedback_id: third.id,
    },
    {
      id: uuidv4(),
      user_id: mike.id,
      feedback_id: third.id,
    },
    {
      id: uuidv4(),
      user_id: tammy.id,
      feedback_id: third.id,
    },
  ]);
}
