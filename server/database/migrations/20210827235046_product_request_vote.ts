import { Knex } from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('product_request_vote', (t) => {
  t.uuid('id').primary();
  t.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
  t
    .uuid('user_id')
    .references('id')
    .inTable('user')
    .onDelete('cascade')
    .notNullable();
  t
    .uuid('product_request_id')
    .references('id')
    .inTable('product_request')
    .onDelete('cascade')
    .notNullable();
  t.unique(['user_id', 'product_request_id']);
});

export const down = (knex: Knex) => knex.schema.dropTableIfExists('product_request_vote');
