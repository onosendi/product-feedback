import dotenv from 'dotenv';
import Fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import authRoutes from './auth/routes';

dotenv.config();

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: process.env.NODE_ENV === 'development',
});

server.register(authRoutes, { prefix: '/auth' });

const start = async () => {
  try {
    await server.listen({
      host: process.env.APP_HOST || 'localhost',
      port: Number(process.env.APP_PORT) || 8000,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
