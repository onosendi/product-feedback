import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const votes: FastifyPluginAsync = fp(async (fastify) => {
  // Routes
  fastify.register(routes, { prefix: '/votes' });
});

export default votes;
