import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import { authenticateDecorator } from './plugins';
import routes from './routes';

const auth: FastifyPlugin = (fastify, opts, done) => {
  // Plugins
  fastify.register(authenticateDecorator);

  // Routes
  fastify.register(routes, { prefix: '/auth' });

  done();
};

export default fp(auth);
