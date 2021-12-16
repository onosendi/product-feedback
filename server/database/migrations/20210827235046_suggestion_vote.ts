import { Knex } from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('suggestion_vote', (t) => {
  t.uuid('id').primary();
  t.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
  t
    .uuid('user_id')
    .references('id')
    .inTable('user')
    .onDelete('cascade')
    .notNullable();
  t
    .uuid('suggestion_id')
    .references('id')
    .inTable('suggestion')
    .onDelete('cascade')
    .notNullable();
  t.unique(['user_id', 'suggestion_id']);
});

export const down = (knex: Knex) => knex.schema.dropTableIfExists('suggestion_vote');
