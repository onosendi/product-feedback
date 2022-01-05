import dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import fastifyKnex from 'fastify-knexjs';
import auth from './auth';
import comments from './comments';
import getKnexConfig from './lib/knexConfig';
import project from './project';
import suggestions from './suggestions';
import users from './users';
import votes from './votes';

dotenv.config();

const fastify: FastifyInstance = Fastify({
  ajv: {
    customOptions: {
      $data: true,
      allErrors: true,
      coerceTypes: 'array',
      removeAdditional: 'all',
    },
  },
  logger: process.env.NODE_ENV === 'development',
});

fastify.register(fastifyJwt, {
  secret: process.env.APP_SECRET as string,
});

fastify.register(fastifyKnex, getKnexConfig());

fastify.register(project);
fastify.register(auth);
fastify.register(users);
fastify.register(suggestions);
fastify.register(votes);
fastify.register(comments);

async function start() {
  try {
    await fastify.listen({
      host: process.env.APP_HOST as string || 'localhost',
      port: Number(process.env.APP_PORT) || 8000,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
