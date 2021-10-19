import knex from 'knex';

const { env } = process;
const testDatabaseName = `test_${env.DB_NAME}`;

const teardown = async () => {
  const db = knex({
    client: 'pg',
    connection: {
      password: env.DB_PASSWORD,
      user: env.DB_USER,
    },
  });

  try {
    await db.raw(`drop database if exists ${testDatabaseName}`);
    process.exit();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exit(1);
  }
};

export default teardown;
