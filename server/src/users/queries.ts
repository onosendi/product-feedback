import type { Knex } from 'knex';

export function getUserById(knex: Knex, id: string) {
  return knex('user')
    .select(
      'created_at',
      'first_name',
      'id',
      'last_login',
      'last_name',
      'picture',
      'role',
      'username',
    )
    .where({ id })
    .first();
}
