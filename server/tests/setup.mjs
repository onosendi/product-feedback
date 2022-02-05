import Knex from 'knex';
import path from 'path';
import 'ts-node/register';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function createTestDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: {
      user: 'product_feedback',
      password: 'product_feedback',
    },
  });

  try {
    // eslint-disable-next-line no-console
    console.log('Setting up test database...\n');
    await knex.raw('drop database if exists test_product_feedback');
    await knex.raw('create database test_product_feedback');
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

async function migrateAndSeedTestDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: {
      database: 'test_product_feedback',
      user: 'product_feedback',
      password: 'product_feedback',
    },
    migrations: {
      directory: path.resolve(dirname, '../database/migrations'),
    },
    seeds: {
      directory: path.resolve(dirname, '../database/seeds'),
    },
  });

  try {
    await knex.migrate.latest();
    await knex.seed.run();
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

export default async function setup() {
  await createTestDatabase();
  await migrateAndSeedTestDatabase();
}

setup();
