import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const user: FastifyPluginAsync = async (fastify) => {
  // Routes
  fastify.register(routes, { prefix: '/user' });
};

export default fp(user);
