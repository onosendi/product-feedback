import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

import { createPassword } from '../../src/project/password-hasher';

export async function seed(knex: Knex) {
  await knex('user').del();
  const password = createPassword('testing');

  return knex('user').insert([
    {
      id: uuidv4(),
      username: 'testing',
      first_name: 'First',
      last_name: 'Last',
      password,
      email: 'test@testing.com',
      email_hash: 'eca74378f20815070e1bec3ee81bfabc',
    },
    {
      id: uuidv4(),
      username: 'testing_admin',
      first_name: 'First',
      last_name: 'Last',
      password,
      role: 'admin',
    },
    {
      id: uuidv4(),
      username: 'onosendi',
      first_name: 'Daniel',
      last_name: 'Lindegren',
      password,
      role: 'admin',
    },
    {
      id: uuidv4(),
      username: 'jim',
      first_name: 'Jim',
      last_name: 'Brown',
      password,
    },
    {
      id: uuidv4(),
      username: 'mike',
      first_name: 'Mike',
      last_name: 'Fowler',
      password,
    },
    {
      id: uuidv4(),
      username: 'tammy',
      first_name: 'Tammy',
      last_name: 'Higgins',
      password,
    },
    {
      id: uuidv4(),
      username: 'april',
      first_name: 'April',
      last_name: 'Frazier',
      password,
    },
  ]);
}
