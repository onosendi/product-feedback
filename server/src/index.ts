import Fastify, { FastifyInstance } from 'fastify';
import FastifyJWT from 'fastify-jwt';
import config from '../config';
import auth from './auth';
import project from './project';
import suggestion from './suggestion';
import user from './user';

const fastify: FastifyInstance = Fastify({
  ajv: {
    customOptions: {
      allErrors: true,
      $data: true,
    },
  },
  logger: process.env.NODE_ENV === 'development',
});

fastify.register(FastifyJWT, {
  secret: config.APP_SECRET,
});

fastify.register(project);
fastify.register(auth);
fastify.register(user);
fastify.register(suggestion);

async function start() {
  try {
    await fastify.listen({
      host: config.APP_HOST,
      port: config.APP_PORT,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
