import knex from '../lib/db';

export const getUserByUsername = (username: string) => knex('user')
  .select('id', 'password')
  .where({ username })
  .first();
