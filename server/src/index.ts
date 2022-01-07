import dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import auth from './auth';
import comments from './comments';
import feedback from './feedback';
import project from './project';
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

fastify.register(project);
fastify.register(auth);
fastify.register(users);
fastify.register(feedback);
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
