import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const suggestions: FastifyPluginAsync = async (fastify) => {
  // Routes
  fastify.register(routes, { prefix: '/suggestions' });
};

export default fp(suggestions);
