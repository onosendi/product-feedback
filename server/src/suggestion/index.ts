import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const suggestion: FastifyPlugin = (fastify, opts, done) => {
  // Routes
  fastify.register(routes, { prefix: '/suggestion' });

  done();
};

export default fp(suggestion);
