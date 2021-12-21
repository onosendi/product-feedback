import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { authenticateDecorator, userHook } from './plugins';
import routes from './routes';

const auth: FastifyPluginAsync = async (fastify) => {
  // Plugins
  fastify.register(authenticateDecorator);
  fastify.register(userHook);

  // Routes
  fastify.register(routes, { prefix: '/auth' });
};

export default fp(auth);
