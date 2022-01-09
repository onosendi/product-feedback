import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';
import { schema } from './schemas';

const user: FastifyPluginAsync = fp(async (fastify) => {
  // Schema
  fastify.register(schema);

  // Routes
  fastify.register(routes, { prefix: '/users' });
});

export default user;
