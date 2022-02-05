import Knex from 'knex';

export default async function teardown() {
  const knex = Knex({
    client: 'pg',
    connection: {
      user: 'product_feedback',
      password: 'product_feedback',
    },
  });

  try {
    // eslint-disable-next-line no-console
    console.log('\nCleaning up test database...\n');
    await knex.raw('drop database if exists test_product_feedback');
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

teardown();
