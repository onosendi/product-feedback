import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

import { createPassword } from '../../src/project/passwordHasher';

export async function seed(knex: Knex) {
  await knex('user').del();
  const password = createPassword('testing');

  return knex('user').insert([
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
