import dotenv from 'dotenv';
import Fastify from 'fastify';
import fp from 'fastify-plugin';
import app from './src/app';

dotenv.config();

async function foo() {
  // This needs to be any value other than 'testing'
  process.env.NODE_ENV = 'not testing';

  const fastify = Fastify();
  await fastify.register(fp(app));
  return fastify.knexConfig;
}

export default foo();
