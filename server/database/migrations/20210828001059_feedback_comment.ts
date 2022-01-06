import type { Knex } from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('feedback_comment', (t) => {
  t.uuid('id').primary();
  t.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
  t.string('content', 255).notNullable();
  t
    .uuid('user_id')
    .references('id')
    .inTable('user')
    .onDelete('cascade')
    .notNullable();
  t
    .uuid('feedback_id')
    .references('id')
    .inTable('feedback')
    .onDelete('cascade')
    .notNullable();
  t
    .uuid('feedback_comment_parent_id')
    .references('id')
    .inTable('feedback_comment')
    .onDelete('cascade');
});

export const down = (knex: Knex) => knex.schema.dropTableIfExists('feedback_comment');
