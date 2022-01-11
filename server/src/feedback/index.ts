import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { schema } from './schemas';
import routes from './routes';

const feedback: FastifyPluginAsync = fp(async (fastify) => {
  // Schemas
  fastify.register(schema);

  // Routes
  fastify.register(routes, { prefix: '/feedback' });
});

export default feedback;
