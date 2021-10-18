import { Knex } from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('product_request_category', (t) => {
  t.uuid('id').primary();
  t.enu('category', ['feature', 'ui', 'ux', 'enhancement', 'bug']).notNullable();
  t.enu('display', ['Feature', 'UI', 'UX', 'Enhancement', 'Bug']).notNullable();
});

export const down = (knex: Knex) => knex.schema.dropTableIfExists('product_request_category');
