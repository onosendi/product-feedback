import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';
import { validateDetailId } from './plugins';

const suggestions: FastifyPluginAsync = async (fastify) => {
  // Plugins
  fastify.register(validateDetailId);

  // Routes
  fastify.register(routes, { prefix: '/suggestions' });
};

export default fp(suggestions);
