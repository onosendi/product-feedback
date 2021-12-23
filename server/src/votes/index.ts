import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const user: FastifyPluginAsync = async (fastify) => {
  // Routes
  fastify.register(routes, { prefix: '/votes' });
};

export default fp(user);
