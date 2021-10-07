export const up = (knex) => (
  knex.schema.raw('create extension if not exists citext with schema public'));

export const down = (knex) => knex.schema.raw('drop extension if exists citext');
