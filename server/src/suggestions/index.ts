import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const suggestions: FastifyPlugin = (fastify, opts, done) => {
  // Routes
  fastify.register(routes, { prefix: '/suggestions' });

  done();
};

export default fp(suggestions);
