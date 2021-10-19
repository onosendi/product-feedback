import Knex from 'knex';
import config from '../config';
import getKnexConfig from '../knexfile';

const teardown = async () => {
  const knexConfig = getKnexConfig({ includeDatabaseName: false });
  const knex = Knex(knexConfig);

  try {
    await knex.raw(`drop database if exists ${config.DB_NAME}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exit(1);
  } finally {
    await knex.destroy();
  }
};

export default teardown;
