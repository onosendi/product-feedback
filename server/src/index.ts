import Fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import config from '../config';
import authRoutes from './auth/routes';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: process.env.NODE_ENV === 'development',
});

server.register(authRoutes, { prefix: '/auth' });

const start = async () => {
  try {
    await server.listen({
      host: config.APP_HOST,
      port: config.APP_PORT,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
