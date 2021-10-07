export const up = (knex) => knex.schema.createTable('product_request_comment', (t) => {
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
    .uuid('product_request_id')
    .references('id')
    .inTable('product_request')
    .onDelete('cascade')
    .notNullable();
  t
    .uuid('product_request_comment_parent_id')
    .references('id')
    .inTable('product_request_comment')
    .onDelete('cascade');
});

export const down = (knex) => knex.schema.dropTableIfExists('product_request_comment');
