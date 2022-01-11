import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { authUser, needsAuthentication } from './plugins';
import routes from './routes';
import { schema } from './schemas';

const auth: FastifyPluginAsync = async (fastify) => {
  // Plugins
  fastify.register(needsAuthentication);
  fastify.register(authUser);

  // Schemas
  fastify.register(schema);

  // Routes
  fastify.register(routes, { prefix: '/auth' });
};

export default fp(auth);
