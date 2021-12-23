import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const user: FastifyPluginAsync = async (fastify) => {
  // Routes
  fastify.register(routes, { prefix: '/users' });
};

export default fp(user);
