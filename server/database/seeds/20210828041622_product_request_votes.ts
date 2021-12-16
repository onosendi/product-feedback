import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex) {
  await knex('suggestion_vote').del();

  const users = await knex('user').select('id', 'username');
  const onosendi = users.find((u) => u.username === 'onosendi');
  const jim = users.find((u) => u.username === 'jim');

  const [first, , third] = await knex('suggestion').select('id');

  return knex('suggestion_vote').insert([
    {
      id: uuidv4(),
      user_id: onosendi.id,
      suggestion_id: first.id,
    },
    {
      id: uuidv4(),
      user_id: jim.id,
      suggestion_id: first.id,
    },
    {
      id: uuidv4(),
      user_id: jim.id,
      suggestion_id: third.id,
    },
  ]);
}
