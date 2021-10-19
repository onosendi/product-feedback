import knex from '../lib/knex';

export const getUserByUsername = (username: string) => knex('user')
  .select('id')
  .where({ username })
  .first();
