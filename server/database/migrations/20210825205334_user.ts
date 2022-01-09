import type { Knex } from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('user', (t) => {
  t.uuid('id').primary();
  t.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
  t.datetime('last_login');
  t.specificType('username', 'citext').notNullable().unique();
  t.string('password', 161).notNullable();
  t.string('first_name', 50);
  t.string('last_name', 50);
  t.enu('role', ['user', 'admin']).defaultTo('user');
  t.string('email', 254);
  t.string('email_hash', 32);
});

export const down = (knex: Knex) => knex.schema.dropTableIfExists('user');
