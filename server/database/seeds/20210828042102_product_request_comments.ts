import type { DBUser } from '@t/database';
import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex) {
  await knex('suggestion_comment').del();

  const users = await knex('user').select('id', 'username');
  const onosendi = users.find((u: DBUser) => u.username === 'onosendi');
  const jim = users.find((u: DBUser) => u.username === 'jim');
  const mike = users.find((u: DBUser) => u.username === 'mike');
  const april = users.find((u: DBUser) => u.username === 'april');

  const productRequest = await knex('suggestion').select('id').first();

  const commentId1 = uuidv4();
  const commentId2 = uuidv4();

  return knex('suggestion_comment').insert([
    // Comment 1
    {
      id: commentId1,
      content: 'Comment 1',
      user_id: onosendi.id,
      suggestion_id: productRequest.id,
    },
    // Comment 1 reply 1
    {
      id: uuidv4(),
      content: 'Comment 1 reply 1',
      user_id: jim.id,
      suggestion_id: productRequest.id,
      suggestion_comment_parent_id: commentId1,
    },
    // Comment 1 reply 2
    {
      id: uuidv4(),
      content: 'Comment 1 reply 2',
      user_id: april.id,
      suggestion_id: productRequest.id,
      suggestion_comment_parent_id: commentId1,
    },

    // Comment 2
    {
      id: commentId2,
      content: 'Comment 2',
      user_id: jim.id,
      suggestion_id: productRequest.id,
    },
    // Comment 2 reply 1
    {
      id: uuidv4(),
      content: 'Comment 2 reply 1',
      user_id: april.id,
      suggestion_id: productRequest.id,
      suggestion_comment_parent_id: commentId2,
    },
    // Comment 2 reply 2
    {
      id: uuidv4(),
      content: 'Comment 2 reply 2',
      user_id: onosendi.id,
      suggestion_id: productRequest.id,
      suggestion_comment_parent_id: commentId2,
    },

    // Comment 4
    {
      id: uuidv4(),
      content: 'Comment 3',
      user_id: mike.id,
      suggestion_id: productRequest.id,
    },
  ]);
}
