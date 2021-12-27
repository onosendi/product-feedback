import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { decorateRequestWithAuthUser, needsAuthentication } from './plugins';
import routes from './routes';

const auth: FastifyPluginAsync = async (fastify) => {
  // Plugins
  fastify.register(needsAuthentication);
  fastify.register(decorateRequestWithAuthUser);

  // Routes
  fastify.register(routes, { prefix: '/auth' });
};

export default fp(auth);
