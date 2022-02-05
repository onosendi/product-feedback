import type { Knex } from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('feedback', (t) => {
  t.uuid('id').primary();
  t.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
  t.string('title', 75).notNullable();
  t.string('slug', 84).notNullable();
  t.string('description', 300).notNullable();
  t.enu('status', ['suggestion', 'planned', 'in-progress', 'live']).notNullable();
  t
    .uuid('user_id')
    .references('id')
    .inTable('user')
    .onDelete('cascade')
    .notNullable();
  t
    .uuid('category_id')
    .references('id')
    .inTable('feedback_category')
    .onDelete('cascade')
    .notNullable();
  t.index('slug');
});

export const down = (knex: Knex) => knex.schema.dropTableIfExists('feedback');
