import Fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import config from '../config';
import authRoutes from './auth/routes';

const fastify: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: process.env.NODE_ENV === 'development',
});

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
