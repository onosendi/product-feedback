import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex) {
  await knex('product_request_category').del();

  return knex('product_request_category').insert([
    { id: uuidv4(), category: 'feature', display: 'Feature' },
    { id: uuidv4(), category: 'ui', display: 'UI' },
    { id: uuidv4(), category: 'ux', display: 'UX' },
    { id: uuidv4(), category: 'enhancement', display: 'Enhancement' },
    { id: uuidv4(), category: 'bug', display: 'Bug' },
  ]);
}
