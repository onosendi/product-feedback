export const up = (knex) => knex.schema.createTable('user', (t) => {
  t.uuid('id').primary();
  t.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
  t.datetime('last_login');
  t.specificType('username', 'citext').notNullable().unique();
  t.string('password', 161).notNullable();
  t.string('first_name', 50);
  t.string('last_name', 50);
  t.string('picture');
  t.enu('role', ['user', 'admin']).defaultTo('user');
});

export const down = (knex) => knex.schema.dropTableIfExists('user');
