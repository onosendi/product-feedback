import { v4 as uuidv4 } from 'uuid';

export const seed = async (knex) => {
  await knex('product_request_comment').del();

  const users = await knex('user').select('id', 'username');
  const onosendi = users.find((u) => u.username === 'onosendi');
  const jim = users.find((u) => u.username === 'jim');
  const mike = users.find((u) => u.username === 'mike');
  const april = users.find((u) => u.username === 'april');

  const productRequest = await knex('product_request').select('id').first();

  const commentId1 = uuidv4();
  const commentId2 = uuidv4();

  return knex('product_request_comment').insert([
    // Comment 1
    {
      id: commentId1,
      content: 'Comment 1',
      user_id: onosendi.id,
      product_request_id: productRequest.id,
    },
    // Comment 1 reply 1
    {
      id: uuidv4(),
      content: 'Comment 1 reply 1',
      user_id: jim.id,
      product_request_id: productRequest.id,
      product_request_comment_parent_id: commentId1,
    },
    // Comment 1 reply 2
    {
      id: uuidv4(),
      content: 'Comment 1 reply 2',
      user_id: april.id,
      product_request_id: productRequest.id,
      product_request_comment_parent_id: commentId1,
    },

    // Comment 2
    {
      id: commentId2,
      content: 'Comment 2',
      user_id: jim.id,
      product_request_id: productRequest.id,
    },
    // Comment 2 reply 1
    {
      id: uuidv4(),
      content: 'Comment 2 reply 1',
      user_id: april.id,
      product_request_id: productRequest.id,
      product_request_comment_parent_id: commentId2,
    },
    // Comment 2 reply 2
    {
      id: uuidv4(),
      content: 'Comment 2 reply 2',
      user_id: onosendi.id,
      product_request_id: productRequest.id,
      product_request_comment_parent_id: commentId2,
    },

    // Comment 4
    {
      id: uuidv4(),
      content: 'Comment 3',
      user_id: mike.id,
      product_request_id: productRequest.id,
    },
  ]);
};
