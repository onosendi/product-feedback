import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const comments: FastifyPluginAsync = fp(async (fastify) => {
  // Routes
  fastify.register(routes, { prefix: '/comments' });
});

export default comments;
