import Fastify, { FastifyInstance } from 'fastify';
import config from '../config';
import { authenticate } from './auth/decorators';
import authRoutes from './auth/routes';
import knex from './lib/decorators';
import userRoutes from './user/routes';

const fastify: FastifyInstance = Fastify({
  ajv: {
    customOptions: {
      allErrors: true,
      $data: true,
    },
  },
  logger: process.env.NODE_ENV === 'development',
});

fastify.register(knex);
fastify.register(authenticate);
// fastify.register(userDecorator);

fastify.register(authRoutes, { prefix: '/auth' });
fastify.register(userRoutes, { prefix: '/user' });

const start = async () => {
  try {
    await fastify.listen({
      host: config.APP_HOST,
      port: config.APP_PORT,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
