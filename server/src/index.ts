import Fastify, { FastifyInstance } from 'fastify';
import config from '../config';
import { authenticate } from './auth/decorators';
import authRoutes from './auth/routes';

const fastify: FastifyInstance = Fastify({
  logger: process.env.NODE_ENV === 'development',
});

fastify.register(authenticate);

fastify.register(authRoutes, { prefix: '/auth' });

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
