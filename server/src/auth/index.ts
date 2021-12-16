import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import { authenticateDecorator, userDecorator, userHook } from './plugins';
import routes from './routes';

const auth: FastifyPlugin = (fastify, opts, done) => {
  // Plugins
  fastify.register(authenticateDecorator);
  fastify.register(userDecorator);
  fastify.register(userHook);

  // Routes
  fastify.register(routes, { prefix: '/auth' });

  done();
};

export default fp(auth);
