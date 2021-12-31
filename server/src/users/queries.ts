import type { Knex } from 'knex';

export function getUserById(knex: Knex, userId: string) {
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
    .where({ id: userId })
    .first();
}

export function updateLastLogin(knex: Knex, userId: string) {
  return knex('user')
    .where({ id: userId })
    .update({ last_login: new Date() });
}
