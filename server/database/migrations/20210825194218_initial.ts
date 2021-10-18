import { Knex } from 'knex';

export const up = (knex: Knex) => (
  knex.schema.raw('create extension if not exists citext with schema public'));

export const down = (knex: Knex) => knex.schema.raw('drop extension if exists citext');
