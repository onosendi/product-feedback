import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const feedback: FastifyPluginAsync = fp(async (fastify) => {
  // Routes
  fastify.register(routes, { prefix: '/feedback' });
});

export default feedback;
